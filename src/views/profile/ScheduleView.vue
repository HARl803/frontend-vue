<template>
  <div class="container mt-4 text-white">
    <h4>예약 관리</h4>
    <ul class="nav nav-tabs mb-4">
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'pending' }" @click="changeTab('pending')">미확정</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'confirmed' }" @click="changeTab('confirmed')">확정</a>
      </li>
    </ul>
    <div v-if="activeTab === 'pending'" class="row">
      <div v-for="reservation in pendingReservations" :key="reservation.reserveTime" class="col-md-6 mb-3">
        <div class="card bg-dark text-white">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <img :src="reservation.menteeData.profilePicture" class="rounded-circle me-3" alt="프로필 이미지" style="width: 80px; height: 80px;">
              <div>
                <h5 class="card-title">{{ reservation.menteeData.nickname }}</h5>
                <p class="mb-1">예약 시간: {{ formatDate(reservation.reserveTime) }}</p>
                <p class="mb-1">증상: {{ reservation.reserveData.symptom }}</p>
              </div>
            </div>
            <div class="mt-3">
              <button class="btn btn-outline-light w-100" @click="confirmSchedule(reservation)">일정 선택</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="activeTab === 'confirmed'">
      <Calendar @date-selected="onDateSelected" />
      <div v-if="selectedDateReservations.length > 0" class="mt-4">
        <h5>선택된 날짜의 예약</h5>
        <div v-for="reservation in selectedDateReservations" :key="reservation.reserveTime" class="card bg-dark text-white mb-3">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <img :src="reservation.menteeData.profilePicture" class="rounded-circle me-3" alt="프로필 이미지" style="width: 80px; height: 80px;">
              <div>
                <h5 class="card-title">{{ reservation.menteeData.nickname }}</h5>
                <p class="mb-1">예약 시간: {{ formatDate(reservation.reserveTime) }}</p>
                <p class="mb-1">증상: {{ reservation.reserveData.symptom }}</p>
                <p class="mb-1" v-if="reservation.status === '채팅입장'">채팅 링크: <a :href="reservation.matchingData.chatLink" class="text-decoration-none text-light">{{ reservation.matchingData.chatLink }}</a></p>
                <p class="mb-1" v-if="reservation.status === '매칭실패'">실패 사유: {{ reservation.matchingData.message }}</p>
                <p class="mb-1" v-if="reservation.status === '매칭완료' && reservation.matchingData.review.content">리뷰: {{ reservation.matchingData.review.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="mt-4">
        <p>선택된 날짜에 예약이 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import Calendar from '@/components/Calendar.vue';
import mentorReservations from '@/assets/mentorReservations.json';

export default {
  name: 'ScheduleView',
  components: {
    Calendar
  },
  setup() {
    const activeTab = ref('pending');
    const selectedDate = ref(null);
    const reservations = ref(mentorReservations.mentorReservations);

    const pendingReservations = computed(() => {
      return reservations.value.filter(reservation => reservation.status === '일정선택');
    });

    const confirmedReservations = computed(() => {
      return reservations.value.filter(reservation => ['채팅대기', '채팅입장', '매칭실패', '매칭완료'].includes(reservation.status));
    });

    const selectedDateReservations = computed(() => {
      if (!selectedDate.value) return [];
      return confirmedReservations.value.filter(reservation => {
        const reservedTime = new Date(reservation.matchingData.reservedTime);
        return reservedTime.toDateString() === selectedDate.value.toDateString();
      });
    });

    const changeTab = (tab) => {
      activeTab.value = tab;
      selectedDate.value = null; // Reset selected date when tab changes
    };

    const onDateSelected = (date) => {
      selectedDate.value = date;
    };

    const formatDate = (datetime) => {
      const date = new Date(datetime);
      return `${date.getMonth() + 1}. ${date.getDate()}. ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')} 예약`;
    };

    const confirmSchedule = (reservation) => {
      alert('일정을 확정하시겠습니까?');
      // Implement schedule confirmation logic here
    };

    return {
      activeTab,
      pendingReservations,
      confirmedReservations,
      selectedDate,
      selectedDateReservations,
      changeTab,
      onDateSelected,
      formatDate,
      confirmSchedule
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
}
.nav-tabs .nav-link {
  color: #ccc;
}
.nav-tabs .nav-link.active {
  color: white;
  background-color: #333;
  border-color: #333;
}
</style>
