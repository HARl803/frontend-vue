import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import axios from "axios";

export const useCsCenterStore = defineStore("csCenterStore", () => {
  const router = useRouter();
  const API_URL = "/api/v1";

  // CS 정보를 저장할 상태를 정의합니다.
  const csList = ref([
    {
      name: "chaeni",
    },
  ]);

  return {
    csList,
  };
});

// const csList = async () => {
//   // 1. API 호출 부분 --> 내 cs 목록
//   try {
//     const response = await axios.get(`/api/v1/pc?userId=ojw`);
//     csList.value = response.data;
//     console.log('내 PC 목록 불러오기 성공');
//   } catch (error) {
//     console.error('PC 목록 불러오기 실패', error);
//   }
// };
