<template>
  <div class="calendar-container">
    <div class="calendar-header d-flex justify-content-center align-items-center">
      <button class="btn btn-sm btn-outline-light arrow-btn" @click="prevMonth">&lt;</button>
      <span class="month-year mx-3">{{ currentYear }} {{ currentMonthName }}</span>
      <button class="btn btn-sm btn-outline-light arrow-btn" @click="nextMonth">&gt;</button>
    </div>
    <div class="calendar-body">
      <div class="calendar-grid">
        <div class="day-name" v-for="day in dayNames" :key="day">{{ day }}</div>
        <div
          class="calendar-cell"
          v-for="(day, index) in paddedDays"
          :key="index"
          :class="{ 
            'selected-day': isSelected(day), 
            'other-month': day.getMonth() !== currentMonth,
            'this-month': day.getMonth() === currentMonth
          }"
          @click="selectDate(day)"
        >
          {{ day.getDate() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  name: 'Calendar',
  emits: ['date-selected'],
  setup(props, { emit }) {
    const selectedDate = ref(new Date());
    const currentDate = ref(new Date());

    const currentMonth = computed(() => currentDate.value.getMonth());
    const currentYear = computed(() => currentDate.value.getFullYear());

    const currentMonthName = computed(() => {
      const date = new Date(currentYear.value, currentMonth.value);
      return date.toLocaleString('default', { month: 'long' });
    });

    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

    const daysInMonth = computed(() => {
      const year = currentYear.value;
      const month = currentMonth.value;
      return new Date(year, month + 1, 0).getDate();
    });

    const firstDayOfMonth = computed(() => {
      return new Date(currentYear.value, currentMonth.value, 1).getDay();
    });

    const paddedDays = computed(() => {
      const days = [];
      const daysInPrevMonth = new Date(currentYear.value, currentMonth.value, 0).getDate();

      // Add previous month's trailing days
      for (let i = firstDayOfMonth.value - 1; i >= 0; i--) {
        days.push(new Date(currentYear.value, currentMonth.value - 1, daysInPrevMonth - i));
      }

      // Add current month's days
      for (let i = 1; i <= daysInMonth.value; i++) {
        days.push(new Date(currentYear.value, currentMonth.value, i));
      }

      // Add next month's leading days
      const remainingDays = 42 - days.length;
      for (let i = 1; i <= remainingDays; i++) {
        days.push(new Date(currentYear.value, currentMonth.value + 1, i));
      }

      return days;
    });

    const prevMonth = () => {
      currentDate.value.setMonth(currentMonth.value - 1);
      currentDate.value = new Date(currentDate.value);
    };

    const nextMonth = () => {
      currentDate.value.setMonth(currentMonth.value + 1);
      currentDate.value = new Date(currentDate.value);
    };

    const selectDate = (date) => {
      selectedDate.value = date;
      emit('date-selected', date);
    };

    const isSelected = (date) => {
      return selectedDate.value && date.getTime() === selectedDate.value.getTime();
    };

    onMounted(() => {
      const today = new Date();
      selectDate(today);
    });

    return {
      currentMonthName,
      currentYear,
      dayNames,
      paddedDays,
      prevMonth,
      nextMonth,
      selectDate,
      isSelected
    };
  }
};
</script>

<style scoped>
.calendar-container {
  background-color: #212121;
  padding: 20px;
  border-radius: 5px;
  color: white;
  max-width: 400px;
  margin: 0 auto;
}
.calendar-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
.month-year {
  font-size: 1.25rem;
  margin: 0 10px;
}
.arrow-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  margin: 0;
}
.calendar-body {
  display: flex;
  flex-direction: column;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}
.day-name {
  font-weight: bold;
  text-align: center;
  padding: 5px;
}
.calendar-cell {
  text-align: center;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}
.calendar-cell:hover {
  background-color: #444;
}
.selected-day {
  background-color: #42b983;
  color: white;
}
.other-month {
  color: #777;
}
.this-month {
  color: white;
}
</style>
