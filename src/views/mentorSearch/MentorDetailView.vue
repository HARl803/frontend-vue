<template>
  <!-- 1. 프로필 영역 -->
  <div class="profile-header bg-dark text-white p-3 rounded position-relative">
    <div class="row align-items-center">
      <div class="col-md-3 text-center">
        <img
          :src="mentor.profilePicture"
          class="img-fluid rounded-circle"
          alt="프로필 이미지"
          style="width: 150px; height: 150px"
        />
      </div>
      <div class="col-md-6 text-center">
        <h5 class="card-title">{{ mentor.nickname }}</h5>
        <p class="card-text">{{ mentor.intro }}</p>
        <p>
          매칭률:
          {{ mentor.matchingRate }}
        </p>
        <div class="d-flex flex-wrap justify-content-center">
          <span
            v-for="tech in mentor.techs"
            :key="tech"
            class="badge bg-secondary m-1"
            >{{ techList[tech] }}</span
          >
        </div>
      </div>
      <button class="btn btn-primary btn-lg mt-3" @click="goToReserve()">
        원격 상담 신청
      </button>
    </div>
  </div>

  <!-- 2. 멘토 상세 소개 영역 -->
  <div class="mentor-intro mt-4">
    <h5>멘토 상세 소개</h5>
    {{ mentor.description }}
  </div>

  <!-- 3. 멘토 질문 영역-->
  <div class="questions mb-3">
    <h5>이런 질문 환영합니다!</h5>
    <div
      v-for="question in mentor.questions"
      :key="question"
      class="bg-secondary text-white p-2 rounded mb-2"
    >
      {{ question }}
    </div>
  </div>

  <!-- 4. 멘티 후기 영역 -->
  <div class="reviews bg-dark text-white p-3 rounded">
    <!-- 4-1. 멘티 후기 헤더 -->
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h5>다른 멘티가 남긴 후기 ({{ mentor.reviews.length }})</h5>
      <select
        class="form-select w-auto"
        v-model="sortOrder"
        @change="sortReviews"
      >
        <option value="latest">최신순</option>
        <option value="highest">별점 높은순</option>
        <option value="lowest">별점 낮은순</option>
      </select>
    </div>

    <!-- 4-2. 리뷰 paginated -->
    <div
      id="reviewCarouselControls"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div
          class="carousel-item"
          v-for="(reviewGroup, index) in paginatedReviews"
          :key="index"
          :class="{ active: index === 0 }"
        >
          <!-- 4-3. 리뷰 보여주기 -->
          <div
            v-for="review in reviewGroup"
            :key="review"
            class="bg-secondary text-white p-2 rounded mb-2"
          >
            <p class="mb-1">{{ review.content }}</p>

            <div>
              <span
                v-for="n in 5"
                :key="n"
                :class="
                  n <= review.star
                    ? 'bi bi-star-fill text-warning'
                    : 'bi bi-star text-warning'
                "
              ></span>
            </div>
            <small>{{ review.date }} - {{ review.writerName }}</small>
          </div>
          <div v-if="reviewGroup.length < 5">
            <div
              v-for="i in 5 - reviewGroup.length"
              :key="'empty' + i"
              class="bg-secondary text-white p-2 rounded mb-2"
              style="visibility: hidden"
            >
              <p class="mb-1">&nbsp;</p>
              <div>
                <span class="bi bi-star text-warning"></span>
                <span class="bi bi-star text-warning"></span>
                <span class="bi bi-star text-warning"></span>
                <span class="bi bi-star text-warning"></span>
                <span class="bi bi-star text-warning"></span>
              </div>
              <small>&nbsp;</small>
            </div>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#reviewCarouselControls"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#reviewCarouselControls"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMentorStore } from "@/stores/mentor";

export default {
  name: "MentorDetailView",
  setup() {
    const router = useRouter();
    const mentorStore = useMentorStore();
    const mentor = computed(() => mentorStore.mentorDetail);
    const sortOrder = ref("latest");
    const reviews = ref([]);

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

    // 원격 상담 신청하기
    const goToReserve = (mentorId) => {
      console.log(mentor.reviews);
      router.push({ name: "reserve", params: { id: mentorId } });
    };

    // 리뷰 보여주는 방식(최신순, 별점 높은 순, 별점 낮은 순)
    const sortedReviews = computed(() => {
      return reviews.value.sort((a, b) => {
        if (sortOrder.value === "latest") {
          return new Date(b.date) - new Date(a.date);
        } else if (sortOrder.value === "highest") {
          return b.star - a.star;
        } else if (sortOrder.value === "lowest") {
          return a.star - b.star;
        }
        return 0;
      });
    });

    // 리뷰 페이지 넘기기
    const paginatedReviews = computed(() => {
      const chunkSize = 5;
      const chunks = [];
      for (let i = 0; i < sortedReviews.value.length; i += chunkSize) {
        chunks.push(sortedReviews.value.slice(i, i + chunkSize));
      }
      return chunks;
    });

    // 리뷰 정렬 바꾸기
    const sortReviews = () => {
      sortedReviews.value;
      document
        .querySelector("#reviewCarouselControls .carousel-item.active")
        ?.classList.remove("active");
      document
        .querySelector("#reviewCarouselControls .carousel-item")
        ?.classList.add("active");
    };

    onMounted(() => {
      reviews.value = mentor.value.reviews;
      console.log(mentor.value.reviews);
    });

    return {
      techList,
      mentor,
      goToReserve,
      sortOrder,
      sortReviews,
      sortedReviews,
      paginatedReviews,
      reviews,
    };
  },
};
</script>

<style scoped>
.profile-header {
  background-color: #343a40;
  color: white;
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
}
.profile-image img {
  width: 150px;
  height: 150px;
}
.profile-info {
  color: #fff;
}
.profile-level {
  color: #fff;
}
.progress {
  width: 200px;
}
.skills .badge {
  font-size: 0.875rem;
}
.mentor-intro,
.mentor-pcs,
.questions,
.reviews {
  background-color: #212121;
  padding: 20px;
  border-radius: 10px;
  color: white;
}
.btn-lg {
  font-size: 1.25rem;
  padding: 0.5rem 1rem;
}
.bookmark-icon {
  font-size: 2rem;
  top: 10px;
  right: 20px;
}
.list-group-item {
  background-color: #343a40;
  color: white;
}
.carousel-control-prev,
.carousel-control-next {
  width: 5%;
}
</style>
