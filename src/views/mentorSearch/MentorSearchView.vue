<template>
  <!-- 1. 기술 태그 영역 -->
  <div class="container mt-4">
    <div class="row">
      <div class="col-12 col-lg-8">
        <h5>기술 태그</h5>
        <div class="card mb-3 bg-dark text-white">
          <div class="card-body">
            <h5>기술 태그 화면</h5>
            <div class="d-flex flex-wrap align-items-start">
              <div v-for="tech in techList" :key="tech" class="option-box mb-1">
                <div class="form-check small">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :value="tech"
                    :id="tech"
                    v-model="selectedSkills"
                  />
                  <label
                    class="form-check-label text-truncate"
                    :for="tech"
                    title="{{ tech }}"
                    >{{ tech }}</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. 기술 담기, 초기화 -->
      <div class="col-12 col-lg-4">
        <div class="list-group">
          <a
            href="#"
            class="list-group-item list-group-item-action bg-dark text-white d-flex justify-content-between align-items-center"
            @click="showSkills"
          >
            기술
            <div class="d-flex align-items-center flex-grow-1">
              <div class="d-flex flex-wrap align-items-center">
                <div
                  v-for="skill in selectedSkills"
                  :key="skill"
                  class="cart-item bg-secondary text-white p-1 m-1 rounded d-flex align-items-center small"
                >
                  {{ skill }}
                  <button
                    class="btn btn-link btn-sm text-danger ms-1 p-0"
                    @click="removeSkill(skill)"
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
            <button
              class="btn btn-danger btn-sm me-2"
              @click.stop="clearSkills"
            >
              초기화
            </button>
          </a>
        </div>
      </div>

      <!-- 3. 멘토 카드 리스트 -->
      <div class="row mt-4">
        <div
          class="cart mt-3 mb-3 bg-dark text-white p-2 rounded d-flex align-items-center flex-wrap"
        >
          <input
            type="text"
            class="form-control mb-3"
            placeholder="멘토명을 검색하세요 ..."
            v-model="searchQuery"
          />
        </div>
        <div
          v-for="mentor in mentors"
          :key="mentor"
          class="col-12 col-md-6 col-lg-3 mb-3"
        >
          <div v-for="(mento, mentoId) in mentor" :key="mento">
            <div class="card h-100 bg-dark text-white position-relative">
              <!-- {{ isInclude(mento.techs, selectedSkills) }} -->
              <div v-if="selectedSkills.length">
                <div v-if="isInclude(mento.techs, selectedSkills).length">
                  <div v-if="searchQuery.length">
                    <div v-if="mento.nickname.includes(searchQuery)">
                      <img
                        :src="mento.profilePicture"
                        class="card-img-top"
                        :alt="mento.nickname"
                      />
                      <div class="card-body d-flex flex-column">
                        <h5 class="card-title">{{ mento.nickname }}</h5>
                        <p class="card-text">
                          만족율:
                          {{ mento.matchingRate }}
                        </p>
                        <p class="card-text">{{ mento.intro }}</p>
                        <div class="mt-auto">
                          <div class="skills mb-2">
                            <span
                              v-for="tech in mento.techs"
                              :key="tech"
                              class="badge bg-secondary m-1"
                              >{{ techList[tech] }}</span
                            >
                          </div>
                          <button
                            class="btn btn-outline-light btn-sm w-100 mt-auto"
                            @click="viewMentorDetail(mentoId)"
                          >
                            상세보기
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <img
                      :src="mento.profilePicture"
                      class="card-img-top"
                      :alt="mento.nickname"
                    />
                    <div class="card-body d-flex flex-column">
                      <h5 class="card-title">{{ mento.nickname }}</h5>
                      <p class="card-text">
                        만족율:
                        {{ mento.matchingRate }}
                      </p>
                      <p class="card-text">{{ mento.intro }}</p>
                      <div class="mt-auto">
                        <div class="skills mb-2">
                          <span
                            v-for="tech in mento.techs"
                            :key="tech"
                            class="badge bg-secondary m-1"
                            >{{ techList[tech] }}</span
                          >
                        </div>
                        <button
                          class="btn btn-outline-light btn-sm w-100 mt-auto"
                          @click="viewMentorDetail(mentoId)"
                        >
                          상세보기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div v-if="searchQuery.length">
                  <div v-if="mento.nickname.includes(searchQuery)">
                    <img
                      :src="mento.profilePicture"
                      class="card-img-top"
                      :alt="mento.nickname"
                    />
                    <div class="card-body d-flex flex-column">
                      <h5 class="card-title">{{ mento.nickname }}</h5>
                      <p class="card-text">
                        만족율:
                        {{ mento.matchingRate }}
                      </p>
                      <p class="card-text">{{ mento.intro }}</p>
                      <div class="mt-auto">
                        <div class="skills mb-2">
                          <span
                            v-for="tech in mento.techs"
                            :key="tech"
                            class="badge bg-secondary m-1"
                            >{{ techList[tech] }}</span
                          >
                        </div>
                        <button
                          class="btn btn-outline-light btn-sm w-100 mt-auto"
                          @click="viewMentorDetail(mentoId)"
                        >
                          상세보기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <img
                    :src="mento.profilePicture"
                    class="card-img-top"
                    :alt="mento.nickname"
                  />
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title">{{ mento.nickname }}</h5>
                    <p class="card-text">
                      만족율:
                      {{ mento.matchingRate }}
                    </p>
                    <p class="card-text">{{ mento.intro }}</p>
                    <div class="mt-auto">
                      <div class="skills mb-2">
                        <span
                          v-for="tech in mento.techs"
                          :key="tech"
                          class="badge bg-secondary m-1"
                          >{{ techList[tech] }}</span
                        >
                      </div>
                      <button
                        class="btn btn-outline-light btn-sm w-100 mt-auto"
                        @click="viewMentorDetail(mentoId)"
                      >
                        상세보기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </div>
    </div>
  </div> -->
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useMentorStore } from "@/stores/mentor";
import { useRouter } from "vue-router";

export default {
  name: "MentorSearchView",
  setup() {
    const router = useRouter();
    const mentorStore = useMentorStore();
    const mentors = computed(() => mentorStore.mentorList);
    const searchQuery = ref("");

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

    // 기술 검색 선택
    const selectedSkills = ref([]);

    // 기술 검색 교집합 리스트
    const filteredSkills = ref([]);

    // 기술 검색 제거
    const removeSkill = (skill) => {
      const index = selectedSkills.value.indexOf(skill);
      if (index > -1) {
        selectedSkills.value.splice(index, 1);
      }
    };

    // 기술 검색 초기화
    const clearSkills = () => {
      selectedSkills.value = [];
    };

    // 페이지 이동
    const viewMentorDetail = (id) => {
      router.push({ name: "mentorDetail", params: { id } });
    };

    // 
    const isInclude = (arr1, arr2) => {
      return arr1.filter((v) => arr2.includes(techList[v]));
    };

    return {
      mentorStore,
      mentors,
      techList,
      selectedSkills,
      removeSkill,
      clearSkills,
      viewMentorDetail,
      isInclude,
      filteredSkills,
      searchQuery,
    };
  },
};
</script>

<style scoped>
.bookmark-icon {
  font-size: 1.5rem;
  color: yellow;
  cursor: pointer;
}

.bookmark-icon:hover {
  color: orange;
}

.card {
  background-color: #333;
  color: white;
}

.btn-link {
  color: white;
}

.btn-link:hover {
  color: orange;
}

.form-check-input {
  margin-right: 0.5rem;
}

.container {
  max-width: 100%;
}

.card-body {
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 1rem;
}

.card-text {
  font-size: 0.875rem;
}

.list-group-item {
  background-color: #212121;
  color: white;
  border: none;
}

.list-group-item:hover {
  background-color: #007bff;
  color: white;
}

.hidden {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.option-box {
  flex: 0 0 20%;
  max-width: 20%;
  margin-bottom: 8px;
}

.cart {
  background-color: #343a40;
  color: white;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.cart-item {
  background-color: #495057;
  border: 1px solid #dee2e6;
  border-radius: 3px;
  padding: 2px 5px;
  margin: 2px;
  display: flex;
  align-items: center;
  font-size: 0.75rem;
}

.small {
  font-size: 0.75rem;
}

.form-check-label {
  font-size: 0.75rem;
}

.text-truncate {
  display: inline-block;
  max-width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}

.skills .badge {
  font-size: 0.75rem;
}

.btn-outline-light {
  border-color: #fff;
}
</style>
