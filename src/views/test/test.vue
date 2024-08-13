<template>
  <!-- <div class="col-12 col-lg-6"> -->
    <!-- {{ pcStore }} -->
    <!-- {{ pcStore.pcList }} -->
    <!-- <div
      class="d-flex justify-content-between align-items-center mb-2 comparison-header"
    >
      <button
        class="btn btn-success w-50 dropdown-toggle"
        @click="toggleDropdown"
      >
        내 PC 불러오기
      </button>
    </div>
    <div class="pc-management">
      <div
        v-if="showDropdown"
        class="dropdown-menu w-100 p-2"
        style="display: block"
      >
        <div v-for="pc in pcStore.pcList" :key="pc.id" class="card mb-2">
          <div
            class="card-header d-flex justify-content-between align-items-center"
          >
            <div>
              <button @click="addPC">PC 추가</button>
              <span v-for="pc in pcs" :key="pc.id" class="d-flex align-items-center">
              <img
                :src="pc.image"
                class="img-fluid me-2"
                alt="PC 이미지"
                style="width: 50px; height: 50px"
              />
              <input
                v-if="pc.editing"
                v-model="pc.computerName"
                @blur="savePCName(pc)"
                @keyup.enter="savePCName(pc)"
                class="form-control form-control-sm me-2"
              />
              <span v-else @dblclick="editPCName(pc)">{{
                pc.computerName
              }}</span>
              <i class="bi bi-pencil ms-2" @click="editPCName(pc)"></i>
              </span>
            </div>
            <div>
              <button class="btn btn-primary btn-sm" @click="loadPC(pc)">
                불러오기
              </button>
              <button
                class="btn btn-danger btn-sm ms-2"
                @click="removePC(pc.id)"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
        <div class="text-center mt-3">
          <button class="btn btn-success btn-sm" @click="addPC">
            추가하기
          </button>
        </div>
      </div>
      <img
        v-if="currentImage === 1"
        src="/src/views/partsSearch/myPC.jpg"
        class="pc-image"
        :style="{ height: comparisonAreaHeight + 'px' }"
      />
      <img
        v-if="currentImage === 2"
        src="/src/views/partsSearch/myPC2.jpg"
        class="pc-image"
        :style="{ height: comparisonAreaHeight + 'px' }"
      />

      <template v-for="(categoryLabel, categoryKey) in categoryLabels">
        {{ categoryCart[categoryKey] }}
        <div
          v-if="isCategoryVisible(categoryKey)"
          :class="`component-slot ${categoryKey}-slot`"
          @click="filterPartsByCategory(categoryKey)"
        >
          <div class="component-category">
            {{ categoryLabel }}
            <img
              v-if="categoryCart[categoryKey]"
              src="/src/assets/check.png"
              class="status-icon"
            />
            <img v-else src="/src/assets/plus.png" class="status-icon" />
          </div>
          <div
            v-if="categoryCart[categoryKey]"
            class="component-info bg-dark bg-opacity-75 p-2 rounded"
          >
            <div class="d-flex justify-content-between align-items-center">
              {{ categoryCart }}
              {{ categoryCart[categoryKey].partsName }}
              {{ part.name }}
              <button
                class="btn btn-danger btn-sm"
                @click="removeFromCart(categoryKey)"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="d-flex justify-content-between mt-3">
      <button class="btn btn-secondary" @click="prevImage">
        <i class="bi bi-arrow-left"></i> 이전
      </button>
      <button class="btn btn-secondary" @click="nextImage">
        다음 <i class="bi bi-arrow-right"></i>
      </button>
    </div>
    <button class="btn btn-primary w-100 my-3" @click="savePC">저장</button>
  </div> -->
</template>

<script>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useBookmarkStore } from '@/stores/bookmark';
import { useFiltersStore } from '@/stores/partsFilter';
import { usePcStore } from '@/stores/pcStore';
import partsData from '@/assets/dummy.json';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'PartsSearchView',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const parts = ref([]);
    const pcs = computed(() => pcStore.pcList);

    const fetchMyPC = () => {
      pcStore.myPC();
    };

    onMounted(() => {

        // 추가요!!!!
        // 컴포넌트가 마운트되었을 때 PC 목록을 불러옵니다.
        fetchMyPC();
        }
    )};
    return {

        // 추가요
        fetchMyPC,
        pcStore,
        
}};

