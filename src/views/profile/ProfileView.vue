<template>
  <div class="container mt-4">
    <div class="profile-header">
      <h5>회원정보</h5>
      <p>회원님의 정보를 확인하고 수정할 수 있습니다.</p>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <div class="profile-image text-center">
        <img src="https://via.placeholder.com/150" class="img-fluid rounded-circle" alt="프로필 이미지">
        <button class="btn btn-primary btn-sm mt-2">프로필 추가</button>
      </div>
      <div class="profile-info text-center">
        <h5 class="card-title">강김박오윤황</h5>
        <p class="card-text">컴덕후 입니다. 질문 환영 ✏️</p>
      </div>
      <div class="profile-level text-center">
        <h6>Lv. 1</h6>
        <div class="progress" style="height: 20px;">
          <div class="progress-bar" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
    </div>
    <div v-if="!showMentorForm" class="mentor-signup mt-4 text-center">
      <h5>멘토로 가입하시겠습니까?</h5>
      <p>멘토가 되어 다른 사람에게 도움을 주고 부수입을 얻어가세요</p>
      <button class="btn btn-dark" @click="toggleMentorForm">가입하기</button>
    </div>
    <div v-if="showMentorForm" class="mentor-form mt-4">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>멘토링 가능한 시간을 입력해주세요</label>
            <div v-for="(time, index) in mentoringTimes" :key="index" class="input-group mb-3">
              <select v-model="time.day" class="form-select">
                <option value="월">월</option>
                <option value="화">화</option>
                <option value="수">수</option>
                <option value="목">목</option>
                <option value="금">금</option>
                <option value="토">토</option>
                <option value="일">일</option>
              </select>
              <input v-model="time.start" type="time" class="form-control">
              <span class="input-group-text">부터</span>
              <input v-model="time.end" type="time" class="form-control">
              <span class="input-group-text">까지</span>
              <button class="btn btn-danger" @click="removeMentoringTime(index)">삭제</button>
            </div>
            <button class="btn btn-secondary" @click="addMentoringTime">+</button>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>자신 있는 기술 5가지를 선택해주세요</label>
            <div class="btn-group-toggle" role="group">
              <button
                v-for="skill in skills"
                :key="skill"
                type="button"
                class="btn"
                :class="{'btn-outline-secondary': !selectedSkills.includes(skill), 'btn-secondary': selectedSkills.includes(skill)}"
                @click="toggleSkill(skill)"
                :disabled="!selectedSkills.includes(skill) && selectedSkills.length >= 5"
              >
                {{ skill }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group mt-3">
        <label>멘토를 희망할 수 있도록 소개글을 작성해주세요</label>
        <textarea class="form-control" rows="3"></textarea>
      </div>
      <div class="form-group mt-3">
        <label>멘티에게 질문 받을 수 있도록 자신있는 질문을 작성해주세요</label>
        <textarea class="form-control" rows="3"></textarea>
      </div>
      <button class="btn btn-primary mt-3">저장</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  data() {
    return {
      showMentorForm: false,
      mentoringTimes: [
        { day: '월', start: '17:00', end: '20:00' },
        { day: '화', start: '18:00', end: '20:00' },
      ],
      skills: Array.from({ length: 30 }, (_, i) => `기술${i + 1}`),
      selectedSkills: [],
    };
  },
  methods: {
    toggleMentorForm() {
      this.showMentorForm = true;
    },
    addMentoringTime() {
      this.mentoringTimes.push({ day: '월', start: '', end: '' });
    },
    removeMentoringTime(index) {
      this.mentoringTimes.splice(index, 1);
    },
    toggleSkill(skill) {
      const index = this.selectedSkills.indexOf(skill);
      if (index === -1) {
        if (this.selectedSkills.length < 5) {
          this.selectedSkills.push(skill);
        }
      } else {
        this.selectedSkills.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
.profile-header {
  background-color: #343a40;
  color: white;
  padding: 20px;
  margin-bottom: 20px;
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
.mentor-signup {
  background-color: #212121;
  padding: 20px;
  margin-top: 40px;
  border-radius: 10px;
}
.mentor-signup h5 {
  color: #f39c12;
}
.mentor-form .input-group .form-select, 
.mentor-form .input-group .form-control {
  width: auto;
  flex: 1;
}
.mentor-form .input-group-text {
  width: auto;
}
.mentor-form .btn-danger {
  margin-left: 10px;
}
.btn-group-toggle .btn {
  margin-bottom: 5px;
  margin-right: 5px;
}
.btn-group-toggle .btn-secondary {
  background-color: #6c757d;
  color: white;
}
</style>
