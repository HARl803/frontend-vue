

export const useSkillStore = defineStore('filters', {
  state: () => ({
    filters: {
      skill: {
        skill: {
          label: "스킬",
          options: [
            "컴퓨터 견적", "CPU 장착", "SSD/RAM 장착", "배선 작업",
            "수냉 쿨러", "케이스 선택", "전원 공급 장치 설치", "BIOS 설정",
            "드라이버 설치", "온도 관리", "업그레이드 팁", "모니터 연결",
            "전원 버튼 연결", "마더보드 선택", "고성능 게이밍 컴퓨터 조립", "소형 폼팩터 컴퓨터 조립",
            "사운드 카드 설치", "Wi-Fi 설정", "벤치마크 퍼포먼스 조정", "에러 코드 해결",
            "백업 및 복원", "NAS 관련 데이터 전송", "디스크 파티션 설정", "소음 감소 팁",
            "리눅스 설치 및 구성", "IOT 장치 연결", "데이터 복구"
          ]
        },
      },
    },
  }),
});


import { defineStore } from 'pinia';

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    currentCategory: 'cpu', // 기본 카테고리를 설정합니다.
    filters: { // 내용 생략
      cpu: {},
      coolerTuning: {},
      motherboard: {},
      memory: {},
      gpu: {},
      ssd: {},
      hdd: {},
      case: {},
      power: {}
    }
  }),
  actions: {
    setCategory(category) {
      this.currentCategory = category;
    },
  },
  getters: {
    filterNames: () => ({ // 내용 생략
      cpu: {},
      coolerTuning: {},
      motherboard: {},
      memory: {},
      gpu: {},
      ssd: {},
      hdd: {},
      case: {},
      power: {}
    }),
    currentFilters(state) {
      const category = state.filters[state.currentCategory];
      const filterNames = this.filterNames[state.currentCategory];
      return Object.keys(category).reduce((acc, key) => {
        acc[filterNames[key]] = category[key];
        return acc;
      }, {});
    },
  },
});