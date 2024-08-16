<template>
  <div class="container mt-4 text-white">
    <h4>일정을 언제로 할까요?</h4>
    <p>제안하는 3개 일정 중 파트너가 1개를 선택하여 확정합니다.</p>
    <div class="row">
      <div class="col-md-5">
        <Calendar @date-selected="onDateSelected" />
      </div>
      <div class="col-md-7 d-flex flex-column justify-content-between">
        <div>
          <h5>일정 선택</h5>
          <div class="row mb-4">
            <div
              class="col-4"
              v-for="(option, index) in proposedOptions"
              :key="index"
            >
              <button
                class="btn btn-outline-primary w-100 mb-2"
                :class="{ active: selectedOptionIndex === index }"
                @click="selectProposedOption(index)"
              >
                {{ getOptionText(option) }}
              </button>
            </div>
          </div>
          <div v-if="selectedDate">
            <h5>{{ formattedDate }}</h5>
            <div class="row">
              <div
                class="col-4"
                v-for="(slot, index) in firstThirdSlots"
                :key="index"
              >
                <button
                  class="btn btn-outline-primary w-100 mb-2"
                  :class="{ active: selectedTimeSlot === slot }"
                  @click="selectTimeSlot(slot)"
                >
                  {{ slot }}
                </button>
              </div>
              <div
                class="col-4"
                v-for="(slot, index) in secondThirdSlots"
                :key="index"
              >
                <button
                  class="btn btn-outline-primary w-100 mb-2"
                  :class="{ active: selectedTimeSlot === slot }"
                  @click="selectTimeSlot(slot)"
                >
                  {{ slot }}
                </button>
              </div>
              <div
                class="col-4"
                v-for="(slot, index) in thirdThirdSlots"
                :key="index"
              >
                <button
                  class="btn btn-outline-primary w-100 mb-2"
                  :class="{ active: selectedTimeSlot === slot }"
                  @click="selectTimeSlot(slot)"
                >
                  {{ slot }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div v-if="errorMessage" class="text-danger mt-2 text-center">
            {{ errorMessage }}
          </div>
          <button class="btn btn-success w-100 mt-2" @click="saveSelectedTime">
            저장
          </button>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-6">
        <div class="form-group">
          <h5>내 PC 목록</h5>
          <select class="form-select" v-model="selectedPc">
            <option v-for="pc in pcs" :key="pc.id" :value="pc.id">
              {{ pc.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <h5>이미지 첨부</h5>
          <input type="file" class="form-control" @change="onFileChange" />
        </div>
      </div>
    </div>
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

    <!-- Modal -->
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
import Calendar from "@/components/Calendar.vue";
import availability from "@/assets/time.json";

export default {
  name: "ReserveView",
  components: {
    Calendar,
  },
  setup() {
    const router = useRouter();
    const selectedDate = ref(new Date());
    const selectedPc = ref("");
    const symptom = ref("");
    const timeSlots = ref([]);
    const selectedTimeSlot = ref("");
    const selectedOptionIndex = ref(null);
    const errorMessage = ref("");
    const modalMessage = ref("");
    const modalType = ref("");
    const pcs = ref([
      { id: 1, name: "PC 1" },
      { id: 2, name: "PC 2" },
      { id: 3, name: "PC 3" },
    ]);
    const proposedOptions = ref([
      { date: null, time: null },
      { date: null, time: null },
      { date: null, time: null },
    ]);

    const isFormValid = computed(() => {
      return (
        proposedOptions.value.some((option) => option.date && option.time) &&
        symptom.value.trim() !== ""
      );
    });

    const formattedDate = computed(() => {
      return selectedDate.value
        ? new Date(selectedDate.value).toLocaleDateString()
        : "";
    });

    const firstThirdSlots = computed(() => {
      const size = Math.ceil(timeSlots.value.length / 3);
      return timeSlots.value.slice(0, size);
    });

    const secondThirdSlots = computed(() => {
      const size = Math.ceil(timeSlots.value.length / 3);
      return timeSlots.value.slice(size, size * 2);
    });

    const thirdThirdSlots = computed(() => {
      const size = Math.ceil(timeSlots.value.length / 3);
      return timeSlots.value.slice(size * 2);
    });

    const onDateSelected = (date) => {
      selectedDate.value = date;
      const formattedDateKey = date.toISOString().split("T")[0];
      timeSlots.value = availability.availability[formattedDateKey] || [];
      selectedTimeSlot.value = ""; // Reset selected time slot when date changes
      errorMessage.value = ""; // Reset error message
    };

    const selectTimeSlot = (slot) => {
      selectedTimeSlot.value = slot;
    };

    const selectProposedOption = (index) => {
      selectedOptionIndex.value = index;
      errorMessage.value = ""; // Reset error message
    };

    const saveSelectedTime = () => {
      if (selectedOptionIndex.value === null) {
        errorMessage.value = "일정을 선택해주세요";
      } else if (!selectedTimeSlot.value) {
        errorMessage.value = "시간을 선택해주세요";
      } else {
        const existingOption = proposedOptions.value.find(
          (option) =>
            option.date === selectedDate.value &&
            option.time === selectedTimeSlot.value
        );
        if (existingOption) {
          errorMessage.value = "이미 선택된 시간입니다.";
        } else {
          proposedOptions.value[selectedOptionIndex.value] = {
            date: selectedDate.value,
            time: selectedTimeSlot.value,
          };
          errorMessage.value = ""; // Clear error message on successful save
        }
      }
    };

    const getOptionText = (option) => {
      if (!option.date || !option.time) {
        return "일정이 없습니다.";
      }
      const date = new Date(option.date);
      return `${date.getFullYear()}년 ${
        date.getMonth() + 1
      }월 ${date.getDate()}일 ${option.time}`;
    };

    const onFileChange = (event) => {
      const file = event.target.files[0];
      console.log("Selected file:", file);
    };

    const openModal = () => {
      if (!proposedOptions.value.some((option) => option.date && option.time)) {
        modalMessage.value = "일정을 선택해주세요";
        modalType.value = "alert";
      } else if (!symptom.value.trim()) {
        modalMessage.value = "증상을 입력해주세요";
        modalType.value = "alert";
      } else if (
        proposedOptions.value.filter((option) => option.date && option.time)
          .length < 3
      ) {
        modalMessage.value =
          "일정을 모두 선택하지 않았습니다. 계속하시겠습니까?";
        modalType.value = "confirmation";
      } else if (!selectedPc.value) {
        modalMessage.value = "PC를 선택하지 않았습니다. 계속하시겠습니까?";
        modalType.value = "confirmation";
      } else {
        modalMessage.value = "상담 신청을 보내시겠습니까?";
        modalType.value = "confirmation";
      }
      const modal = new bootstrap.Modal(
        document.getElementById("reservationModal")
      );
      modal.show();
    };

    const confirmSubmission = () => {
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("reservationModal")
      );
      modal.hide();
      setTimeout(() => {
        router.push({ name: "reservations" });
      }, 300); // Delay for modal transition
    };

    onMounted(() => {
      const today = new Date();
      onDateSelected(today);
    });

    return {
      selectedDate,
      selectedPc,
      symptom,
      pcs,
      proposedOptions,
      formattedDate,
      timeSlots,
      firstThirdSlots,
      secondThirdSlots,
      thirdThirdSlots,
      selectedTimeSlot,
      selectedOptionIndex,
      errorMessage,
      modalMessage,
      modalType,
      isFormValid,
      onDateSelected,
      selectProposedOption,
      selectTimeSlot,
      saveSelectedTime,
      getOptionText,
      onFileChange,
      openModal,
      confirmSubmission,
    };
  },
};
</script>

<style scoped>
.container {
  background-color: #212121;
  padding: 20px;
  border-radius: 5px;
  color: white;
}
.btn-outline-primary {
  color: white;
  border-color: #42b983;
}
.btn-outline-primary:hover {
  background-color: #42b983;
  border-color: #42b983;
}
.btn-outline-primary.active,
.btn-outline-primary.active:hover {
  background-color: #42b983;
  border-color: #42b983;
}
.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}
.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}
.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}
.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}
.modal-content {
  background-color: #333;
  color: white;
}
.btn-close-white {
  filter: invert(1);
}
</style>
