import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import axios from "axios";

export const useMentorStore = defineStore("mentorStore", () => {
  const router = useRouter();
  const API_URL = "https://i11a803.p.ssafy.io/api/v1";

  // 멘토 정보를 저장할 상태를 정의합니다.
  const mentorList = ref([
    {
      1234567: {
        nickname: "chaeni",
        intro: "반가워요 ! 잘 가르쳐드리겠습니다 ",
        matchingRate: "99%",
        techs: ["1", "2", "3", "4", "5"],
      },
    },
    {
      1234568: {
        nickname: "juwon",
        intro: "안녕하세요 ! 저는 모르는 게 없답니다 ^^ ",
        matchingRate: "12%",
        techs: ["7", "27"],
      },
    },
  ]);

  // 멘토 상세 정보를 저장할 상태를 정의합니다.
  const mentorDetail = ref({
    profileId: "1234567",
    nickname: "juwon",
    intro: "안녕하세요 ! 저는 모르는 게 없답니다 ^^ ",
    matchingRate: "12%",
    techs: ["7", "27"],
    times: [
      "101010101010101010101010101010101010101010101010",
      "101010101010101010101010101010101010101010101011",
      "111010101010101010101010101010101010101010101010",
      "111110101010101010101010101010101010101010101010",
      "111111111010101010101010101010101010101010101010",
      "101010101010101010101010101000101000101010101010",
      "111110001010101010101010101010101010101010101010",
    ],
    description:
      "쩝쩝쩝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
    questions: ["쩝1 - 이런 거 물어봐주세요 ^^", "쩝2", "쩝3"],
    reviews: [
      {
        writerName: "chaeni",
        content: "친절해요^^",
        star: "4",
        date: "2024-08-07T09:00:00",
      },
      {
        writerName: "chaeni2",
        content: "친절해요^^",
        star: "2",
        date: "2024-08-07T09:00:00",
      },
      {
        writerName: "chaeni",
        content: "친절해요^^",
        star: "4",
        date: "2024-08-07T09:00:00",
      },
      {
        writerName: "chaeni2",
        content: "친절해요^^",
        star: "2",
        date: "2024-08-07T09:00:00",
      },
      {
        writerName: "chaeni",
        content: "친절해요^^",
        star: "4",
        date: "2024-08-07T09:00:00",
      },
      {
        writerName: "chaeni2",
        content: "친절해요^^",
        star: "2",
        date: "2024-08-07T09:00:00",
      },
      {
        writerName: "chaeni",
        content: "친절해요^^",
        star: "4",
        date: "2024-08-07T09:00:00",
      },
      {
        writerName: "chaeni2",
        content: "친절해요^^",
        star: "2",
        date: "2024-08-07T09:00:00",
      },
    ],
  });

  return {
    mentorList,
    mentorDetail,
  };
});

// const mentoList = async () => {
//   // 1. API 호출 부분 --> 멘토 불러오기
//   try {
//     const response = await axios.get(`/api/v1/profile`);
//     mentoList.value = response.data;
//     console.log('멘토 목록 불러오기 성공');
//   } catch (error) {
//     console.error('멘토 불러오기 실패', error);
//   }
// };

// const mentorDetail = async () => {
//   // 1. API 호출 부분 --> 멘토 상세 정보 불러오기
//   try {
//     const response = await axios.get(`/api/v1/profile/${profileId}`);
//     mentoList.value = response.data;
//     console.log('멘토 목록 불러오기 성공');
//   } catch (error) {
//     console.error('멘토 불러오기 실패', error);
//   }
// };
