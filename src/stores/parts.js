import {ref, computed} from "vue";
import {useRouter} from "vue-router";
import {defineStore} from "pinia";
import axios from "axios";

export const usePartsStore = defineStore("partsStore", () => {
    const router = useRouter();
    const API_URL = "/api/v1/parts";

    const partsData = ref([]);

    // 1. API 호출 부분 --> 부품 목록 불러오기
    const getParts = async () => {
        try {
            const response = await axios.get(`${API_URL}/all`);
            partsData.value = response.data;
            console.log("부품 목록 불러오기 성공");
        } catch (error) {
            console.error("부품 목록 불러오기 실패:", error);
        }
    };

    return {
        getParts,
        partsData,
    };
});
