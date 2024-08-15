<template>
  <div class="container mt-4">

    <!-- 1. 회원정보 광고 배너 -->
    <div class="profile-header">
      <h5>회원정보</h5>
      <p>회원님의 정보를 확인하고 수정할 수 있습니다.</p>
    </div>

    <!-- 2. 전체 사용자 기본 프로필 정보 -->
    <div class="d-flex justify-content-between align-items-center">
      <div class="profile-image text-center">
        <img :src="profileList.image" alt="부품 이미지" class="card-img-top" />
      </div>
      <div class="profile-info text-center">
        <h5 class="card-title">{{ profileList.nickname }}</h5>
        <div>

          <input
              v-if="profileList.editing"
              v-model="profileList.intro"
              @keyup.enter="
                showModifyModal(profileList.intro, profileList.profileId)
              "
              class="form-control form-control-sm me-2"
            />
          <p v-else>{{ profileList.intro }}</p>

          <button
            class="btn btn-secondary btn-sm"
            @click="modifyComment(profileList)"
          >
            수정
          </button>
        </div>
      </div>
    </div>

    <!-- 3. 멘토 가입 신청 영역 -->
    <div v-if="!showMentorForm" class="mentor-signup mt-4 text-center">
    
      <h5>멘토로 가입하시겠습니까?</h5>
      <p>멘토가 되어 다른 사람에게 도움을 주고 부수입을 얻어가세요</p>
      <button class="btn btn-dark" @click="toggleMentorForm">가입하기</button>
    </div>

    <!-- 4. 멘토 신청 폼 -->
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

              <!-- 시간 선택 -->
              <select v-model="time.start" class="form-select">
                <option v-for="option in timeOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>

              <span class="input-group-text">부터</span>

              <select v-model="time.end" class="form-select">
                <option v-for="option in timeOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>

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
        <textarea v-model="description" class="form-control" rows="3"></textarea>
      </div>
      <div class="form-group mt-3">
        <label>멘티에게 질문 받을 수 있도록 자신있는 질문을 작성해주세요</label>
        <textarea v-model="questions[0]" class="form-control" rows="3"></textarea>
        <textarea v-model="questions[1]" class="form-control" rows="3"></textarea>
        <textarea v-model="questions[2]" class="form-control" rows="3"></textarea>
      </div>
      <button class="btn btn-primary mt-3" @click="saveMentorData">저장</button>
    </div>

    <!-- 수정 모달 -->
    <div
      class="modal fade"
      id="modifyModal"
      tabindex="-1"
      aria-labelledby="modifyModalLabel"
      aria-hidden="true"
      ref="modifyModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modifyModalLabel">수정하기</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModifyModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p style="color: black">댓글을 수정하시겠습니까?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="confirmModify">
              확인
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="closeModifyModal"
            >
              취소
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useProfileStore } from '@/stores/profile';
import axios from "axios";

export default {
  name: 'ProfileView',
  setup() {
    const API_URL = "/api/v1";
    const profileStore = useProfileStore();
    const profileList = computed(() => profileStore.profileList);

    const beforeModifyTarget = ref("");
    const modifyTarget = ref({ intro: "", profileId: "" });

    const reportModal = ref(null);
    const modifyModal = ref(null);

    const mentoringTimes = ref([{ day: '월', start: '00:00', end: '23:30' }]);

    // 00:00부터 23:30까지 30분 간격으로 시간을 생성하는 함수
    const generateTimeOptions = () => {
      const options = [];
      for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const h = String(hour).padStart(2, '0');
          const m = String(minute).padStart(2, '0');
          options.push(`${h}:${m}`);
        }
      }
      return options;
    };

    const timeOptions = ref(generateTimeOptions());

    // 기술 태그 리스트
    const skills = [
      "컴퓨터 견적", "CPU 장착", "SSD/RAM 장착", "배선 작업", "수냉 쿨러",
      "케이스 선택", "전원 공급 장치 설치", "BIOS 설정", "드라이버 설치", "온도 관리",
      "업그레이드 팁", "모니터 연결", "전원 버튼 연결", "마더보드 선택", "고성능 게이밍 컴퓨터 조립",
      "소형 폼팩터 컴퓨터 조립", "사운드 카드 설치", "Wi-Fi 설정", "벤치마크 퍼포먼스 조정", "에러 코드 해결",
      "백업 및 복원", "NAS 관련 데이터 전송", "디스크 파티션 설정", "소음 감소 팁", "리눅스 설치 및 구성",
      "IOT 장치 연결", "데이터 복구",
    ];

    const selectedSkills = ref([]);
    const description = ref("");
    const questions = ref(["","",""]);

    const modifyComment = (profileList) => {
      if (profileList.editing) {
        profileList.intro = beforeModifyTarget.value;
      } else {
        beforeModifyTarget.value = profileList.intro;
      }
      profileList.editing = !profileList.editing;
    };

    const showModifyModal = (intro, profileId) => {
      modifyTarget.value = { intro };
      const modal = new bootstrap.Modal(modifyModal.value);
      modal.show();
    };

    const closeModifyModal = () => {
      const modal = bootstrap.Modal.getInstance(modifyModal.value);
      modal.hide();
    };

    const confirmModify = async () => {
      await profileStore.modifyComment(
        modifyTarget.value.id,
        modifyTarget.value.content
      );

      closeModifyModal();
    };

    const showMentorForm = ref(false);

    const toggleMentorForm = () => {
      showMentorForm.value = true;
    };

    const addMentoringTime = () => {
      mentoringTimes.value.push({ day: '월', start: '', end: '' });
    };

    const removeMentoringTime = (index) => {
      mentoringTimes.value.splice(index, 1);
    };

    const toggleSkill = (skill) => {
      const index = selectedSkills.value.indexOf(skill);
      if (index === -1) {
        if (selectedSkills.value.length < 5) {
          selectedSkills.value.push(skill);
        }
      } else {
        selectedSkills.value.splice(index, 1);
      }
    };

    const saveMentorData = async () => {
      const mentorData = {
        times: mentoringTimes.value,
        techs: selectedSkills.value,
        description: description.value,
        questions: questions.value,
      };

      console.log(mentorData)

      try {
        const response = await axios.post(`${API_URL}/profile/mento`, mentorData);
        console.log('저장 성공:', response.data);
        // 성공 시 추가 로직을 여기에 작성할 수 있습니다.
      } catch (error) {
        console.error('저장 실패:', error);
      }
    };

    
    return {
      profileList,
      modifyComment,
      showModifyModal,
      confirmModify,
      closeModifyModal,

      reportModal,
      modifyModal,
      
      showMentorForm,
      toggleMentorForm,

      mentoringTimes,
      description,
      questions,
      timeOptions,
      skills,
      selectedSkills,
      addMentoringTime,
      removeMentoringTime,
      toggleSkill,
      saveMentorData,
    };
  },
};
</script>

<style scoped>
/* 스타일은 그대로 유지됩니다 */
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
