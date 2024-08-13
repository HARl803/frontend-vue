<template>
  <div class="container mt-4 text-white">
    <h4>일정을 언제로 할까요?</h4>
    <p>제안하는 3개 일정 중 파트너가 1개를 선택하여 확정합니다.</p>

    <!-- 1. 캘린더 영역 -->
    <VDatePicker v-model="date" />
    {{ date.date }}

    <!-- 3. 이미지 첨부 영역 -->
    <div class="row mt-4">
      <div class="col-md-12">
        <div class="form-group">
          <h5>이미지 첨부</h5>
          <input type="file" class="form-control" @change="onFileChange" />
        </div>
      </div>
    </div>

    <!-- 4. 증상 입력 영역 -->
    <div class="form-group mt-4">
      <h5>증상을 입력해 주세요</h5>
      <textarea class="form-control" rows="5" v-model="symptom"></textarea>
    </div>
    <div class="d-flex justify-content-end mt-3">
      <button
        class="btn btn-primary btn-lg"
        @click="openModal"
        :disabled="!isFormValid"
      >
        상담 신청
      </button>
    </div>

    <!-- 5. 모달 영역 -->
    <div
      class="modal fade"
      id="reservationModal"
      tabindex="-1"
      aria-labelledby="reservationModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header">
            <h5 class="modal-title" id="reservationModalLabel">알림</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>{{ modalMessage }}</p>
          </div>
          <div class="modal-footer">
            <button
              v-if="modalType === 'confirmation'"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              취소
            </button>
            <button
              v-if="modalType === 'confirmation'"
              type="button"
              class="btn btn-primary"
              @click="confirmSubmission"
            >
              상담 신청
            </button>
            <button
              v-else
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// 멘토가 가능한 시간대 불러오기 --> mentorDetail/times
import { useMentorStore } from "@/stores/mentor";

export default {
  name: "ReserveView",
  setup() {
    const router = useRouter();

    // 멘토가 가능한 시간대 호출
    const mentorStore = useMentorStore();
    const timePossible = computed(() => mentorStore.mentorDetail);

    onMounted(() => {
      const today = new Date();
    });

    return {
      // 멘토가 가능한 시간대
      mentorStore,
      timePossible,
    };
  },
};
</script>

<style scoped>
.container {
  background-color: #1c1c1e;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #e0e0e0;
}

.btn-outline-primary {
  color: #ffffff;
  border-color: #ffffff;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-outline-primary:hover {
  background-color: #595a5a;
  color: #1c1c1e;
}

.btn-outline-primary.active,
.btn-outline-primary.active:hover {
  background-color: #42b983;
  border-color: #42b983;
  color: #1c1c1e;
}

.btn-success {
  background-color: #4caf50;
  border-color: #4caf50;
  color: white;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.btn-success:hover {
  background-color: #45a049;
  border-color: #419645;
}

.btn-primary {
  background-color: #2563eb;
  border-color: #2563eb;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #1d4ed8;
  border-color: #1c4ed0;
}

.modal-content {
  background-color: #2c2c2e;
  color: #f0f0f0;
  border-radius: 8px;
  border: none;
}

.btn-close-white {
  filter: invert(1);
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.btn-close-white:hover {
  opacity: 1;
}

.form-control {
  background-color: #2c2c2e;
  color: #f0f0f0;
  border: 1px solid #3a3a3c;
  border-radius: 6px;
  padding: 12px;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: #ffffff;
  box-shadow: none;
}

input[type="file"] {
  background-color: #2c2c2e;
  color: #f0f0f0;
  border: 1px solid #3a3a3c;
  border-radius: 6px;
  padding: 12px;
  transition: border-color 0.3s ease;
}

input[type="file"]:focus {
  border-color: #42b983;
  box-shadow: none;
}

h4,
h5 {
  color: #f0f0f0;
  font-weight: 600;
}

p {
  color: #c0c0c0;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
