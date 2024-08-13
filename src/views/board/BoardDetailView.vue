<template>
  <div>
    <div class="board-header">
      <p>자유롭게 사용자들과 소통하세요!</p>
      <p>
        컴퓨터 카톡, 전자레인지 수리 전적, 컴퓨터 정보, 그리고 잡담까지
        PShelter의 자유게시판에서 마음껏 소통하고 여러 정보 얻어가세요. 여러분의
        적극적인 소통을 기대합니다!
      </p>
    </div>

    <div class="container mt-4">
      <button @click="editPost">게시글 수정하기</button>
      <div class="card card-expanded">
        <!--1. 게시글 내용 영역 -->
        <div class="card-body">
          <div
            class="post-header d-flex justify-content-between align-items-center mb-3 text-white"
          >
            <div class="post-date">{{ postDetail.postCreatedDate }}</div>
            <h5 class="post-title m-0">
              {{ postDetail.postTitle }} - "{{
                postType[postDetail.postTypeId]
              }}" 관련 게시글
            </h5>
            <button
              class="btn btn-danger mx-2"
              @click="showReportModal('postDetail', postDetail.postId)"
            >
              게시글 신고하기
            </button>
          </div>
          <p class="card-text" v-if="postDetail">
            {{ postDetail.postContent }}
          </p>
          <img
            v-if="postDetail.postImageFile"
            :src="postDetail.postImageFile"
            alt="Post Image"
            class="img-fluid mt-5"
            style="
              width: 50%;
              max-width: 100%;
              height: auto;
              display: block;
              margin-left: auto;
              margin-right: auto;
            "
          />
        </div>
      </div>

      <!-- 2. 댓글 영역 -->
      <!-- 2-1. 댓글 리스트 -->
      <div class="comments mt-4">
        <h5>댓글 ({{ postDetail.comments.length }})</h5>
        <ul class="list-group">
          <li
            class="list-group-item"
            v-for="comment in postDetail.comments"
            :key="comment.commentId"
          >
            <p>
              <strong>{{ comment.commentAuthorId }}</strong> ({{
                comment.commentCreatedDate
              }})
            </p>

            <input
              v-if="comment.editing"
              v-model="comment.commentContent"
              @keyup.enter="
                showModifyModal(comment.commentContent, comment.commentId)
              "
              class="form-control form-control-sm me-2"
            />
            <p v-else>{{ comment.commentContent }}</p>

            <div v-if="comment.isWriter">
              <button
                class="btn btn-secondary btn-sm"
                @click="modifyComment(comment)"
              >
                수정
              </button>
              <button
                class="btn btn-danger btn-sm"
                @click="showDeleteModal(comment.commentId)"
              >
                삭제
              </button>
            </div>
            <div v-else>
              <button
                class="btn btn-danger btn-sm"
                @click="showReportModal('comment', comment.commentId)"
              >
                신고
              </button>
            </div>
          </li>
        </ul>

        <!-- 2-2. 댓글 입력 -->
        <div class="input-group mt-3">
          <input
            type="text"
            class="form-control"
            v-model="newCommentContent"
            placeholder="댓글을 입력하세요 !"
          />
          <button class="btn btn-primary" @click="submitComment">
            댓글 달기
          </button>
        </div>
      </div>

      <!-- 3. 목록으로 돌아가기  영역 -->
      <button class="btn btn-secondary mt-4" @click="goBack">
        전체 게시글 보기
      </button>
    </div>
  </div>

  <!-- 4. 신고 모달 관련 코드 -->
  <div
    class="modal fade"
    id="reportModal"
    tabindex="-1"
    aria-labelledby="reportModalLabel"
    aria-hidden="true"
    ref="reportModal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reportModalLabel">신고하기</h5>
          <button
            type="button"
            class="btn-close"
            @click="closeReportModal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p style="color: black">정말 신고하시겠습니까? 진짜로?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="confirmReport">
            확인
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="closeReportModal"
          >
            취소
          </button>
        </div>
      </div>
    </div>
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

  <!-- 삭제 모달 -->
  <div
    class="modal fade"
    id="deleteModal"
    tabindex="-1"
    aria-labelledby="deleteModalLabel"
    aria-hidden="true"
    ref="deleteModal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteModalLabel">삭제하기</h5>
          <button
            type="button"
            class="btn-close"
            @click="closeDeleteModal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p style="color: black">댓글을 삭제하시겠습니까?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="confirmDelete">
            확인
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="closeDeleteModal"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useBoardStore } from "@/stores/board";
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "BoardDetailView",
  setup() {
    const boardStore = useBoardStore();
    const router = useRouter();
    const postDetail = computed(() => boardStore.postDetail);
    const newCommentContent = ref("");
    const API_URL = "/api/v1";

    const reportModal = ref(null);
    const modifyModal = ref(null);
    const deleteModal = ref(null);

    const reportTarget = ref({ type: "", id: "" });
    const beforeModifyTarget = ref("");
    const modifyTarget = ref({ content: "", id: "" });
    const deleteTarget = ref("");

    // 게시글 유형
    const postType = {
      PT01: "잡담",
      PT02: "견적",
      PT03: "질문",
      PT04: "정보",
    };

    // 댓글 변수 생성
    const commentContent = ref("");

    onMounted(async () => {
      // boardStore.postDetail(); // postDetail data 업데이트 하기 !
    });

    // 게시글 수정 페이지로 이동
    const editPost = () => {
      // postDetail의 값을 확인
      console.log("postDetail:", postDetail.value);

      // params로 전달할 데이터를 확인
      console.log("params:", {
        postId: postDetail.value.postId,
        postData: JSON.stringify(postDetail.value),
      });

      if (!postDetail.value) {
        console.error("postDetail is undefined or not loaded");
        return;
      }

      router.push({
        name: "boardCreate",
        query: {
          mode: "edit",
          postId: postDetail.value.postId,
          postData: JSON.stringify(postDetail.value),
        },
      });
    };

    const submitComment = async function () {
      // 1. 서버로 날아감
      axios({
        method: "post",
        url: `${API_URL}/postdetail/create`,
        data: { commentContent: commentContent.value },
      });

      // 2. 데이터 불러오기
      try {
        newCommentContent.value = "";
        console.log("댓글 추가 성공");
        boardStore.postDetail(); // 전체 detail 정보
      } catch (error) {
        console.error("댓글 추가 실패:", error);
        console.log(postDetail.value.comments);
        postDetail.value.comments.push(commentContent.value);
      }
      commentContent.value = "";
    };

    // 게시글/댓글 신고 - 확인

    const modifyComment = (comment) => {
      if (comment.editing) {
        comment.commentContent = beforeModifyTarget.value;
      } else {
        beforeModifyTarget.value = comment.commentContent;
      }
      comment.editing = !comment.editing;
    };

    // 모달 띄우기

    const showReportModal = (type, id) => {
      reportTarget.value = { type, id };
      const modal = new bootstrap.Modal(reportModal.value);
      modal.show();
    };

    const showModifyModal = (commentContent, commentId) => {
      modifyTarget.value = { commentContent, commentId };
      const modal = new bootstrap.Modal(modifyModal.value);
      modal.show();
    };

    const showDeleteModal = (commentId) => {
      deleteTarget.value = commentId;
      const modal = new bootstrap.Modal(deleteModal.value);
      modal.show();
    };

    // 작업 내용 서버로 전송

    const confirmReport = async () => {
      if (reportTarget.value.type === "postDetail") {
        console.log(reportTarget);
        await boardStore.reportPost(reportTarget.value.id);
      } else if (reportTarget.value.type === "comment") {
        console.log(reportTarget);
        await boardStore.reportComment(reportTarget.value.id);
      }
      closeReportModal();
    };

    const confirmModify = async () => {
      console.log(modifyTarget);
      await boardStore.modifyComment(
        modifyTarget.value.id,
        modifyTarget.value.content
      );

      closeModifyModal();
    };

    const confirmDelete = async () => {
      console.log(deleteTarget);
      await boardStore.deleteComment(deleteTarget.value);

      closeDeleteModal();
    };

    // 모달 닫기

    const closeReportModal = () => {
      const modal = bootstrap.Modal.getInstance(reportModal.value);
      modal.hide();
    };

    const closeModifyModal = () => {
      const modal = bootstrap.Modal.getInstance(modifyModal.value);
      modal.hide();
    };

    const closeDeleteModal = () => {
      const modal = bootstrap.Modal.getInstance(deleteModal.value);
      modal.hide();
    };

    // 게시글로 돌아가기

    const goBack = () => {
      router.push({ name: "community" });
    };

    return {
      submitComment,
      postType,
      postDetail,
      newCommentContent,
      editPost,

      modifyComment,

      reportModal,
      modifyModal,
      deleteModal,

      confirmReport,
      confirmModify,
      confirmDelete,

      showReportModal,
      showModifyModal,
      showDeleteModal,

      closeReportModal,
      closeModifyModal,
      closeDeleteModal,

      goBack,
    };
  },
};
</script>

<style scoped>
.banner {
  background-color: #333 !important;
  color: #fff;
  padding: 20px;
  text-align: center;
}

.card {
  margin-top: 20px;
  width: 100%;
  color: #fff;
}

.card-expanded {
  height: 500px;
}

.comments {
  margin-top: 20px;
}

.board-header {
  background-color: #333;
  color: white;
  padding: 20px;
  margin-bottom: 20px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.post-stats {
  font-size: 0.9rem;
}

.text-white {
  color: white;
}

.card-footer {
  background-color: transparent;
  border-top: none;
}

.like-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.list-group-item {
  background-color: #333;
  color: white;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}

.modal-title {
  color: black;
}
</style>
