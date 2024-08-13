<template>
  <div class="container mt-5">
    <!-- AI 추천 견적서 제목 -->
    <h1 v-if="!isEstimateReceived" class="text-center text-white mb-4">AI 추천 견적서</h1>

    <!-- 추천 견적을 받기 위한 폼 -->
    <form v-if="!isEstimateReceived" @submit.prevent="submitForm" class="bg-dark p-4 rounded">
      <!-- 예산 선택 -->
      <div class="mb-4 text-center">
        <label class="text-white mb-2 d-block">예산을 선택하세요</label>
        <div class="btn-group btn-group-toggle d-flex justify-content-center flex-wrap" data-toggle="buttons">
          <!-- 예산 선택 버튼 그룹 -->
          <label
            v-for="option in costOptions"
            :key="option.value"
            class="btn btn-outline-light m-1"
            :class="{ active: form.costScope === option.value }"
          >
            <input type="radio" name="costScope" autocomplete="off" :value="option.value" v-model="form.costScope">
            {{ option.label }}
          </label>
        </div>
      </div>

      <!-- 부품 선택 드롭다운 -->
      <div v-for="(part, key) in parts" :key="key" class="mb-3">
        <div class="dropdown">
          <button
            class="btn btn-outline-light dropdown-toggle w-100 text-left"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <!-- 부품이 선택되었는지에 따라 버튼에 표시 -->
            {{ selectedParts[key] ? `${selectedParts[key].name} - ${selectedParts[key].cost.toLocaleString()}원` : part.label }}
          </button>
          <ul class="dropdown-menu w-100">
            <!-- 각 부품 옵션을 드롭다운 메뉴로 표시 -->
            <li v-for="option in part.options" :key="option.code">
              <a class="dropdown-item" href="#" @click="selectPart(key, option)">
                {{ option.name }} - {{ option.cost.toLocaleString() }}원
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- AI 견적 받기 버튼 -->
      <button type="submit" class="btn btn-danger w-100 mt-3">AI 견적 받기</button>
    </form>

    <!-- 견적 결과 표시 영역 -->
    <div v-else class="estimate-result mt-5">
      <h2 class="text-center text-white mb-4">추천 견적 결과</h2>
      <div v-for="(value, key) in estimate" :key="key">
        <!-- 총 견적 가격이 아닌 경우에만 카드로 표시 -->
        <div class="card bg-dark text-white mb-3" v-if="key !== 'totalCost'">
          <div class="card-body d-flex justify-content-between align-items-center">
            <h5 class="card-title">{{ partLabels[key] }}</h5>
            <p class="card-text">{{ value.name }} - {{ value.cost.toLocaleString() }}원</p>
          </div>
        </div>
      </div>
      <!-- 총 견적 가격을 화면 중앙에 표시 -->
      <div class="text-center mt-4">
        <h3 class="text-white">총 견적 가격: {{ estimate.totalCost.toLocaleString() }}원</h3>
      </div>
      <!-- 다시 추천받기 및 내 PC에 담기 버튼 -->
      <div class="text-center mt-3">
        <button class="btn btn-secondary me-2" @click="resetEstimate">다시 추천받기</button>
        <button class="btn btn-primary" @click="saveToMyPC">내 PC에 담기</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { usePcStore } from '@/stores/pcStore'; // pcStore import

export default {
  name: 'RecommendationView',
  setup() {
    const pcStore = usePcStore(); // pcStore를 setup에서 초기화

    return {
      pcStore, // 컴포넌트에서 pcStore 사용 가능
    };
  },
  data() {
    return {
      form: {
        costScope: '',
        // 선택한 부품들의 코드, 이름, 가격 정보를 저장하는 필드들
        cpuCodeBefore: '',
        cpuNameBefore: '',
        cpuCostBefore: '',
        motherboardCodeBefore: '',
        motherboardNameBefore: '',
        motherboardCostBefore: '',
        memoryCodeBefore: '',
        memoryNameBefore: '',
        memoryCostBefore: '',
        gpuCodeBefore: '',
        gpuNameBefore: '',
        gpuCostBefore: '',
        ssdCodeBefore: '',
        ssdNameBefore: '',
        ssdCostBefore: '',
        caseCodeBefore: '',
        caseNameBefore: '',
        caseCostBefore: '',
        powerCodeBefore: '',
        powerNameBefore: '',
        powerCostBefore: '',
        coolerCodeBefore: '',
        coolerNameBefore: '',
        coolerCostBefore: ''
      },
      // 사용자가 선택한 부품을 저장
      selectedParts: {
        cpu: null,
        motherboard: null,
        memory: null,
        gpu: null,
        ssd: null,
        case: null,
        power: null,
        cooler: null
      },
      // 부품 정보를 저장하는 객체
      parts: {
        cpu: { label: 'CPU', options: [] },
        motherboard: { label: '메인보드', options: [] },
        memory: { label: '메모리', options: [] },
        gpu: { label: '그래픽카드', options: [] },
        ssd: { label: 'SSD', options: [] },
        case: { label: '케이스', options: [] },
        power: { label: '파워', options: [] },
        cooler: { label: '쿨러', options: [] }
      },
      // 각 부품의 라벨을 정의
      partLabels: {
        cpu: 'CPU',
        motherboard: '메인보드',
        memory: '메모리',
        gpu: '그래픽카드',
        ssd: 'SSD',
        case: '케이스',
        power: '파워',
        cooler: '쿨러'
      },
      // 예산 옵션을 정의
      costOptions: [
        { value: '100~150만원', label: '100~150만원' },
        { value: '150~200만원', label: '150~200만원' },
        { value: '200만원~', label: '200만원~' }
      ],
      // 견적이 수신되었는지를 나타내는 플래그
      isEstimateReceived: false,
      // 최종 견적을 저장하는 객체
      estimate: {}
    };
  },
  mounted() {
    // 컴포넌트가 마운트되면 부품 데이터를 가져옴
    this.fetchPartsData();
  },
  methods: {
    // 부품 데이터를 가져오는 메소드
    fetchPartsData() {
      // 실제 데이터는 서버에서 가져와야 하지만, 여기서는 하드코딩된 데이터를 사용
      const partsData = [
        {
          "cpu": {
            "1": { "code": 10000001, "name": "인텔 코어 i5-11400F", "cost": 200000 },
            "2": { "code": 10000002, "name": "AMD 라이젠 5 5600X", "cost": 280000 },
            "3": { "code": 10000003, "name": "인텔 코어 i7-10700K", "cost": 350000 },
            "4": { "code": 10000004, "name": "AMD 라이젠 7 3700X", "cost": 270000 },
            "5": { "code": 10000005, "name": "인텔 코어 i9-9900K", "cost": 400000 },
            "6": { "code": 10000006, "name": "AMD 라이젠 9 5900X", "cost": 450000 },
            "7": { "code": 10000007, "name": "인텔 코어 i9-12900K", "cost": 700000 },
            "8": { "code": 10000008, "name": "인텔 코어 i7-12700K", "cost": 600000 },
            "9": { "code": 10000009, "name": "AMD 라이젠 7 5800X", "cost": 450000 },
            "10": { "code": 10000010, "name": "AMD 라이젠 5 3600", "cost": 180000 },
            "11": { "code": 10000011, "name": "인텔 코어 i5-10600K", "cost": 250000 },
            "12": { "code": 10000012, "name": "인텔 코어 i9-11900K", "cost": 550000 },
            "13": { "code": 10000013, "name": "인텔 코어 i7-10700F", "cost": 300000 },
            "14": { "code": 10000014, "name": "인텔 코어 i5-11600K", "cost": 270000 },
            "15": { "code": 10000015, "name": "AMD 라이젠 7 3800X", "cost": 320000 },
            "16": { "code": 10000016, "name": "AMD 라이젠 5 3600XT", "cost": 200000 },
            "17": { "code": 10000017, "name": "인텔 코어 i9-12900KF", "cost": 720000 },
            "18": { "code": 10000018, "name": "인텔 코어 i7-11700K", "cost": 380000 },
            "19": { "code": 10000019, "name": "AMD 라이젠 9 5950X", "cost": 850000 },
            "20": { "code": 10000020, "name": "인텔 코어 i5-10500", "cost": 220000 }
          }
        },
        {
          "motherboard": {
            "1": { "code": 20000001, "name": "ASRock B560M PRO4", "cost": 100000 },
            "2": { "code": 20000002, "name": "MSI MAG B550 TOMAHAWK", "cost": 200000 },
            "3": { "code": 20000003, "name": "기가바이트 Z490 AORUS MASTER", "cost": 250000 },
            "4": { "code": 20000004, "name": "ASRock X570 Phantom Gaming 4", "cost": 140000 },
            "5": { "code": 20000005, "name": "에이수스 ROG Maximus XI Hero", "cost": 300000 },
            "6": { "code": 20000006, "name": "MSI B450 TOMAHAWK MAX", "cost": 120000 },
            "7": { "code": 20000007, "name": "기가바이트 B550 AORUS ELITE", "cost": 180000 },
            "8": { "code": 20000008, "name": "ASRock Z490 Taichi", "cost": 270000 },
            "9": { "code": 20000009, "name": "에이수스 TUF Gaming B550-PLUS", "cost": 160000 },
            "10": { "code": 20000010, "name": "MSI MPG Z490 GAMING EDGE WIFI", "cost": 220000 },
            "11": { "code": 20000011, "name": "기가바이트 X570 AORUS ULTRA", "cost": 320000 },
            "12": { "code": 20000012, "name": "ASRock B450 Steel Legend", "cost": 110000 },
            "13": { "code": 20000013, "name": "에이수스 ROG STRIX B450-F", "cost": 150000 },
            "14": { "code": 20000014, "name": "MSI Z490-A PRO", "cost": 180000 },
            "15": { "code": 20000015, "name": "기가바이트 Z590 AORUS ELITE", "cost": 250000 },
            "16": { "code": 20000016, "name": "ASRock B550M Steel Legend", "cost": 130000 },
            "17": { "code": 20000017, "name": "에이수스 PRIME Z490-A", "cost": 200000 },
            "18": { "code": 20000018, "name": "MSI B550M PRO-VDH WIFI", "cost": 110000 },
            "19": { "code": 20000019, "name": "기가바이트 B550M DS3H", "cost": 90000 },
            "20": { "code": 20000020, "name": "에이수스 ROG Crosshair VIII Hero", "cost": 350000 }
          }
        },
        {
          "memory": {
            "1": { "code": 30000001, "name": "삼성 DDR4 3200MHz 16GB", "cost": 80000 },
            "2": { "code": 30000002, "name": "킹스톤 DDR4 3600MHz 16GB", "cost": 90000 },
            "3": { "code": 30000003, "name": "Corsair Vengeance LPX 16GB", "cost": 95000 },
            "4": { "code": 30000004, "name": "G.SKILL Trident Z RGB 16GB", "cost": 120000 },
            "5": { "code": 30000005, "name": "HyperX Fury DDR4 3200MHz 16GB", "cost": 85000 },
            "6": { "code": 30000006, "name": "Patriot Viper Steel DDR4 3200MHz 16GB", "cost": 80000 },
            "7": { "code": 30000007, "name": "삼성 DDR4 3200MHz 32GB", "cost": 160000 },
            "8": { "code": 30000008, "name": "킹스톤 DDR4 3600MHz 32GB", "cost": 170000 },
            "9": { "code": 30000009, "name": "Corsair Vengeance LPX 32GB", "cost": 180000 },
            "10": { "code": 30000010, "name": "G.SKILL Trident Z RGB 32GB", "cost": 220000 },
            "11": { "code": 30000011, "name": "HyperX Fury DDR4 3200MHz 32GB", "cost": 160000 },
            "12": { "code": 30000012, "name": "Patriot Viper Steel DDR4 3200MHz 32GB", "cost": 150000 },
            "13": { "code": 30000013, "name": "삼성 DDR4 3000MHz 16GB", "cost": 75000 },
            "14": { "code": 30000014, "name": "킹스톤 DDR4 3000MHz 16GB", "cost": 85000 },
            "15": { "code": 30000015, "name": "Corsair Vengeance LPX 3000MHz 16GB", "cost": 80000 },
            "16": { "code": 30000016, "name": "G.SKILL Trident Z RGB 3000MHz 16GB", "cost": 110000 },
            "17": { "code": 30000017, "name": "HyperX Fury DDR4 3000MHz 16GB", "cost": 70000 },
            "18": { "code": 30000018, "name": "Patriot Viper Steel DDR4 3000MHz 16GB", "cost": 75000 },
            "19": { "code": 30000019, "name": "삼성 DDR4 3000MHz 32GB", "cost": 140000 },
            "20": { "code": 30000020, "name": "킹스톤 DDR4 3000MHz 32GB", "cost": 160000 }
          }
        },
        {
          "gpu": {
            "1": { "code": 40000001, "name": "엔비디아 지포스 RTX 3080", "cost": 800000 },
            "2": { "code": 40000002, "name": "AMD 라데온 RX 6700 XT", "cost": 600000 },
            "3": { "code": 40000003, "name": "엔비디아 지포스 RTX 3070", "cost": 700000 },
            "4": { "code": 40000004, "name": "엔비디아 지포스 GTX 1660 Super", "cost": 300000 },
            "5": { "code": 40000005, "name": "AMD 라데온 RX 6600 XT", "cost": 350000 },
            "6": { "code": 40000006, "name": "엔비디아 지포스 RTX 3060", "cost": 500000 },
            "7": { "code": 40000007, "name": "엔비디아 지포스 RTX 3070 Ti", "cost": 750000 },
            "8": { "code": 40000008, "name": "AMD 라데온 RX 6900 XT", "cost": 1000000 },
            "9": { "code": 40000009, "name": "엔비디아 지포스 RTX 3080 Ti", "cost": 900000 },
            "10": { "code": 40000010, "name": "AMD 라데온 RX 6800 XT", "cost": 800000 },
            "11": { "code": 40000011, "name": "엔비디아 지포스 RTX 3090", "cost": 1500000 },
            "12": { "code": 40000012, "name": "AMD 라데온 RX 6700", "cost": 500000 },
            "13": { "code": 40000013, "name": "엔비디아 지포스 RTX 3050", "cost": 400000 },
            "14": { "code": 40000014, "name": "AMD 라데온 RX 6600", "cost": 300000 },
            "15": { "code": 40000015, "name": "엔비디아 지포스 GTX 1650", "cost": 200000 },
            "16": { "code": 40000016, "name": "엔비디아 지포스 RTX 2060", "cost": 300000 },
            "17": { "code": 40000017, "name": "엔비디아 지포스 GTX 1660 Ti", "cost": 350000 },
            "18": { "code": 40000018, "name": "AMD 라데온 RX 5700 XT", "cost": 400000 },
            "19": { "code": 40000019, "name": "엔비디아 지포스 RTX 2080 Ti", "cost": 1000000 },
            "20": { "code": 40000020, "name": "AMD 라데온 RX 5600 XT", "cost": 300000 }
          }
        },
        {
          "ssd": {
            "1": { "code": 50000001, "name": "삼성 970 EVO Plus 1TB", "cost": 200000 },
            "2": { "code": 50000002, "name": "크루셜 MX500 1TB", "cost": 180000 },
            "3": { "code": 50000003, "name": "삼성 860 EVO 1TB", "cost": 150000 },
            "4": { "code": 50000004, "name": "WD Blue SN550 1TB", "cost": 120000 },
            "5": { "code": 50000005, "name": "삼성 970 EVO Plus 500GB", "cost": 130000 },
            "6": { "code": 50000006, "name": "삼성 970 EVO Plus 2TB", "cost": 400000 },
            "7": { "code": 50000007, "name": "WD Black SN750 1TB", "cost": 200000 },
            "8": { "code": 50000008, "name": "삼성 980 Pro 500GB", "cost": 150000 },
            "9": { "code": 50000009, "name": "삼성 870 QVO 1TB", "cost": 120000 },
            "10": { "code": 50000010, "name": "Crucial P5 1TB", "cost": 180000 },
            "11": { "code": 50000011, "name": "Samsung 970 Pro 1TB", "cost": 250000 },
            "12": { "code": 50000012, "name": "WD Black SN750 2TB", "cost": 350000 },
            "13": { "code": 50000013, "name": "삼성 970 EVO 1TB", "cost": 220000 },
            "14": { "code": 50000014, "name": "삼성 860 QVO 1TB", "cost": 140000 },
            "15": { "code": 50000015, "name": "삼성 870 EVO 1TB", "cost": 170000 },
            "16": { "code": 50000016, "name": "삼성 970 Pro 2TB", "cost": 450000 },
            "17": { "code": 50000017, "name": "삼성 970 EVO 2TB", "cost": 400000 },
            "18": { "code": 50000018, "name": "Crucial P5 2TB", "cost": 330000 },
            "19": { "code": 50000019, "name": "삼성 870 EVO 2TB", "cost": 320000 },
            "20": { "code": 50000020, "name": "삼성 870 QVO 2TB", "cost": 260000 }
          }
        },
        {
          "case": {
            "1": { "code": 60000001, "name": "NZXT H510", "cost": 100000 },
            "2": { "code": 60000002, "name": "팬텍스 P400A", "cost": 90000 },
            "3": { "code": 60000003, "name": "프랙탈 디자인 Meshify C", "cost": 120000 },
            "4": { "code": 60000004, "name": "NZXT H510 Elite", "cost": 150000 },
            "5": { "code": 60000005, "name": "비콰이어트! Pure Base 500DX", "cost": 110000 },
            "6": { "code": 60000006, "name": "NZXT H710", "cost": 180000 },
            "7": { "code": 60000007, "name": "에이수스 TUF Gaming GT501", "cost": 170000 },
            "8": { "code": 60000008, "name": "Lian Li PC-O11 Dynamic", "cost": 130000 },
            "9": { "code": 60000009, "name": "Thermaltake Core P3", "cost": 90000 },
            "10": { "code": 60000010, "name": "Cooler Master H500", "cost": 110000 },
            "11": { "code": 60000011, "name": "Phanteks Eclipse P400A", "cost": 80000 },
            "12": { "code": 60000012, "name": "Cooler Master MasterBox TD500", "cost": 70000 },
            "13": { "code": 60000013, "name": "Lian Li PC-O11 Dynamic XL", "cost": 200000 },
            "14": { "code": 60000014, "name": "Fractal Design Define R6", "cost": 160000 },
            "15": { "code": 60000015, "name": "Phanteks Evolv X", "cost": 220000 },
            "16": { "code": 60000016, "name": "Cooler Master MasterCase H500P", "cost": 190000 },
            "17": { "code": 60000017, "name": "Lian Li Lancool II Mesh", "cost": 100000 },
            "18": { "code": 60000018, "name": "Corsair 4000D Airflow", "cost": 130000 },
            "19": { "code": 60000019, "name": "be quiet! Silent Base 802", "cost": 200000 },
            "20": { "code": 60000020, "name": "Cooler Master MasterBox NR600", "cost": 70000 }
          }
        },
        {
          "power": {
            "1": { "code": 70000001, "name": "커세어 RM750x", "cost": 120000 },
            "2": { "code": 70000002, "name": "시소닉 Focus GX-750", "cost": 110000 },
            "3": { "code": 70000003, "name": "커세어 CX650M", "cost": 90000 },
            "4": { "code": 70000004, "name": "커세어 RM850x", "cost": 140000 },
            "5": { "code": 70000005, "name": "시소닉 S12III 650", "cost": 80000 },
            "6": { "code": 70000006, "name": "EVGA SuperNOVA 650 G5", "cost": 90000 },
            "7": { "code": 70000007, "name": "Antec Earthwatts Gold Pro 550W", "cost": 60000 },
            "8": { "code": 70000008, "name": "Cooler Master MWE Gold 750", "cost": 85000 },
            "9": { "code": 70000009, "name": "SilverStone Strider Gold S 750W", "cost": 100000 },
            "10": { "code": 70000010, "name": "Corsair AX850", "cost": 180000 },
            "11": { "code": 70000011, "name": "Thermaltake Toughpower GF1 750W", "cost": 90000 },
            "12": { "code": 70000012, "name": "Cooler Master V750 SFX Gold", "cost": 130000 },
            "13": { "code": 70000013, "name": "NZXT C750", "cost": 120000 },
            "14": { "code": 70000014, "name": "Gigabyte P650B", "cost": 70000 },
            "15": { "code": 70000015, "name": "be quiet! Straight Power 11 750W", "cost": 140000 },
            "16": { "code": 70000016, "name": "Corsair RM750", "cost": 130000 },
            "17": { "code": 70000017, "name": "Seasonic Prime TX-850", "cost": 200000 },
            "18": { "code": 70000018, "name": "Corsair SF750", "cost": 160000 },
            "19": { "code": 70000019, "name": "be quiet! Dark Power Pro 12 1200W", "cost": 300000 },
            "20": { "code": 70000020, "name": "FSP Hydro G Pro 850W", "cost": 150000 }
          }
        },
        {
          "cooler": {
            "1": { "code": 80000001, "name": "쿨러마스터 Hyper 212 RGB", "cost": 50000 },
            "2": { "code": 80000002, "name": "녹투아 NH-D15", "cost": 90000 },
            "3": { "code": 80000003, "name": "쿨러마스터 Hyper 212 Black Edition", "cost": 40000 },
            "4": { "code": 80000004, "name": "쿨러마스터 MasterLiquid ML240L", "cost": 70000 },
            "5": { "code": 80000005, "name": "쿨러마스터 MasterLiquid ML360R", "cost": 100000 },
            "6": { "code": 80000006, "name": "NZXT Kraken X63", "cost": 140000 },
            "7": { "code": 80000007, "name": "Deepcool Gammaxx GT", "cost": 40000 },
            "8": { "code": 80000008, "name": "Arctic Freezer 34 eSports DUO", "cost": 60000 },
            "9": { "code": 80000009, "name": "Cooler Master MasterAir MA620M", "cost": 90000 },
            "10": { "code": 80000010, "name": "NZXT Kraken Z73", "cost": 250000 },
            "11": { "code": 80000011, "name": "Be Quiet! Dark Rock Pro 4", "cost": 80000 },
            "12": { "code": 80000012, "name": "Corsair H100i RGB Platinum", "cost": 120000 },
            "13": { "code": 80000013, "name": "Noctua NH-U12S", "cost": 60000 },
            "14": { "code": 80000014, "name": "Cooler Master Hyper 212 EVO", "cost": 40000 },
            "15": { "code": 80000015, "name": "Deepcool Castle 360EX", "cost": 130000 },
            "16": { "code": 80000016, "name": "Corsair H150i Elite Capellix", "cost": 200000 },
            "17": { "code": 80000017, "name": "NZXT Kraken X72", "cost": 180000 },
            "18": { "code": 80000018, "name": "Arctic Liquid Freezer II 280", "cost": 110000 },
            "19": { "code": 80000019, "name": "Thermaltake Floe Triple Riing RGB 360", "cost": 150000 },
            "20": { "code": 80000020, "name": "Cooler Master MasterAir MA410M", "cost": 50000 }
          }
        }
      ];

      // 부품 데이터를 각 카테고리에 맞게 저장
      this.parts.cpu.options = Object.values(partsData[0].cpu);
      this.parts.motherboard.options = Object.values(partsData[1].motherboard);
      this.parts.memory.options = Object.values(partsData[2].memory);
      this.parts.gpu.options = Object.values(partsData[3].gpu);
      this.parts.ssd.options = Object.values(partsData[4].ssd);
      this.parts.case.options = Object.values(partsData[5].case);
      this.parts.power.options = Object.values(partsData[6].power);
      this.parts.cooler.options = Object.values(partsData[7].cooler);
    },
    // 부품을 선택했을 때 호출되는 메소드
    selectPart(partKey, option) {
      this.selectedParts[partKey] = option;
      this.updateForm(partKey);
    },
    // 선택된 부품의 정보를 폼에 업데이트
    updateForm(partKey) {
      const selectedPart = this.selectedParts[partKey];
      if (selectedPart) {
        this.form[`${partKey}CodeBefore`] = selectedPart.code;
        this.form[`${partKey}NameBefore`] = selectedPart.name;
        this.form[`${partKey}CostBefore`] = selectedPart.cost;
      } else {
        this.form[`${partKey}CodeBefore`] = '';
        this.form[`${partKey}NameBefore`] = '';
        this.form[`${partKey}CostBefore`] = '';
      }
    },
    // 폼을 제출하여 추천 견적을 받는 메소드
    async submitForm() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/estimate/estimate/', JSON.stringify(this.form), {
          headers: { 'Content-Type': 'application/json' }
        });
        this.processEstimate(response.data[0]);
      } catch (error) {
        console.error(error);
        alert('추천을 받는 도중 오류가 발생했습니다.');
      }
    },
    // 받은 견적 데이터를 처리하는 메소드
    processEstimate(data) {
      this.estimate = {
        cpu: { name: data.cpuNameAfter, cost: data.cpuCostAfter },
        motherboard: { name: data.motherboardNameAfter, cost: data.motherboardCostAfter },
        memory: { name: data.memoryNameAfter, cost: data.memoryCostAfter },
        gpu: { name: data.gpuNameAfter, cost: data.gpuCostAfter },
        ssd: { name: data.ssdNameAfter, cost: data.ssdCostAfter },
        case: { name: data.caseNameAfter, cost: data.caseCostAfter },
        power: { name: data.powerNameAfter, cost: data.powerCostAfter },
        cooler: { name: data.coolerNameAfter, cost: data.coolerCostAfter },
        totalCost: data.totalCost
      };
      this.isEstimateReceived = true; // 견적이 수신되었음을 표시
    },
    // 견적을 초기화하는 메소드
    resetEstimate() {
      this.isEstimateReceived = false;
      this.form = {
        costScope: '',
        cpuCodeBefore: '',
        cpuNameBefore: '',
        cpuCostBefore: '',
        motherboardCodeBefore: '',
        motherboardNameBefore: '',
        motherboardCostBefore: '',
        memoryCodeBefore: '',
        memoryNameBefore: '',
        memoryCostBefore: '',
        gpuCodeBefore: '',
        gpuNameBefore: '',
        gpuCostBefore: '',
        ssdCodeBefore: '',
        ssdNameBefore: '',
        ssdCostBefore: '',
        caseCodeBefore: '',
        caseNameBefore: '',
        caseCostBefore: '',
        powerCodeBefore: '',
        powerNameBefore: '',
        powerCostBefore: '',
        coolerCodeBefore: '',
        coolerNameBefore: '',
        coolerCostBefore: ''
      };
      this.selectedParts = {
        cpu: null,
        motherboard: null,
        memory: null,
        gpu: null,
        ssd: null,
        case: null,
        power: null,
        cooler: null
      };
    },
    // 견적 결과를 내 PC에 저장하는 메소드
    saveToMyPC() {
      try {
        const newPC = {
          id: Date.now(), // 유니크한 ID 생성
          computerName: "추천 견적",
          image: "https://via.placeholder.com/150", // 임시 이미지
          editing: false, // 추가 시 편집 모드가 아니도록 설정
          cpu: this.estimate.cpu.name,
          coolerTuning: this.estimate.cooler.name,
          motherboard: this.estimate.motherboard.name,
          memory: this.estimate.memory.name,
          gpu: this.estimate.gpu.name,
          ssd: this.estimate.ssd.name,
          hdd: null,
          case: this.estimate.case.name,
          power: this.estimate.power.name,
        };

        // PC 목록에 추가
        pcStore.pcList.push(newPC);

        // 성공 시 알림
        alert("내 PC에 견적이 추가되었습니다.");
      } catch (error) {
        // 오류 처리
        console.error("PC 추가 중 오류 발생:", error);
        alert("PC 추가 중 오류가 발생했습니다.");
      }
    }
  }
};
</script>

<style scoped>
/* 스타일 정의 */
body {
  background-color: #212529;
  color: white;
}

.container {
  max-width: 600px;
}

.bg-dark {
  background-color: #343a40 !important;
}

.btn-outline-light {
  border-color: #ffffff;
  color: #ffffff;
}

.btn-outline-light:hover {
  background-color: #ffffff;
  color: #000000;
}

.dropdown-menu {
  width: 100%;
}

.card {
  background-color: #343a40;
  color: white;
  border: none;
}

.text-center {
  text-align: center;
}

h1, h2, h3 {
  font-weight: bold;
}

.card-title {
  font-size: 1.2rem;
}

.card-text {
  font-size: 1rem;
}
</style>
