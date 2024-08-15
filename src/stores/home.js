import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import axios from "axios";

export const useHomeStore = defineStore("homestore", () => {
  const router = useRouter();
  const API_URL = "/api/v1";

  const homeList = ref([
    {
      parts: {
        10001: {
          partName: "부품명1",
          image: "https://img.danawa.com/prod_img/500000/459/728/img/18728459_1.jpg?shrink=270:270",
          partDescription: "부품1에 대한 짧은 소개입니다.",
          property1: "특성1",
          property2: "특성2",
          property3: "특성3",
          property4: "특성4",
          property5: "특성5",
        },
        10002: {
          partName: "부품명2",
          image: "https://img.danawa.com/prod_img/500000/459/728/img/18728459_1.jpg?shrink=270:270",
          partDescription: "부품2에 대한 짧은 소개입니다.",
          property1: "특성11",
          property2: "특성22",
          property3: "특성33",
          property4: "특성44",
          property5: "특성55",
        },
        10003: {
          partName: "부품명3",
          image: "https://img.danawa.com/prod_img/500000/459/728/img/18728459_1.jpg?shrink=270:270",
          partDescription: "부품3에 대한 짧은 소개입니다.",
          property1: "특성111",
          property2: "특성222",
          property3: "특성333",
          property4: "특성444",
          property5: "특성555",
        },
      },

      mentorLists: {
        1234567: {
          nicknName: "chaeni",
          intro: "반가워요 ! 잘 가르쳐드리겠습니다 ",
          matchingRate: "99%",
          techs: ["1", "2", "3", "4", "5"],
        },
        1234568: {
          nicknName: "juwon",
          intro: "반가워요 ! 가보자구 같이 ",
          matchingRate: "100%",
          techs: ["1", "2", "3", "4", "7"],
        },
        1234569: {
          nicknName: "updown",
          intro: "반가워요 ! 잘 고쳐볼게요오 ",
          matchingRate: "30%",
          techs: ["1", "2", "3", "4", "6"],
        },
      },

      boradLists: {
        777777: {
          nicknName: "chaeni",
          postTitle: "첫 번째 게시글",
          postCreatedDate: "2024-01-01 12:00",
        },
        123546: {
          nicknName: "juwon",
          postTitle: "두 번째 게시글",
          postCreatedDate: "2024-01-01 12:00",
        },
        1223446: {
          nicknName: "updown",
          postTitle: "세 번째 게시글",
          postCreatedDate: "2024-01-01 12:00",
        },
        123234546: {
          nicknName: "juwon",
          postTitle: "네 번째 게시글",
          postCreatedDate: "2024-01-01 12:00",
        },
        12354316: {
          nicknName: "updown",
          postTitle: "다섯 번째 게시글",
          postCreatedDate: "2024-01-01 12:00",
        },


      }
    },
  ]);

  return {
    homeList,
  };
});

// const homeList = async () => {
//   // 1. API 호출 부분 --> 메인페이지 데이터 불러오기
//   try {
//     // const response = await axios.get(`${API_URL}/pc?userId=ojw`);
//     const response = await axios.get(`/api/v1/pc?userId=ojw`);
//     homeList.value = response.data;
//     console.log('메인페이지 데이터 목록 불러오기 성공');
//   } catch (error) {
//     console.error('메인페이지 데이터  불러오기 실패', error);
//   }
// };
