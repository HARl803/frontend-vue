<template>
  <div class="container mt-4">
    <!-- 1. 게시글 작성 소개 영역 -->
    <div class="board-header">
      <h5 style="font-weight: bold">{{ isEditMode ? '게시글 수정' : '게시글 작성' }}</h5>
      <p>
        컴퓨터 카톡, 전자레인지 수리 전적, 컴퓨터 정보, 그리고 잡담까지
        PShelter의 자유게시판에서 마음껏 소통하고 여러 정보 얻어가세요. 여러분의
        적극적인 소통을 기대합니다!
      </p>
    </div>

    <!-- 2. 게시글 작성 폼 영역 -->
    <!-- 2-1. 게시글 카테고리 선택 -->
    <div class="form-group mb-3">
      <label for="category">카테고리</label>
      <select id="postTypeId" class="form-control" v-model="postTypeId">
        <option value="PT01">잡담</option>
        <option value="PT02">견적</option>
        <option value="PT03">질문</option>
        <option value="PT04">정보</option>
      </select>
    </div>

    <!-- 2-2. 게시글 제목 영역 -->
    <div class="form-group mb-3">
      <label for="title">제목</label>
      <input
        type="text"
        id="title"
        class="form-control"
        v-model="postTitle"
        placeholder="제목을 입력하세요"
      />
    </div>

    <!-- 2-3. 게시글 내용 영역 -->
    <div class="form-group mb-3">
      <label for="content">내용</label>
      <textarea
        id="content"
        class="form-control"
        v-model="postContent"
        rows="10"
        placeholder="내용을 입력하세요"
      ></textarea>
    </div>

    <!-- 2-4. 게시글 이미지 첨부 영역 -->
    <div class="justify-space-between">
      <div class="form-group mb-3">
        <label for="image">이미지 첨부</label>
        <input
          type="file"
          id="postImageFile"
          class="form-control-file"
          @change="onFileChange"
        />

        <!-- 4. 용량 제한 두기 -->
        <span v-if="postImageFile.length === 0">0</span>
        <span v-else
          >{{ (postImageFile.size / 1024 / 1024).toFixed(2) }} MB</span
        >
        <span> / 10MB, 그 이상의 용량을 올릴 시 누락됩니다 ^^</span>
      </div>
    </div>

    <!-- 3. 취소, 작성 완료 영역 -->
    <div class="d-flex justify-content-end">
      <button class="btn btn-secondary mr-2" @click="cancel">취소</button>
      <button class="btn btn-primary" @click="savePost">{{ isEditMode ? '수정 완료' : '작성 완료' }}</button>
    </div>
  </div>
</template>

<script>
import { useBoardStore } from "@/stores/board";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "BoardCreateView",
  setup() {
    const boardStore = useBoardStore();
    const router = useRouter();
    const route = useRoute();
    const postDetail = ref(null);
    const API_URL = "/api/v1/community";
    const isEditMode = ref(false);

    // 게시글 유형
    const postType = ref("");
    const postTitle = ref("");
    const postContent = ref("");
    const postImageFile = ref("");
    const postTypeId = ref("");

    const onFileChange = (event) => {
      postImageFile.value = event.target.files[0];
    };

    onMounted(() => {

      console.log(route.query);
      
      // 수정 모드인지 확인
      if (route.query.mode === 'edit') {
        isEditMode.value = true;

        if (route.query.postData) {
          try {
            const postData = JSON.parse(route.query.postData);
            console.log(postData);
            postTitle.value = postData.postTitle;
            postContent.value = postData.postContent;
            postTypeId.value = postData.postTypeId;
          } catch (e) {
            console.error('Error parsing postData:', e);
          }
        } else {
          console.error('postData is undefined');
        }
        // const postData = JSON.parse(route.params.postData);

        // console.log(postData)
        // postTitle.value = postData.postTitle;
        // postContent.value = postData.postContent;
        // postTypeId.value = postData.postTypeId;
        // 이미지 파일은 수정하지 않으면 그대로 유지
      } 
    });

    // 게시글 저장 (생성 또는 수정)
    const savePost = async () => {
      const formData = new FormData();
      formData.append("postTypeId", postTypeId.value);
      formData.append("postTitle", postTitle.value);
      formData.append("postContent", postContent.value);

      console.log(postTypeId.value)
      console.log(postTitle.value)
      // console.log(formData.keys())

      if (postImageFile.value) {
        formData.append("file", postImageFile.value);
      }

      for (let key of formData.values()) {
        console.log(key)
      }

      // const data = {
      //   postTypeId:postTypeId.value,
      //   postTitle: postTitle.value,
      //   postCotent: postContent.value,
        
      // }

      // console.log(data)
      
      try {
        if (isEditMode.value) {
          // 게시글 수정
          
          console.log(formData)
        //   await axios.patch(`${API_URL}/post`, formData,
        //   {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //     },
        //   }
        // );
          console.log("게시글 수정 성공!");
        } else {

          console.log(formData)
          // 새 게시글 생성
          fetch(`${API_URL}/post`, {
            method: 'POST',
            cache: 'no-cache',
            body: formData
          })
        //   await axios.post(`${API_URL}/post`, formData
        //   , {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //     },
        //   }
        // );

        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });

          console.log("게시글 생성 성공!");
        }
        router.push({ name: "community" });
      } catch (error) {
        console.log(formData)
        console.error("게시글 저장 실패:", error);
      }
    };

    const cancel = () => {
      router.push({ name: "community" });
    };

    return {
      boardStore,
      postDetail,
      postType,
      savePost,
      cancel,
      postTitle,
      postContent,
      postImageFile,
      postTypeId,
      onFileChange,
      isEditMode,
    };
  },
};
</script>

<style scoped>
.board-header {
  background-color: #343a40;
  color: white;
  padding: 20px;
  margin-bottom: 20px;
}

.justify-space-between {
  justify-content: space-between;
}
</style>