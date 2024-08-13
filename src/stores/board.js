import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import axios from "axios";

export const useBoardStore = defineStore("boardStore", () => {
  const router = useRouter();
  const API_URL = "/api/v1";

  // 0-1. API 연동 전 임의의 데이터 생성
  const posts = ref([
    {
      postId: 777777,
      postNum: 1,
      postTypeId: "PT01",
      postTitle: "첫 번째 게시글",
      postAuthorId: "user1",
      postCreatedDate: "2024-01-01 12:00",
      postModifiedDate: "2024-01-01 12:00",
      postContent: "첫 번째 게시글의 내용입니다.",
      isWriter: false,
    },
    {
      postId: 123546,
      postNum: 2,
      postTypeId: "PT04",
      postTitle: "두 번째 게시글",
      postAuthorId: "user2",
      postCreatedDate: "2024-01-03 12:00",
      postModifiedDate: "2024-01-03 12:00",
      postContent: "두 번째 게시글의 내용입니다.",
      isWriter: true,
    },
    {
      postId: 1223446,
      postNum: 3,
      postTypeId: "PT04",
      postTitle: "세 번째 게시글",
      postAuthorId: "user2",
      postCreatedDate: "2024-01-03 12:00",
      postModifiedDate: "2024-01-03 12:00",
      postContent: "두 번째 게시글의 내용입니다.",
      isWriter: true,
    },
    {
      postId: 12354316,
      postNum: 4,
      postTypeId: "PT04",
      postTitle: "두 번째 게시글",
      postAuthorId: "user2",
      postCreatedDate: "2024-01-03 12:00",
      postModifiedDate: "2024-01-03 12:00",
      postContent: "두 번째 게시글의 내용입니다.",
      isWriter: true,
    },
    {
      postId: 123234546,
      postNum: 5,
      postTypeId: "PT04",
      postTitle: "두 번째 게시글",
      postAuthorId: "user2",
      postCreatedDate: "2024-01-03 12:00",
      postModifiedDate: "2024-01-03 12:00",
      postContent: "두 번째 게시글의 내용입니다.",
      isWriter: true,
    },
    {
      postId: 1231231546,
      postNum: 6,
      postTypeId: "PT04",
      postTitle: "두 번째 게시글",
      postAuthorId: "user2",
      postCreatedDate: "2024-01-03 12:00",
      postModifiedDate: "2024-01-03 12:00",
      postContent: "두 번째 게시글의 내용입니다.",
      isWriter: true,
    },
    {
      postId: 12324546,
      postNum: 7,
      postTypeId: "PT02",
      postTitle: "하 게시글",
      postAuthorId: "user2",
      postCreatedDate: "2024-01-03 12:00",
      postModifiedDate: "2024-01-03 12:00",
      postContent: "두 번째 게시글의 내용입니다.",
      isWriter: true,
    },
    {
      postId: 1235124146,
      postNum: 8,
      postTypeId: "PT02",
      postTitle: "하이 게시글",
      postAuthorId: "user2",
      postCreatedDate: "2024-01-03 12:00",
      postModifiedDate: "2024-01-03 12:00",
      postContent: "두 번째 게시글의 내용입니다.",
      isWriter: true,
    },
    {
      postId: 1234546,
      postNum: 9,
      postTypeId: "PT02",
      postTitle: "하이이 게시글",
      postAuthorId: "user2",
      postCreatedDate: "2024-01-03 12:00",
      postModifiedDate: "2024-01-03 12:00",
      postContent: "두 번째 게시글의 내용입니다.",
      isWriter: true,
    },
    {
      postId: 11423546,
      postNum: 10,
      postTypeId: "PT04",
      postTitle: "두 번째 게시글",
      postAuthorId: "user2",
      postCreatedDate: "2024-01-03 12:00",
      postModifiedDate: "2024-01-03 12:00",
      postContent: "두 번째 게시글의 내용입니다.",
      isWriter: true,
    },
    {
      postId: 12359746,
      postNum: 11,
      postTypeId: "PT03",
      postTitle: "몇 번째 게시글",
      postAuthorId: "user2",
      postCreatedDate: "2024-01-03 12:00",
      postModifiedDate: "2024-01-03 12:00",
      postContent: "두 번째 게시글의 내용입니다.",
      isWriter: true,
    },
    {
      postId: 12354576,
      postNum: 12,
      postTypeId: "PT03",
      postTitle: "몇몇 번째 게시글",
      postAuthorId: "user2",
      postCreatedDate: "2024-01-03 12:00",
      postModifiedDate: "2024-01-03 12:00",
      postContent: "두 번째 게시글의 내용입니다.",
      isWriter: true,
    },
  ]);

  const postDetail = ref({
    postId: 777777,
    postNum: 2,
    postTypeId: "PT04",
    postTitle: "두 번째 게시글",
    postAuthorId: "user2",
    postCreatedDate: "2024-01-03 12:00",
    postModifiedDate: "2024-01-03 12:00",
    postContent: "두 번째 게시글의 내용입니다.",
    postImageFile:
      "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    isWriter: true,
    comments: [
      {
        commentId: 456789,
        commentAuthorId: "user1",
        commentContent: "두 번째 게시글의 첫번째 댓글",
        commentCreatedDate: "2024-01-03 15:00",
        commentModifiedDate: "2024-01-03 15:00",
        isWriter: false,
      },
      {
        commentId: 45678912,
        commentAuthorId: "user1",
        commentContent: "두 번째 게시글의 두번째 댓글",
        commentCreatedDate: "2024-01-03 18:00",
        commentModifiedDate: "2024-01-03 18:00",
        isWriter: false,
      },
      {
        commentId: 4567912,
        commentAuthorId: "user2",
        commentContent: "두 번째 게시글의 세번째 댓글",
        commentCreatedDate: "2024-01-03 19:00",
        commentModifiedDate: "2024-01-03 19:00",
        isWriter: true,
      },
    ],
  });

  // 1. API 호출 부분 --> 게시글 목록 불러오기
  const getPost = async () => {
    try {
      const response = await axios.get(`${API_URL}/post`);
      posts.value = response.data;
      console.log("게시글 목록 불러오기 성공");
    } catch (error) {
      console.error("게시글 목록 불러오기 실패:", error);
      console.log("임의의 데이터를 사용합니다.");
    }
  };

  // 2. API 호출 부분 --> 게시글 상세 정보 불러오기
  const getPostDetail = async () => {
    try {
      const response = await axios.get(`${API_URL}/post/${postId}`);
      postDetail.value = response.data;
      console.log("게시글 상세페이지 불러오기 성공");
    } catch (error) {
      console.error("게시글 상세페이지 불러오기 실패:", error);
      console.log("임의의 데이터를 사용합니다.");
    }
  };

  // 3. API 호출 부분 --> 내 게시글 정보 불러오기
  const getMyPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/post/user1`);
      posts.value = response.data;
      console.log("게시글 상세페이지 불러오기 성공");
    } catch (error) {
      console.error("게시글 상세페이지 불러오기 실패:", error);
      console.log("임의의 데이터를 사용합니다.");
    }
  };

  // 4. API 호출 부분 --> 내 게시글 정보 불러오기
  const getMyComments = async () => {
    try {
      const response = await axios.get(`${API_URL}/post/user1`);
      posts.value = response.data;
      console.log("게시글 상세페이지 불러오기 성공");
    } catch (error) {
      console.error("게시글 상세페이지 불러오기 실패:", error);
      console.log("임의의 데이터를 사용합니다.");
    }
  };

  // 5. API 호출 부분 --> 게시글 생성
  const addPost = async (post) => {
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("category", post.category);
    formData.append("author", post.author);
    formData.append("time", post.time);
    formData.append("comments", JSON.stringify(post.comments));
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // 게시글을 서버에 저장합니다.

    try {
      const response = await axios.post(`${API_URL}/posts/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      posts.value.push(response.data);
      console.log("게시글 추가 성공");
    } catch (error) {
      console.error("게시글 추가 실패:", error);
    }
  };

  const reportPost = async (postId) => {
    console.log("게시글 신고 요청");
    console.log(postId);
    try {
      await axios.post(`${API_URL}/community/reportPost`, {
        postId: postId,
      });
      console.log("게시글 신고 성공");
    } catch (error) {
      console.error("게시글 신고 실패");
      console.error(error);
    }
  };

  // 작업 내용 서버로 전송

  const reportComment = async (commentId) => {
    console.log("댓글 신고 요청");
    console.log(commentId);
    try {
      await axios.post(`${API_URL}/community/reportComment`, {
        commentId: commentId,
      });
      console.log("게시글 신고 성공");
    } catch (error) {
      console.error("게시글 신고 실패");
      console.error(error);
    }
  };

  const modifyComment = async (commentId, commentContent) => {
    console.log("댓글 수정 요청");
    console.log(commentId);
    try {
      await axios.patch(`${API_URL}/community/comment`, {
        commentId: commentId,
        commentContent: commentContent,
      });
      console.log("댓글 수정 성공");
    } catch (error) {
      console.error("댓글 수정 실패");
      console.error(error);
    }
  };

  const deleteComment = async (commentId) => {
    console.log("댓글 삭제 요청");
    console.log(commentId);
    try {
      await axios.delete(`${API_URL}/community/comment`, {
        commentId: commentId,
      });
      console.log("댓글 삭제 성공");
    } catch (error) {
      console.error("댓글 삭제 실패`");
      console.error(error);
    }
  };

  return {
    posts,
    postDetail,
    getPost,
    getPostDetail,
    getMyPosts,
    getMyComments,
    addPost,
    reportPost,

    reportComment,
    modifyComment,
    deleteComment,
  };
});
