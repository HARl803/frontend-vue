<template>
  <div class="container mt-4 text-white">
    <h4>오늘의 컴터잡은?</h4>
    <p>예약한 컴터잡 리스트에요!</p>
    <ul class="nav nav-tabs mb-4">
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'reservation' }" @click="changeTab('reservation')">예약</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'chat' }" @click="changeTab('chat')">채팅</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'completed' }" @click="changeTab('completed')">완료</a>
      </li>
    </ul>
    <div class="row">
      <div class="col-md-6">
        <div class="card-container">
          <div
            v-for="reservation in paginatedReservations"
            :key="reservation.id"
            class="card bg-dark text-white mb-3 position-relative"
            @mouseleave="hoverReservation(null)"
            style="min-height: 200px;"
          >
            <div class="card-body d-flex">
              <img
                :src="reservation.mentorData.profilePicture"
                class="img-fluid rounded-circle me-3"
                alt="프로필 이미지"
                style="width: 80px; height: 80px; cursor: pointer;"
                @mouseover="hoverReservation(reservation)"
              >
              <div class="flex-grow-1">
                <h5 class="status">{{ reservation.status }}</h5>
                <p class="mb-1">{{ formatDate(reservation.reserveTime) }}</p>
                <h5 class="card-title">{{ reservation.mentorData.nickname }}</h5>
              </div>
              <a href="#" class="text-decoration-none text-light align-self-end" @click.prevent="selectReservation(reservation)">상세보기 &gt;</a>
            </div>
            <div v-if="hoveredReservation === reservation" class="mentor-info-card card bg-dark text-white position-absolute">
              <div class="card-body">
                <p>응답시간: {{ reservation.mentorData.responseTime }}</p>
                <p>매칭률: {{ reservation.mentorData.matchingRate }}</p>
                <p>리뷰 수: {{ reservation.mentorData.reviewCount }}</p>
                <div class="d-flex flex-wrap">
                  <span v-for="skill in reservation.mentorData.skills" :key="skill.pk" class="badge bg-secondary m-1">{{ skill.name }}</span>
                </div>
                <button class="btn btn-outline-light btn-sm mt-3 w-100">프로필 상세</button>
              </div>
            </div>
          </div>
          <div v-for="n in emptySlots" :key="'empty' + n" class="card bg-dark text-white mb-3 position-relative empty-card"></div>
        </div>
      </div>
      <div class="col-md-6">
        <div v-if="selectedReservation" class="card bg-dark text-white">
          <div class="card-body">
            <div v-if="selectedReservation.status === '예약대기' || selectedReservation.status === '시간선택'">
              <h5 class="mt-3">예약 가능한 시간</h5>
              <ul>
                <li v-for="time in selectedReservation.reserveData.availableTime" :key="time">{{ new Date(time).toLocaleString() }}</li>
              </ul>
              <h5>증상</h5>
              <p>{{ selectedReservation.reserveData.symptom }}</p>
            </div>
            <div v-if="selectedReservation.status === '결제'">
              <h5>예약된 시간</h5>
              <p>{{ new Date(selectedReservation.matchingData.reservedTime).toLocaleString() }}</p>
            </div>
            <div v-if="selectedReservation.status === '채팅대기' || selectedReservation.status === '채팅입장'">
              <h5>예약된 시간</h5>
              <p>{{ new Date(selectedReservation.matchingData.reservedTime).toLocaleString() }}</p>
            </div>
            <div v-if="selectedReservation.status === '매칭실패'">
              <h5>매칭 실패</h5>
              <p>{{ selectedReservation.matchingData.message }}</p>
            </div>
            <div v-if="selectedReservation.status === '매칭완료'">
              <h5>매칭 완료</h5>
              <p>{{ selectedReservation.matchingData.message || '리뷰를 작성해주세요.' }}</p>
              <div v-if="selectedReservation.matchingData.review.rating">
                <p>별점: {{ selectedReservation.matchingData.review.rating }}</p>
                <p>리뷰: {{ selectedReservation.matchingData.review.content }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-3">
          <div class="d-flex justify-content-end">
            <button v-if="selectedReservation && selectedReservation.status !== '매칭완료' && selectedReservation.status !== '매칭실패'" class="btn btn-outline-light btn-lg me-2" @click.prevent="cancelReservation(selectedReservation.id)">예약 취소</button>
            <button v-if="selectedReservation && selectedReservation.status === '시간선택'" class="btn btn-outline-light btn-lg me-2" @click.prevent="editReservation(selectedReservation.id)">시간 선택</button>
            <button v-if="selectedReservation && selectedReservation.status === '시간선택'" class="btn btn-outline-light btn-lg me-2" @click.prevent="chooseOtherTime(selectedReservation.id)">다른 시간 선택</button>
            <a v-if="selectedReservation && selectedReservation.status === '결제'" :href="selectedReservation.matchingData.paymentLink" class="btn btn-primary btn-lg me-2">결제</a>
            <a v-if="selectedReservation && (selectedReservation.status === '채팅대기' || selectedReservation.status === '채팅입장')" :href="selectedReservation.matchingData.chatLink" class="btn btn-primary btn-lg">채팅 입장</a>
            <button v-if="selectedReservation && selectedReservation.status === '매칭완료' && !selectedReservation.matchingData.review.rating" class="btn btn-primary btn-lg" @click="writeReview">리뷰 작성</button>
          </div>
        </div>
      </div>
    </div>
    <nav aria-label="Page navigation" class="mt-3">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(currentPage - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: currentPage === page }"
        >
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(currentPage + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <div class="modal" tabindex="-1" ref="modal">
      <div class="modal-dialog">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header">
            <h5 class="modal-title">알림</h5>
            <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <p>{{ modalMessage }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-lg" @click="closeModal">확인</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import reservationsData from '@/assets/reservations.json';

export default {
  name: 'ReservationsView',
  setup() {
    const reservations = ref([]);
    const selectedReservation = ref(null);
    const hoveredReservation = ref(null);
    const modalMessage = ref('');
    const modal = ref(null);
    const activeTab = ref('reservation');
    const currentPage = ref(1);
    const itemsPerPage = 4; // Items per page set to 4

    onMounted(() => {
      reservations.value = reservationsData.reservations;
    });

    const changeTab = (tab) => {
      activeTab.value = tab;
      selectedReservation.value = null; // Reset the selected reservation on tab change
      currentPage.value = 1; // Reset to first page on tab change
    };

    const hoverReservation = (reservation) => {
      hoveredReservation.value = reservation;
    };

    const selectReservation = (reservation) => {
      selectedReservation.value = reservation;
    };

    const cancelReservation = (id) => {
      modalMessage.value = '예약을 취소하시겠습니까?';
      modal.value.style.display = 'block';
    };

    const editReservation = (id) => {
      modalMessage.value = '예약 시간을 선택해주세요.';
      modal.value.style.display = 'block';
    };

    const chooseOtherTime = (id) => {
      modalMessage.value = '다른 시간을 선택해주세요.';
      modal.value.style.display = 'block';
    };

    const closeModal = () => {
      modal.value.style.display = 'none';
    };

    const formatDate = (datetime) => {
      const date = new Date(datetime);
      const formattedDate = `${date.getMonth() + 1}. ${date.getDate()}. ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')} 예약`;
      return formattedDate;
    };

    const filteredReservations = computed(() => {
      return reservations.value.filter((reservation) => {
        if (activeTab.value === 'reservation') {
          return ['예약대기', '시간선택', '결제'].includes(reservation.status);
        } else if (activeTab.value === 'chat') {
          return ['채팅대기', '채팅입장'].includes(reservation.status);
        } else if (activeTab.value === 'completed') {
          return ['매칭실패', '매칭완료'].includes(reservation.status);
        }
      });
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredReservations.value.length / itemsPerPage);
    });

    const paginatedReservations = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return filteredReservations.value.slice(start, start + itemsPerPage);
    });

    const emptySlots = computed(() => {
      return itemsPerPage - paginatedReservations.value.length;
    });

    const changePage = (page) => {
      if (page > 0 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };

    const writeReview = () => {
      modalMessage.value = '리뷰를 작성하시겠습니까?';
      modal.value.style.display = 'block';
    };

    return {
      reservations,
      selectedReservation,
      hoveredReservation,
      modalMessage,
      modal,
      activeTab,
      currentPage,
      itemsPerPage,
      totalPages,
      paginatedReservations,
      emptySlots,
      changeTab,
      hoverReservation,
      selectReservation,
      cancelReservation,
      editReservation,
      chooseOtherTime,
      closeModal,
      formatDate,
      filteredReservations,
      changePage,
      writeReview
    };
  }
};
</script>

<style scoped>
.container {
  background-color: #212121;
  padding: 20px;
  border-radius: 5px;
  color: white;
}
.card {
  background-color: #333;
  color: white;
  position: relative;
  padding-left: 20px;
}
.card .status {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 1.25rem;
}
.card-body {
  padding-top: 60px; /* Adjust padding to accommodate the status */
}
.nav-tabs .nav-link {
  color: #ccc;
}
.nav-tabs .nav-link.active {
  color: white;
  background-color: #333;
  border-color: #333;
}
.btn-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
}
.modal-content {
  background-color: #333;
}
.mentor-info-card {
  position: absolute;
  top: 80px;
  left: 0;
  z-index: 1000;
  width: 250px;
  background-color: #333;
  border: 1px solid #444;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}
.mentor-info-card .card {
  background-color: #333;
}
.mentor-info-card .btn-outline-light {
  width: 100%;
  margin-top: 10px;
}
.empty-card {
  visibility: hidden;
}
.pagination {
  justify-content: center;
}
.card-footer {
  background: none;
  border-top: none;
  padding-top: 10px;
}
.btn-lg {
  font-size: 1.25rem;
  padding: 0.5rem 1rem;
  margin-bottom: 10px;
}
</style>
