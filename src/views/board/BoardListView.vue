<template>
  <div class="container mt-4">
    <!-- 1. 자유게시판 소개 영역 -->
    <div class="board-header">
      <h5 style="font-weight: bold">자유게시판</h5>
      <p>자유롭게 사용자들과 소통하세요!</p>
      <p>
        컴퓨터 카톡, 전자레인지 수리 전적, 컴퓨터 정보, 그리고 잡담까지
        PShelter의 자유게시판에서 마음껏 소통하고 여러 정보 얻어가세요. 여러분의
        적극적인 소통을 기대합니다!
      </p>
    </div>

    <!-- 2. 게시판 필터링 영역 -->
    <div class="btn-group mb-3" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary" @click="showMyPosts">
        내가 작성한 글
      </button>

      <button
        type="button"
        class="btn btn-secondary"
        @click="showMyCommentedPosts"
      >
        내가 댓글 단 글
      </button>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <button type="button" class="btn btn-primary" @click="showAllPosts">
        목록
      </button>

      <button type="button" class="btn btn-success" @click="goToCreate">
        글쓰기
      </button>
    </div>

    <div>
      <button type="button" @click="filterPosts('PT01')">잡담</button>
      <button type="button" @click="filterPosts('PT02')">견적</button>
      <button type="button" @click="filterPosts('PT03')">질문</button>
      <button type="button" @click="filterPosts('PT04')">정보</button>
    </div>

    <!-- 3. 자유게시판 목록 영역 -->
    <div>
      <table class="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">유형</th>
            <th scope="col">제목</th>
            <th scope="col">작성자</th>
            <th scope="col">작성시간</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in filteredPosts" :key="post">
            <td>{{ post.postNum }}</td>
            <td>{{ postType[post.postTypeId] }}</td>
            <td>
              {{ post.postId }}
              <router-link
                :to="{ name: 'boardDetail', params: { id: post.postId } }"
                >{{ post.postTitle }}</router-link
              >
            </td>
            <td>{{ post.postAuthorId }}</td>
            <td>{{ post.postCreatedDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 4. 페이지네이션 영역 -->
    <!-- <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav> -->

  </div>
</template>

<script>
import { useBoardStore } from "@/stores/board";
import { computed, onMounted, ref } from "vue";

export default {
  name: "BoardListView",
  setup() {
    const boardStore = useBoardStore();
    const posts = computed(() => boardStore.posts);
    const myPosts = computed(() => boardStore.myPosts);

    // 게시글 필터링
    const filterType = ref("all");

    // 게시글 유형
    const postType = {
      PT01: "잡담",
      PT02: "견적",
      PT03: "질문",
      PT04: "정보",
    };

    onMounted(() => {
      // boardStore.posts();
    });

    // 내가 작성한 댓글 단 글 필터링 함수
    const myCommentedPosts = computed(() => {
      return posts.value.filter((post) =>
        post.comments.some((comment) => comment.author === currentUser.value)
      );
    });

    // 내가 작성한 게시글만 보이기
    const showMyPosts = () => {
      filterType.value = "myPosts";
    };

    const showMyCommentedPosts = () => {
      filterType.value = "myCommentedPosts";
    };

    // 목록 -> 모든 게시글 볻이기
    const showAllPosts = () => {
      filterType.value = "all";
    };

    // 목록 -> 게시글 유형이 있다면
    const filterPosts = (typeId) => {
      filterType.value = typeId;
    };

    // 목록 -> 특정 게시글 보이기
    const filteredPosts = computed(() => {
      if (filterType.value === "all") {
        return posts.value;
      }
      return posts.value.filter((post) => post.postTypeId === filterType.value);
    });

    return {
      posts,
      myPosts,
      myCommentedPosts,
      postType,
      filterType,
      showMyPosts,
      showMyCommentedPosts,
      showAllPosts,
      filteredPosts,
      filterPosts,
      showAllPosts,
    };
  },
  methods: {
    goToCreate() {
      this.$router.push({ name: "boardCreate" });
    },
  },
};
</script>

<style scoped>
.board-header {
  background-color: #333;
  color: white;
  padding: 20px;
  margin-bottom: 20px;
}
</style>
