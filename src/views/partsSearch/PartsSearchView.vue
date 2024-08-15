<template>
  {{ partsData }}
  <!--  <div class="container mt-4 mb-4 flex-grow-1">-->
  <!--    <div class="row mb-5">-->
  <!--      &lt;!&ndash; 필터 &ndash;&gt;-->
  <!--      <div class="col-12 col-lg-8">-->
  <!--        &lt;!&ndash; 필터 카드 영역 &ndash;&gt;-->
  <!--        <div class="card mb-3" ref="filterSection">-->
  <!--          <div class="card-body">-->
  <!--            <div-->
  <!--                class="d-flex justify-content-between align-items-center category-header"-->
  <!--            >-->
  <!--              <h5 class="font-weight-bold">-->
  <!--                {{ categoryLabels[currentCategory] }}-->
  <!--                <span-->
  <!--                >총부품수: {{ Object.keys(filteredParts).length }}개<br-->
  <!--                /></span>-->
  <!--              </h5>-->
  <!--              <button-->
  <!--                  class="btn btn-outline-secondary btn-sm toggle-button"-->
  <!--                  @click="toggleAllCategories"-->
  <!--              >-->
  <!--                {{ showAllCategories ? "접기" : "펼치기" }}-->
  <!--              </button>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </div>-->

  <!--        &lt;!&ndash; 필터 표시 영역 &ndash;&gt;-->
  <!--        <div>-->
  <!--          <div-->
  <!--              v-for="(filterOptions, filterName) in visibleFilters"-->
  <!--              :key="filterName"-->
  <!--              class="mb-3"-->
  <!--          >-->
  <!--            <div class="row mb-1 align-items-start">-->
  <!--              <div class="col-2">-->
  <!--                <div class="filter-title font-weight-bold">-->
  <!--                  {{ filtersStore.getters[currentCategory][filterName] }}-->
  <!--                </div>-->
  <!--              </div>-->
  <!--              <div class="col-9">-->
  <!--                <div class="d-flex flex-wrap align-items-start">-->
  <!--                  <div-->
  <!--                      v-for="(option, index) in filterOptions"-->
  <!--                      :key="option"-->
  <!--                      class="option-box mb-1"-->
  <!--                      v-show="index < 5 || showFilterOptions[filterName]"-->
  <!--                  >-->
  <!--                    <div class="form-check small">-->
  <!--                      <input-->
  <!--                          class="form-check-input"-->
  <!--                          type="checkbox"-->
  <!--                          :value="option"-->
  <!--                          :id="option"-->
  <!--                          v-model="selectedFilters"-->
  <!--                      />-->
  <!--                      <label-->
  <!--                          class="form-check-label text-truncate"-->
  <!--                          :for="option"-->
  <!--                          title="{{ option }}"-->
  <!--                      >{{ option }}</label-->
  <!--                      >-->
  <!--                    </div>-->
  <!--                  </div>-->
  <!--                </div>-->
  <!--              </div>-->
  <!--              <div class="col-1 text-center">-->
  <!--                <button-->
  <!--                    class="btn btn-link btn-sm"-->
  <!--                    @click="toggleFilterVisibility(filterName)"-->
  <!--                >-->
  <!--                  <i-->
  <!--                      :class="-->
  <!--                      showFilterOptions[filterName]-->
  <!--                        ? 'bi bi-chevron-up'-->
  <!--                        : 'bi bi-chevron-down'-->
  <!--                    "-->
  <!--                  ></i>-->
  <!--                </button>-->
  <!--              </div>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->

  <!--      &lt;!&ndash; 부품 저장 영역 &ndash;&gt;-->
  <!--      <div class="col-12 col-lg-4">-->
  <!--        <div-->
  <!--            class="d-flex justify-content-between align-items-center mb-2 comparison-header"-->
  <!--        >-->
  <!--          <button-->
  <!--              class="btn btn-success w-50 dropdown-toggle"-->
  <!--              @click="toggleDropdown"-->
  <!--          >-->
  <!--            내 PC 불러오기-->
  <!--          </button>-->
  <!--          <button class="btn btn-primary w-50 ms-2" @click="recommendAI">-->
  <!--            AI 견적 추천-->
  <!--          </button>-->
  <!--        </div>-->
  <!--        <div class="pc-management">-->
  <!--          <div-->
  <!--              v-if="showDropdown"-->
  <!--              class="dropdown-menu w-100 p-2"-->
  <!--              style="display: block"-->
  <!--          >-->
  <!--            <div v-for="pc in pcStore.pcList" :key="pc.id" class="card mb-2">-->
  <!--              <div-->
  <!--                  class="card-header d-flex justify-content-between align-items-center"-->
  <!--              >-->
  <!--                <div>-->
  <!--                  <input-->
  <!--                      v-if="pc.editing"-->
  <!--                      v-model="pc.computerName"-->
  <!--                      @blur="savePCName(pc)"-->
  <!--                      @keyup.enter="savePCName(pc)"-->
  <!--                      class="form-control form-control-sm me-2"-->
  <!--                  />-->
  <!--                  <span v-else @dblclick="editPCName(pc)">{{-->
  <!--                      pc.computerName-->
  <!--                    }}</span>-->
  <!--                  <i class="bi bi-pencil ms-2" @click="editPCName(pc)"></i>-->
  <!--                </div>-->
  <!--                <div>-->
  <!--                  <button class="btn btn-primary btn-sm" @click="loadPC(pc)">-->
  <!--                    불러오기-->
  <!--                  </button>-->
  <!--                  <button-->
  <!--                      class="btn btn-danger btn-sm ms-2"-->
  <!--                      @click="removePC(pc.id)"-->
  <!--                  >-->
  <!--                    삭제-->
  <!--                  </button>-->
  <!--                </div>-->
  <!--              </div>-->
  <!--            </div>-->
  <!--            <div class="text-center mt-3">-->
  <!--              <button class="btn btn-success btn-sm" @click="addPC()">-->
  <!--                추가하기-->
  <!--              </button>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <div class="list-group mt-3">-->
  <!--            <div-->
  <!--                v-for="(categoryLabel, categoryKey) in categoryLabels"-->
  <!--                :key="categoryKey"-->
  <!--                class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"-->
  <!--                @click="setCategory(categoryKey)"-->
  <!--            >-->
  <!--              <div class="d-flex align-items-center">-->
  <!--                <span class="me-3">{{ categoryLabel }}</span>-->
  <!--                <span-->
  <!--                    v-if="pcStore.pcList[0][categoryKey]"-->
  <!--                    class="badge bg-success"-->
  <!--                >-->
  <!--                  -->
  <!--                  {{-->
  <!--                    partsData[categoryKey][`${pcStore.pcList[0][categoryKey]}`]-->
  <!--                        .manufacturer-->
  <!--                  }}-->
  <!--                  - -->
  <!--                  <span v-if="categoryKey == 'cpu'">{{-->
  <!--                      partsData[categoryKey][`${pcStore.pcList[0][categoryKey]}`]-->
  <!--                          .cpuType-->
  <!--                    }}</span>-->
  <!--                  <span v-if="categoryKey == 'memory'">{{-->
  <!--                      partsData[categoryKey][`${pcStore.pcList[0][categoryKey]}`]-->
  <!--                          .deviceType-->
  <!--                    }}</span>-->
  <!--                  <span v-if="categoryKey == 'gpu'">{{-->
  <!--                      partsData[categoryKey][`${pcStore.pcList[0][categoryKey]}`]-->
  <!--                          .chipsetManufacturer-->
  <!--                    }}</span>-->
  <!--                  <span v-if="categoryKey == 'ssd'">{{-->
  <!--                      partsData[categoryKey][`${pcStore.pcList[0][categoryKey]}`]-->
  <!--                          .formFactor-->
  <!--                    }}</span>-->
  <!--                  <span-->
  <!--                      v-if="-->
  <!--                      [-->
  <!--                        'coolerTuning',-->
  <!--                        'motherboard',-->
  <!--                        'hdd',-->
  <!--                        'case',-->
  <!--                        'power',-->
  <!--                      ].includes(categoryKey)-->
  <!--                    "-->
  <!--                  >-->
  <!--                    {{-->
  <!--                      partsData[categoryKey][-->
  <!--                          `${pcStore.pcList[0][categoryKey]}`-->
  <!--                          ].productType-->
  <!--                    }}-->
  <!--                  </span>-->
  <!--                </span>-->
  <!--                <span v-else class="badge bg-secondary">선택 안됨</span>-->
  <!--              </div>-->
  <!--              <button-->
  <!--                  v-if="pcStore.pcList[0][categoryKey]"-->
  <!--                  class="btn btn-danger btn-sm"-->
  <!--                  @click.stop="removeFromCart(categoryKey)"-->
  <!--              >-->
  <!--                삭제-->
  <!--              </button>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        <button class="btn btn-primary w-100 my-3" @click="savePC">저장</button>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->

  <!--  &lt;!&ndash; 선택된 필터 저장 영역 &ndash;&gt;-->
  <!--  <div-->
  <!--      class="cart mt-3 mb-3 bg-dark text-white p-2 rounded d-flex align-items-center justify-content-between"-->
  <!--  >-->
  <!--    <div class="d-flex align-items-center flex-grow-1">-->
  <!--      <button-->
  <!--          class="btn btn-outline-danger btn-sm me-2 reset-button"-->
  <!--          @click="clearFilters"-->
  <!--      >-->
  <!--        검색 초기화-->
  <!--      </button>-->
  <!--      <div-->
  <!--          v-if="selectedFilters.length"-->
  <!--          class="d-flex flex-wrap align-items-center"-->
  <!--      >-->
  <!--        <div-->
  <!--            v-for="filter in selectedFilters"-->
  <!--            :key="filter"-->
  <!--            class="cart-item bg-secondary text-white p-1 m-1 rounded d-flex align-items-center small"-->
  <!--        >-->
  <!--          {{ filter }}-->
  <!--          <button-->
  <!--              class="btn btn-link btn-sm text-danger ms-1 p-0"-->
  <!--              @click="removeFilter(filter)"-->
  <!--          >-->
  <!--            X-->
  <!--          </button>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    &lt;!&ndash; 검색어 입력 영역 &ndash;&gt;-->
  <!--    <div class="d-flex align-items-center">-->
  <!--      <div class="input-group">-->
  <!--        <input-->
  <!--            type="text"-->
  <!--            class="form-control search-input"-->
  <!--            placeholder="부품명을 검색하세요 ..."-->
  <!--            v-model="searchQuery"-->
  <!--        />-->
  <!--        <button class="btn btn-outline-secondary search-button" type="button">-->
  <!--          <i class="bi bi-search"></i>-->
  <!--        </button>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->

  <!--  &lt;!&ndash; 부품 비교 영역 &ndash;&gt;-->
  <!--  <div class="comparison-area mb-3 p-3 bg-dark text-white rounded">-->
  <!--    &lt;!&ndash; 비교 영역 헤더 &ndash;&gt;-->
  <!--    <div-->
  <!--        class="d-flex justify-content-between align-items-center mb-2 comparison-header"-->
  <!--    >-->
  <!--      <h5 style="font-weight: bold">부품 비교를 눌러 비교해 보세요!</h5>-->
  <!--    </div>-->

  <!--    &lt;!&ndash; 비교할 부품 영역 &ndash;&gt;-->
  <!--    <div-->
  <!--        v-if="isComparisonVisible"-->
  <!--        class="row h-100 d-flex align-items-center justify-content-center"-->
  <!--    >-->
  <!--      &lt;!&ndash; 비교할 부품이 없는 경우 &ndash;&gt;-->
  <!--      <div-->
  <!--          v-if="comparisonParts.length === 0"-->
  <!--          class="col-12 d-flex justify-content-center text-center"-->
  <!--      >-->
  <!--        <div class="mx-3 text-center">-->
  <!--          <img src="/src/views/partsSearch/monitor.png" class="default-image"/>-->
  <!--          <p>부품을 선택해 주세요!</p>-->
  <!--        </div>-->
  <!--        <div class="mx-3 text-center">-->
  <!--          <img src="/src/views/partsSearch/monitor.png" class="default-image"/>-->
  <!--          <p>부품을 선택해 주세요!</p>-->
  <!--        </div>-->
  <!--      </div>-->

  <!--      &lt;!&ndash; 비교할 부품이 하나인 경우 &ndash;&gt;-->
  <!--      <div-->
  <!--          v-else-if="comparisonParts.length === 1"-->
  <!--          class="col-12 d-flex justify-content-center text-center"-->
  <!--      >-->
  <!--        <div class="mx-3">-->
  <!--          <div class="part-container">-->
  <!--            <h5>{{ comparisonParts[0].name }}</h5>-->
  <!--            <p>{{ comparisonParts[0].description }}</p>-->
  <!--            <button-->
  <!--                class="btn btn-danger btn-sm ms-2"-->
  <!--                @click="removeFromComparison(0)"-->
  <!--            >-->
  <!--              제거-->
  <!--            </button>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        <div class="mx-3 text-center">-->
  <!--          <img src="/src/views/partsSearch/monitor.png" class="default-image"/>-->
  <!--          <p>부품을 선택해 주세요!</p>-->
  <!--        </div>-->
  <!--      </div>-->

  <!--      &lt;!&ndash; 비교할 부품이 두 개 이상인 경우 &ndash;&gt;-->
  <!--      <div v-else class="col-12">-->
  <!--        <div class="table-responsive">-->
  <!--          <table class="table table-dark table-bordered text-center">-->
  <!--            <thead>-->
  <!--            <tr>-->
  <!--              <th>속성</th>-->
  <!--              <th v-for="(part, index) in comparisonParts" :key="index">-->
  <!--                {{ part.name }}-->
  <!--                <button-->
  <!--                    class="btn btn-danger btn-sm ms-2"-->
  <!--                    @click="removeFromComparison(index)"-->
  <!--                >-->
  <!--                  제거-->
  <!--                </button>-->
  <!--              </th>-->
  <!--            </tr>-->
  <!--            </thead>-->
  <!--            <tbody>-->
  <!--            <tr v-for="attribute in attributes" :key="attribute">-->
  <!--              <th>{{ attribute }}</th>-->
  <!--              <td v-for="(part, index) in comparisonParts" :key="index">-->
  <!--                &lt;!&ndash; 속성값이 객체인 경우, 콤마로 구분하여 출력 &ndash;&gt;-->
  <!--                <span v-if="typeof part[attribute] === 'object'">-->
  <!--                    {{ Object.values(part[attribute]).join(", ") }}-->
  <!--                  </span>-->
  <!--                &lt;!&ndash; 속성값이 .jpg URL인 경우 &ndash;&gt;-->
  <!--                <span v-else-if="part[attribute].endsWith('.jpg')">-->
  <!--                    <img-->
  <!--                        :src="part[attribute]"-->
  <!--                        alt="부품 이미지"-->
  <!--                        style="max-width: 100px; max-height: 100px"-->
  <!--                    />-->
  <!--                  </span>-->
  <!--                &lt;!&ndash; 속성값이 객체도 아니고 .jpg URL도 아닌 경우, 그대로 출력 &ndash;&gt;-->
  <!--                <span v-else>-->
  <!--                    {{ part[attribute] }}-->
  <!--                  </span>-->
  <!--              </td>-->
  <!--            </tr>-->
  <!--            </tbody>-->
  <!--          </table>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->

  <!--  부품 출력 영역 -->
  <!--  <div class="container">-->
  <!--    <div class="row">-->
  <!--      <div-->
  <!--          v-for="(part, partId) in filteredParts"-->
  <!--          :key="partId"-->
  <!--          class="col-12 col-md-6 col-lg-3 mb-4"-->
  <!--      >-->
  <!--        <div-->
  <!--            class="card position-relative h-100"-->
  <!--            @click="viewPartDetail(partId)"-->
  <!--        >-->
  <!--          <img :src="part.image" alt="부품 이미지" class="card-img-top"/>-->
  <!--          <div class="card-body d-flex flex-column">-->
  <!--            <h5 class="card-title" style="font-weight: bold">-->
  <!--              {{ part.name }}-->
  <!--            </h5>-->
  <!--            <p class="card-text">{{ part.description }}</p>-->
  <!--            <div class="button-group mb-3">-->
  <!--              <div-->
  <!--                  v-for="element in part.description.split(',')"-->
  <!--                  :key="element"-->
  <!--              >-->
  <!--                <button class="btn btn-outline-primary btn-sm custom-button">-->
  <!--                  {{ element }}-->
  <!--                </button>-->
  <!--              </div>-->
  <!--            </div>-->
  <!--            <div-->
  <!--                class="d-flex justify-content-between align-items-center mt-auto"-->
  <!--            >-->
  <!--              <div>-->
  <!--                <button-->
  <!--                    class="btn btn-sm btn-dark me-2"-->
  <!--                    @click.stop="addToComparison(part)"-->
  <!--                >-->
  <!--                  부품 비교에 추가-->
  <!--                </button>-->
  <!--                <button-->
  <!--                    class="btn btn-sm btn-dark"-->
  <!--                    @click.stop="addToCart(partId)"-->
  <!--                >-->
  <!--                  내 PC에 추가-->
  <!--                </button>-->
  <!--              </div>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script>
import {ref, computed, watch, onMounted, onUnmounted} from "vue";
import {useFiltersStore} from "@/stores/partsFilter";
import {usePcStore} from "@/stores/pcStore";
import {usePartsStore} from "@/stores/parts"
import {useRouter, useRoute} from "vue-router";

export default {
  name: "PartsSearchView",
  setup() {
    const pcStore = usePcStore();
    const partsStore = usePartsStore();
    const partsData = computed(() => partsStore.partsData);
    const router = useRouter();
    const route = useRoute();
    const parts = ref([]);
    const pcs = computed(() => pcStore.pcList);
    const showDropdown = ref(false);
    const showAllCategories = ref(false);
    const showFilterOptions = ref({});
    const filtersStore = useFiltersStore();
    const selectedFilters = ref([]);
    const searchQuery = ref("");
    const comparisonParts = ref([]);
    const isComparisonVisible = ref(true); // 비교 영역 표시 여부를 제어하는 상태 추가

    const currentCategory = ref("cpu");
    const currentFilters = ref(filtersStore.currentFilters);
    const currentImage = ref(1);
    const categoryLabels = {
      cpu: "CPU",
      coolerTuning: "쿨러",
      motherboard: "메인보드",
      memory: "메모리",
      gpu: "그래픽카드",
      ssd: "SSD",
      hdd: "HDD",
      case: "케이스",
      power: "파워",
    };

    const setCategory = (category) => {
      currentCategory.value = category;
      currentFilters.value = category;
      searchQuery.value = "";
      selectedFilters.value = [];
      comparisonParts.value = []; // 부품 비교 초기화
    
      parts.value = Object.entries(partsData[category]).reduce(
          (acc, [id, part]) => {
            acc[id] = {
              name: `${part.manufacturer} ${
                  part.cpuType ||
                  part.productType ||
                  part.deviceType ||
                  part.productSeries ||
                  part.formFactor ||
                  part.productType ||
                  part.ratedOutput
              }`,
              image: "https://via.placeholder.com/150",
              description: generateDescription(part),
              ...part,
            };
            return acc;
          },
          {}
      );
    };
    
    const generateDescription = (part) => {
      let description = "";
      switch (currentCategory.value) {
        case "cpu":
          description = `${part.socketType}, ${part.coreCount}, ${part.threadCount}, ${part.baseClock}~${part.boostClock}, ${part.tdp}`;
          break;
        case "coolerTuning":
          description = `${part.coolingType}, ${part.height}mm, ${part.fanSize}, ${part.maxFanSpeed}RPM`;
          break;
        case "motherboard":
          description = `${part.cpuSocket}, ${part.chipset}, ${part.formFactor}, ${part.memoryType}, ${part.memorySlots} slots`;
          break;
        case "memory":
          description = `${part.memoryCapacity}, ${part.operatingClock}, ${part.ramTiming}, ${part.operatingVoltage}`;
          break;
        case "gpu":
          description = `${
              part.nvidiaChipset || part.amdChipset || part.intelChipset
          }, ${part.baseClock}~${part.boostClock}, ${part.memoryCapacity}`;
          break;
        case "ssd":
          description = `${part.capacity}, ${part.interface}, ${part.sequentialRead}/${part.sequentialWrite} MB/s`;
          break;
        case "hdd":
          description = `${part.diskCapacity}, ${part.interface}, ${part.rotationSpeed} RPM, ${part.bufferSize}`;
          break;
        case "case":
          description = `${part.caseSize}, ${part.boardSupport}, ${part.coolingFans} cooling fans`;
          break;
        case "power":
          description = `${part.ratedOutput}, ${part.certification80Plus}, ${part.coolingFanSize}, ${part.cableConnection}`;
          break;
        default:
          description = "";
      }
      return description;
    };
    
    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };
    
    const editPCName = (pc) => {
      pc.editing = true;
    };
    
    const savePCName = (pc) => {
      pc.editing = false;
    };
    
    const loadPC = (pc) => {
      Object.keys(pcStore.pcList[0]).forEach((key) => {
        pcStore.pcList[0][key] = pc[key] || null;
      });
      pcStore.currentPCIndex = pc.id;
      showDropdown.value = false;
    };
    
    const removePC = async (pcId) => {
      if (confirm("정말로 이 PC를 삭제하시겠습니까?")) {
        await pcStore.removePC(pcId);
      }
    };
    
    const addPC = () => {
      const newPC = {
        id: Date.now(),
        computerName: "새 PC",
        image: "https://via.placeholder.com/150",
        editing: false,
        ...Object.keys(pcStore.pcList[0]).reduce((acc, key) => {
          acc[key] = null;
          return acc;
        }, {}),
      };
      pcStore.pcList.push(newPC);
    };
    
    const removeFromCart = (category) => {
      pcStore.pcList[0][category] = null;
    };
    
    const savePC = async () => {
      if (confirm("저장하시겠습니까?")) {
        try {
          const updatedPC = Object.keys(pcStore.pcList[0]).reduce(
              (acc, key) => {
                acc[key] = pcStore.pcList[0][key] || null;
                return acc;
              },
              {}
          );
          const currentPCIndex = pcs.value.findIndex(
              (pc) => pc.id === pcStore.currentPCIndex
          );
          if (currentPCIndex !== -1) {
            await pcStore.updatePC(pcStore.currentPCIndex, {
              ...pcs.value[currentPCIndex],
              ...updatedPC,
            });
            alert("PC가 저장되었습니다.");
          } else {
            throw new Error("유효하지 않은 PC 인덱스입니다.");
          }
        } catch (error) {
          console.error("PC 저장 중 오류 발생:", error);
          alert(
              "PC를 저장하는 중에 오류가 발생했습니다. 콘솔에서 오류를 확인하세요."
          );
        }
      }
    };
    
    const toggleAllCategories = () => {
      showAllCategories.value = !showAllCategories.value;
    };
    
    const visibleFilters = computed(() => {
      const filters = filtersStore.filterList[currentCategory.value];
      return showAllCategories.value
          ? filters
          : Object.fromEntries(Object.entries(filters).slice(0, 8));
    });
    
    const toggleFilterVisibility = (filterName) => {
      showFilterOptions.value[filterName] =
          !showFilterOptions.value[filterName];
    };
    
    const clearFilters = () => {
      selectedFilters.value = [];
    };
    
    const removeFilter = (filter) => {
      const index = selectedFilters.value.indexOf(filter);
      if (index > -1) {
        selectedFilters.value.splice(index, 1);
      }
    };
    
    const viewPartDetail = (id) => {
      router.push({name: "partDetail", params: {id}});
    };
    
    const filteredParts = computed(() => {
      return Object.entries(parts.value).reduce((acc, [id, part]) => {
        const partNameMatch = part.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase());
        const filtersMatch = selectedFilters.value.every((filter) =>
            part.description.includes(filter)
        );
    
        if (partNameMatch && filtersMatch) {
          acc[id] = part;
        }
        return acc;
      }, {});
    });
    
    const filterParts = (category) => {
      setCategory(category);
      searchQuery.value = "";
      selectedFilters.value = [];
    };
    
    const addToComparison = (part) => {
      if (comparisonParts.value.length < 2) {
        comparisonParts.value.push(part);
      }
    };
    
    const addToCart = (partId) => {
      const category = currentCategory.value;
      pcStore.pcList[0][category] = partId;
    };
    
    const removeFromComparison = (index) => {
      comparisonParts.value.splice(index, 1);
    };
    
    // AI 추천기능 페이지 새창 열기
    const recommendAI = () => {
      const url = router.resolve({name: "recommend"}).href;
    
      // 창의 너비와 높이 설정
      const width = 500;
      const height = 700;
    
      // 화면의 가로 세로 크기 계산
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
    
      // 창을 화면의 중앙에 위치시키기 위한 left, top 계산
      const left = screenWidth / 2 - width / 2;
      const top = screenHeight / 2 - height / 2;
    
      // 창 열기
      window.open(
          url,
          "AI 견적 추천",
          `width=${width},height=${height},resizable=yes,scrollbars=yes,status=no,left=${left},top=${top}`
      );
    };
    
    const attributes = computed(() => {
      if (comparisonParts.value.length === 0) return [];
      return Object.keys(comparisonParts.value[0]).filter(
          (attr) =>
              attr !== "id" &&
              attr !== "name" &&
              attr !== "description" &&
              attr !== "image"
      );
    });

    onMounted(() => {
      partsStore.getParts();
      setCategory("cpu");
    });

    return {
      pcStore,
      filtersStore,
      setCategory,
      parts,
      categoryLabels,
      toggleDropdown,
      showDropdown,
      editPCName,
      savePCName,
      removePC,
      loadPC,
      addPC,
      visibleFilters,
      currentImage,
      partsData,
      currentCategory,
      removeFromCart,
      toggleAllCategories,
      showAllCategories,
      currentFilters,
      showFilterOptions,
      toggleFilterVisibility,
      clearFilters,
      selectedFilters,
      removeFilter,
      searchQuery,
      filterParts,
      filteredParts,
      addToComparison,
      viewPartDetail,
      addToCart,
      comparisonParts,
      removeFromComparison,
      attributes,
      savePC,
      isComparisonVisible,
      recommendAI,
    };
  },
};
</script>

<style scoped>
.bookmark-icon {
  font-size: 1.5rem;
  color: yellow;
  cursor: pointer;
  top: 10px;
  right: 10px;
  position: absolute;
}

.bookmark-icon:hover {
  color: orange;
}

.card {
  background-color: #333;
  color: white;
  border: none;
  margin-bottom: 20px;
}

.btn-link {
  color: white;
}

.btn-link:hover {
  color: orange;
}

.form-check-input {
  margin-right: 0.5rem;
}

.container {
  max-width: 100%;
}

.card-body {
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 1rem;
}

.card-text {
  font-size: 0.875rem;
}

.list-group-item {
  background-color: #212121;
  color: white;
  border: none;
}

.list-group-item:hover {
  background-color: #007bff;
  color: white;
}

.hidden {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.option-box {
  flex: 0 0 20%;
  max-width: 20%;
  margin-bottom: 8px;
}

.cart {
  background-color: #343a40;
  color: white;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.cart-item {
  background-color: #495057;
  border: 1px solid #dee2e6;
  border-radius: 3px;
  padding: 2px 5px;
  margin: 2px;
  display: flex;
  align-items: center;
  font-size: 0.75rem;
}

.small {
  font-size: 0.75rem;
}

.form-check-label {
  font-size: 0.75rem;
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}

.comparison-area {
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.table {
  margin-bottom: 0;
}

.table th,
.table td {
  vertical-align: middle;
}

.dropdown-menu {
  background-color: #212121;
  border: none;
}

.dropdown-menu .card {
  background-color: #333;
  color: white;
}

.detail-button {
  background-color: #333;
  border-color: #333;
  width: 100%;
  display: block;
  text-align: center;
}

.custom-button {
  background-color: #ebedff;
  color: #333;
  border-color: #ebedff;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.part-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-right: 15px;
}

.category-header {
  background-color: #333;
  border-radius: 5px;
}

.toggle-button {
  background-color: #000;
  color: white;
}

.default-image {
  width: 200px;
  height: auto;
  object-fit: contain;
}

.comparison-area .row {
  flex-grow: 1;
}

.mx-3 {
  margin-left: 2rem !important;
  margin-right: 2rem !important;
}

.input-group {
  max-width: 400px;
}

.reset-button {
  border-color: #dc3545;
  color: #dc3545;
}

.reset-button:hover {
  background-color: #dc3545;
  color: white;
}

.toggle-button {
  border-color: #6c757d;
  color: #6c757d;
}

.toggle-button:hover {
  background-color: #6c757d;
  color: white;
}

.search-input {
  background-color: #212121;
  color: white;
  border: 1px solid #495057;
}

.search-input::placeholder {
  color: #adb5bd;
}

.search-button {
  background-color: #343a40;
  border-color: #495057;
  color: white;
}

.search-button:hover {
  background-color: #495057;
  color: white;
}

.pc-management {
  position: relative;
}

.pc-image {
  width: 100%;
  height: auto;
}

.pc-load-dropdown {
  position: relative;
  margin-bottom: 15px; /* Adjust the position as needed */
}

.component-slot {
  position: absolute;
  cursor: pointer;
  width: 20%;
  height: 20%;
}

.component-category {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 2px 5px;
  border-radius: 3px;
  top: 5px;
  left: 5px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
}

.status-icon {
  width: 15px;
  height: 15px;
  margin-left: 5px;
}

.component-info {
  display: none;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 10px;
  border-radius: 5px;
  top: 30px;
  left: 0;
  width: 200%;
  z-index: 1000;
  white-space: nowrap;
}

.component-slot:hover .component-info {
  display: block;
}

.component {
  text-align: center;
  width: 100%;
  height: 100%;
}
</style>
