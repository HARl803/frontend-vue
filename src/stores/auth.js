import {ref, computed} from "vue";
import {useRouter} from "vue-router";
import {defineStore} from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("authStore", () => {
    const router = useRouter();
    const API_URL = "/api/v1";

    const profile = ref();

    const getProfile = async () => {
        try {
            const response = await axios.get(`${API_URL}/auth/profile`);
            profile.value = response.data;
            console.log("사용자 정보 불러오기 성공");
        } catch (error) {
            console.error("사용자 정보 불러오기 실패:", error);
        }
    };

    const logout = async () => {
        try {
            const response = await axios.get(`${API_URL}/auth/logout`);
            profile.value = [];
            router.go();
            console.log("로그아웃 성공");
        } catch (error) {
            console.error("로그아웃 실패:", error);
        }
    }

    return {
        profile,
        getProfile,
        logout,


    };
});
