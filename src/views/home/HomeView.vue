<template>
  <div class="d-flex flex-column min-vh-100">
    <div class="container mt-4 mb-4 flex-grow-1">
      <!-- 1. 컴터챗 광고 배너 부분 -->
      <div class="row mb-5">
        <div class="col">
          <div class="card bg-dark text-white ad-banner">
            <div class="card-body">
              <h5 class="card-title" style="font-weight: bold">
                컴터챗 안에서 자유롭게 원격 수리 멘토링을 받을 수 있어요 !
              </h5>
              <p class="card-text">
                조립 컴퓨터의 궁금한 정보들 직접 얻는 1:1 음성대화, 컴터챗
                어때요?
              </p>
              <div class="button-container">
                <router-link to="/mentor-search" class="btn btn-primary"
                  >멘토 알아보기</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. 신규 멘토 섹션 -->
      <div class="row mb-5">
        <div class="col">
          <h5 style="font-weight: bold">신규 등록한 멘토님이에요!</h5>
          <div class="d-flex justify-content-center flex-wrap">
            <div
              v-for="mentor in homes[0].mentorLists"
              :key="mentor.id"
              class="card m-4 position-relative"
              style="width: 18rem"
            >
              <div
                class="card-header"
                style="
                  background-color: #d83f78;
                  color: white;
                  font-style: normal !important;
                "
              >
                신규 멘토님이에요!
              </div>
              <div class="card-body">
                <h5 class="card-title" style="font-weight: bold">
                  {{ mentor.nickname }}
                </h5>
                <p class="card-text" style="color: #5e67eb; font-weight: bold">
                  만족률:
                  {{ mentor.matchingRate }}%
                </p>
                <p class="card-text">
                  {{ mentor.intro }}
                </p>
              </div>
              <div class="mt-auto">
                <div class="skills mb-2">
                  <span
                    v-for="tech in mentor.techs"
                    :key="tech"
                    class="badge bg-secondary m-1"
                    >{{ techList[tech] }}</span
                  >
                </div>
                <div class="card-footer text-center">
                  <a href="#" class="btn btn-dark btn-sm detail-button w-100"
                    >상세보기</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. 인기 부품 섹션 -->
      <div class="row mb-5">
        <div class="col">
          <h5 style="font-weight: bold">
            지금 많이 검색되고 있는 부품은? TOP 3
          </h5>
          <div class="d-flex justify-content-center flex-wrap">
            <div
              v-for="(part, partId) in homes[0].parts"
              :key="part.id"
              class="card m-4 position-relative"
              style="width: 18rem"
            >
              <div class="card-header bg-success text-white">
                인기 부품이에요 !
              </div>
              <div class="card-body">
                <h5 class="card-title" style="font-weight: bold">
                  {{ part.partName }}
                </h5>
                <div class="button-group mb-3">
                  <button class="btn btn-outline-primary btn-sm custom-button">
                    {{ part.property1 }}
                  </button>
                  <button class="btn btn-outline-primary btn-sm custom-button">
                    {{ part.property2 }}
                  </button>
                  <button class="btn btn-outline-primary btn-sm custom-button">
                    {{ part.property3 }}
                  </button>
                  <button class="btn btn-outline-primary btn-sm custom-button">
                    {{ part.property4 }}
                  </button>
                  <button class="btn btn-outline-primary btn-sm custom-button">
                    {{ part.property5 }}
                  </button>
                </div>
                <router-link
                  :to="{ name: 'partDetail', params: { id: partId } }"
                  class="btn btn-dark btn-sm detail-button w-100"
                  >상세보기</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 4. 게시판 -->
      <div class="row mb-4">
        <div class="col-md-6">
          <FreeBoardList />
        </div>
        <div class="col-md-6">
          <HotBoardList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useBookmarkStore } from "@/stores/bookmark";
import { useHomeStore } from "@/stores/home";
import FreeBoardList from "@/components/Board/FreeBoardList.vue";
import HotBoardList from "@/components/Board/HotBoardList.vue";
import partsData from "@/assets/dummy.json";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "HomeView",
  components: {
    FreeBoardList,
    Navbar,
  },
  setup() {
    const homeStore = useHomeStore();
    const homes = computed(() => homeStore.homeList);

    // 기술 태그 리스트
    const techList = {
      1: "컴퓨터 견적",
      2: "CPU 장착",
      3: "SSD/RAM 장착",
      4: "배선 작업",
      5: "수냉 쿨러",
      6: "케이스 선택",
      7: "전원 공급 장치 설치",
      8: "BIOS 설정",
      9: "드라이버 설치",
      10: "온도 관리",
      11: "업그레이드 팁",
      12: "모니터 연결",
      13: "전원 버튼 연결",
      14: "마더보드 선택",
      15: "고성능 게이밍 컴퓨터 조립",
      16: "소형 폼팩터 컴퓨터 조립",
      17: "사운드 카드 설치",
      18: "Wi-Fi 설정",
      19: "벤치마크 퍼포먼스 조정",
      20: "에러 코드 해결",
      21: "백업 및 복원",
      22: "NAS 관련 데이터 전송",
      23: "디스크 파티션 설정",
      24: "소음 감소 팁",
      25: "리눅스 설치 및 구성",
      26: "IOT 장치 연결",
      27: "데이터 복구",
    };

    return { homes, techList };
  },
};
</script>

<style scoped>
.card-deck {
  display: flex;
  gap: 1rem;
}
.card-header {
  font-weight: bold;
}
footer {
  width: 100%;
}
.bi-bookmark,
.bi-bookmark-fill {
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  z-index: 1;
}
.bookmark-icon {
  z-index: 1;
}

.ad-banner {
  height: 250px;
  padding: 20px;
  position: relative;
}

.button-container {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.custom-button {
  background-color: #ebedff;
  color: #333;
  border-color: #ebedff;
}

.custom-button:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.detail-button {
  background-color: #333;
  border-color: #333;
  width: 100%;
  display: block;
  text-align: center;
}

.mb-3 {
  margin-bottom: 1rem !important;
}
</style>
