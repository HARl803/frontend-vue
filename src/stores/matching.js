import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import axios from "axios";

export const useMatchingStore = defineStore("matchingStore", () => {
  const router = useRouter();
  const API_URL = "https://i11a803.p.ssafy.io/api/v1";

  // 멘토 정보를 저장할 상태를 정의합니다.
  const matchingList = ref([
    {
      1: {
        possible_start_time: [
          "2024-07-30T19:00:00",
          "2024-07-30T19:00:00",
          "2024-07-30T19:00:00",
        ],
        symptomDetail: "hihi",
        symptomImageFile: "image urll",
        mentorId: "chaeni",
      },
    },
  ]);
  return {
    matchingList,
  };
});

// const mentoList = async () => {
//   // 1. API 호출 부분 --> 매칭 데이터 불러오기
//   try {
//     const response = await axios.get(`/api/v1/matching`);
//     matchingList.value = response.data;
//     console.log('매칭 목록 불러오기 성공');
//   } catch (error) {
//     console.error('매칭 불러오기 실패', error);
//   }
// };
