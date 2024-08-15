import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import axios from "axios";

export const usePcStore = defineStore("mypcstore", () => {
  const router = useRouter();
  const API_URL = "/api/v1";

  // PC 정보를 저장할 상태를 정의합니다.
  const pcList = ref([
    {
      computerName: "N뉴컴ㅋㅋ",
      id: "634c847c-7f4f-4a9b-89e8-727274216587",
      cpu: "10001",
      coolerTuning: "20001",
      motherboard: null,
      memory: "40001",
      gpu: "50001",
      ssd: "60001",
      hdd: "70001",
      case: "80001",
      power: "90001",
    },
  ]);

  // const pcList = async () => {
  //   // 1. API 호출 부분 --> 내 PC 불러오기
  //   try {
  //     // const response = await axios.get(`${API_URL}/pc?userId=ojw`);
  //     const response = await axios.get(`/api/v1/pc?userId=ojw`);
  //     pcList.value = response.data;
  //     console.log('내 PC 목록 불러오기 성공');
  //   } catch (error) {
  //     console.error('PC 목록 불러오기 실패', error);
  //   }
  // };

  // // 2. API 호출 부분 --> 내 PC 추가
  // const addPC = async (pc) => {
  //   try {
  //     const response = await axios.post(`/api/v1/pc/ojw`, pc);
  //     pcList.value.push(response.data);
  //     console.log('PC 추가 성공');
  //   } catch (error) {
  //     console.error('PC 추가 실패', error);
  //   }
  // };

  // // 3.  API 호출 부분 --> 내 PC 제거
  // const removePC = async (id) => {
  //   try {
  //     await axios.delete(`/api/v1/pc/ojw/3166c10b-3873-4b58-838f-1f107d3311e2`);
  //     pcList.value = pcList.value.filter(pc => pc.id !== id);
  //     console.log('PC 삭제 성공');
  //   } catch (error) {
  //     console.error('PC 삭제 실패', error);
  //   }
  // };

  // // 4. API 호출 부분 --> 내 PC 수정
  // const updatePC = async (id, pc) => {
  //   console.log("fgdgfddfggdfgdf");
  //   console.log(pc);
  //   try {

  //     const response = await axios.patch(`/api/v1/pc/ojw`, pc);
  //     const index = pcList.value.findIndex(item => item.id === id);
  //     if (index !== -1) {
  //       pcList.value[index] = response.data;
  //     }
  //     console.log('PC 업데이트 성공');
  //   } catch (error) {
  //     console.error('PC 업데이트 실패', error);
  //   }
  // };

  return {
    pcList,
    // myPC,
    // addPC,
    // removePC,
    // updatePC
  };
});
