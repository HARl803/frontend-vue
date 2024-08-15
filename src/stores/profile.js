import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import axios from "axios";

export const useProfileStore = defineStore("profileStore", () => {
    const router = useRouter();
    const API_URL = "/api/v1";

    // 멘토 정보를 저장할 상태를 정의합니다.
    const profileList = ref(
        {
            profileId: "1234567",
            nickname: "chaeni",
            image: "https://img.danawa.com/prod_img/500000/459/728/img/18728459_1.jpg?shrink=270:270",
            intro: "반가워요 ! 잘 가르쳐드리겠습니다 ",
        }
    );
    
return {
    profileList
    };
});

// const profileList = async () => {
//   // 1. API 호출 부분 --> 전체 사용자 불러오기
//   try {
//     const response = await axios.get(`/api/v1/profile`);
//     profileList.value = response.data;
//     console.log('멘토 목록 불러오기 성공');
//   } catch (error) {
//     console.error('멘토 불러오기 실패', error);
//   }
// };


// API 호출 부분 --> 프로필 수정
// const modifyComment = async (profileId, intro) => {
//     console.log("프로필 수정 요청");
//     console.log(profileId);
//     try {
//       await axios.patch(`${API_URL}/profile/comment`, {
//         profileId: profileId,
//         intro: intro,
//       });
//       console.log("프로필 수정 성공");
//     } catch (error) {
//       console.error("프로필 수정 실패");
//       console.error(error);
//     }
//   };