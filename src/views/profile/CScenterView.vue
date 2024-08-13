<template>
  <div class="inquiry-page">
    <section class="notice">
      <h2 style="font-weight: bold">
        1:1 문의사항 서비스에 대해 알려드릴게요!
      </h2>
      <p>
        서비스를 이용하시면서 문의하고 싶은 내용들에 대해 자유롭게
        문의해주세요!<br />
        서비스 사용하면서 느꼈던 불편사항이나 건의사항 혹은 도중 발생한 에러상황
        등 문의를 하고 싶은 부분에 대해 남겨주세요.<br />
        최대한 빠른 시간 내로 답변 드리겠습니다!
      </p>
    </section>

    <!-- 1. 나의 문의 내역 -->
    <!-- <section class="inquiry-list">
      <h3 style="font-weight: bold;">나의 문의내역</h3>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>문의 제목</th>
            <th>문의 날짜</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="inquiries.length === 0">
            <td colspan="5">문의 내역이 없습니다.</td>
          </tr>
          <tr v-else v-for="(inquiry, index) in inquiries" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ inquiry.title }}</td>
            <td>{{ inquiry.date }}</td>
            <td>{{ inquiry.status }}</td>
          </tr>
        </tbody>
      </table>
    </section> -->

    <!-- 2. 문의하기 버튼 or 문의창 닫기 -->
    <div class="button-wrapper">
      <button @click="showForm = !showForm">
        {{ showForm ? "문의창 닫기" : "문의하기" }}
      </button>
    </div>

    <!-- 3. 문의하기 작성 폼 -->
    <!-- <section v-if="showForm" class="inquiry-form">
      <h3 style="font-weight: bold;">문의하기</h3>
      <form @submit.prevent="submitInquiry">
        <div class="form-group">
          <label for="title">제목</label>
          <input type="text" v-model="newInquiry.title" id="title" required placeholder="제목을 입력하세요..." />
        </div>
        <div class="form-group">
          <label for="content">문의 내용</label>
          <textarea v-model="newInquiry.content" id="content" required placeholder="글을 입력하세요..."></textarea>
        </div>
        <div class="form-group">
          <label for="image">이미지 첨부</label>
          <input type="file" @change="handleFileUpload" id="image" multiple />
        </div>
        <button type="submit">올리기</button>
      </form>
    </section> -->
  </div>
</template>

<script>
import { useCsCenterStore } from "@/stores/csCenter";
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "CScenterView",
  setup() {
    const csCenterStore = useCsCenterStore();
    const router = useRouter();
    const csList = computed(() => csCenterStore.csList);

    return {
      csCenterStore,
    };
  },
};

// export default {
//   data() {
//     return {
//       showForm: false,
//       inquiries: [], // 사용자의 문의 내역을 저장
//       newInquiry: {
//         type: '',
//         title: '',
//         content: '',
//         images: []
//       }
//     };
//   },
//   methods: {
//     async fetchInquiries() {
//       try {
//         const response = await axios.get('/api/inquiries');
//         this.inquiries = response.data;
//       } catch (error) {
//         console.error('문의 내역을 불러오는데 실패했습니다.', error);
//       }
//     },
//     async submitInquiry() {
//       try {
//         const formData = new FormData();
//         formData.append('type', this.newInquiry.type);
//         formData.append('title', this.newInquiry.title);
//         formData.append('content', this.newInquiry.content);
//         this.newInquiry.images.forEach((file, index) => {
//           formData.append(`images[${index}]`, file);
//         });

//         const response = await axios.post('/api/inquiries', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         });

//         // 서버로부터 받은 새로운 문의 내역을 목록에 추가
//         this.inquiries.push(response.data);

//         // 폼 초기화
//         this.newInquiry = {
//           type: '',
//           title: '',
//           content: '',
//           images: []
//         };
//         this.showForm = false;
//       } catch (error) {
//         console.error('문의사항을 제출하는데 실패했습니다.', error);
//       }
//     },
//     handleFileUpload(event) {
//       // 파일 업로드 처리 로직
//       this.newInquiry.images = Array.from(event.target.files);
//     }
//   },
//   created() {
//     this.fetchInquiries(); // 페이지 로드 시 문의 내역을 가져옴
//   }
// };
</script>

<style scoped>
.inquiry-page {
  padding: 20px;
  background-color: #1c1c1e;
  color: #f5f5f7;
  font-family: "Roboto", sans-serif;
}

.notice {
  background-color: #2c2c2e;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
}

.notice h2 {
  color: #ffffff;
  font-size: 1.5em;
  margin-bottom: 10px;
}

.notice p {
  line-height: 1.6;
  color: #d1d1d6;
}

.inquiry-list h3 {
  margin-bottom: 10px;
  font-size: 1.3em;
  color: #ffffff;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #2c2c2e;
  border-radius: 10px;
  overflow: hidden;
}

table th,
table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #3a3a3c;
}

table th {
  background-color: #3a3a3c;
  color: #f5f5f7;
}

table td {
  color: #d1d1d6;
}

.button-wrapper {
  text-align: right;
  margin: 20px 0;
}

button {
  background-color: #464645;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #5c5c5b;
}

.inquiry-form {
  background-color: #2c2c2e;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

.inquiry-form h3 {
  margin-bottom: 15px;
  font-size: 1.3em;
  color: #ffffff;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #f5f5f7;
}

.form-group input[type="text"],
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #3a3a3c;
  background-color: #1c1c1e;
  color: #f5f5f7;
  border-radius: 5px;
}

.form-group input[type="file"] {
  padding: 5px;
  background-color: #3a3a3c;
  color: #f5f5f7;
  border-radius: 5px;
}

textarea {
  resize: vertical;
}

button[type="submit"] {
  width: 100%;
  padding: 10px;
  background-color: #5c5b5b;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="submit"]:hover {
  background-color: #5c5b5b;
}
</style>
