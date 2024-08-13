import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import axios from "axios";

export const useNotificationStore = defineStore("notificationstore", () => {
  const router = useRouter();
  const API_URL = "/api/v1";

  const notificationChatList = ref([
    {
      notiId: 1,
      receiver: "chaeni",
      typeId: "컴터챗",
      messageContent: "오주원님과 컴터챗이 확정되었습니다.",
      isRead: false,
      createdTime: "2024-08-01T00:00:30",
      matchingId: "1",
    },
    {
      notiId: 4,
      receiver: "chaeni",
      typeId: "컴터챗",
      messageContent: "2024.08.11 18:30 - 19:00 (30분) 컴터챗을 요청했습니다.",
      isRead: false,
      createdTime: "2024-08-01T00:00:30",
      matchingId: "2",
    },
    {
      notiId: 5,
      receiver: "chaeni",
      typeId: "컴터챗 결제",
      messageContent: "컴터챗이 매칭되었습니다. 결제를 진행하세요 !",
      isRead: false,
      createdTime: "2024-08-01T00:00:30",
      matchingId: "3",
    },
  ]);

  const notificationElseList = ref([
    {
      notiId: 2,
      notiNum: 2,
      receiver: "chaeni",
      typeId: "기타",
      messageContent: "작성하신 댓글 관련하여 신고가 접수되었습니다.",
      isRead: false,
      createdTime: "2024-08-01T00:00:30",
      link: "urlurlurl",
    },
    {
      notiId: 3,
      notiNum: 3,
      receiver: "chaeni",
      typeId: "게시글",
      messageContent: "작성하신 게시글에 댓글이 달렸습니다.",
      isRead: false,
      createdTime: "2024-08-01T00:00:30",
      link: "urlurlurl",
    },
    {
      notiId: 5,
      notiNum: 5,
      receiver: "chaeni",
      typeId: "컴터챗 결제",
      messageContent: "컴터챗이 매칭되었습니다. 결제를 진행하세요 !",
      isRead: false,
      createdTime: "2024-08-01T00:00:30",
      link: "urlurlurl",
    },
    {
      notiId: 6,
      notiNum: 6,
      receiver: "chaeni",
      typeId: "기타",
      messageContent: "작성하신 댓글 관련하여 신고가 접수되었습니다.",
      isRead: false,
      createdTime: "2024-08-01T00:00:30",
      link: "urlurlurl",
    },
  ]);

  const notificationList = ref([
    {
      notiId: 1,
      notiNum: 1,
      receiver: "chaeni",
      typeId: "컴터챗 확정",
      messageContent: "오주원님과 컴터챗이 확정되었습니다.",
      isRead: false,
      createdTime: "2024-08-01T00:00:30",
      link: "urlurlurl",
    },
    {
      notiId: 2,
      notiNum: 2,
      receiver: "chaeni",
      typeId: "기타",
      messageContent: "작성하신 댓글 관련하여 신고가 접수되었습니다.",
      isRead: false,
      createdTime: "2024-08-01T00:00:30",
      link: "urlurlurl",
    },
    {
      notiId: 3,
      notiNum: 3,
      receiver: "chaeni",
      typeId: "게시글",
      messageContent: "작성하신 게시글에 댓글이 달렸습니다.",
      isRead: false,
      createdTime: "2024-08-01T00:00:30",
      link: "urlurlurl",
    },
    {
      notiId: 4,
      notiNum: 4,
      receiver: "chaeni",
      typeId: "컴터챗 요청",
      messageContent: "2024.08.11 18:30 - 19:00 (30분) 컴터챗을 요청했습니다.",
      isRead: false,
      createdTime: "2024-08-01T00:00:30",
      link: "urlurlurl",
    },
    {
      notiId: 5,
      notiNum: 5,
      receiver: "chaeni",
      typeId: "컴터챗 결제",
      messageContent: "컴터챗이 매칭되었습니다. 결제를 진행하세요 !",
      isRead: false,
      createdTime: "2024-08-01T00:00:30",
      link: "urlurlurl",
    },
    {
      notiId: 6,
      notiNum: 6,
      receiver: "chaeni",
      typeId: "기타",
      messageContent: "작성하신 댓글 관련하여 신고가 접수되었습니다.",
      isRead: false,
      createdTime: "2024-08-01T00:00:30",
      link: "urlurlurl",
    },
  ]);

  //   const notificationList = async () => {
  //   // 1. API 호출 부분 --> 알림 리스트 불러오기
  //   try {
  //       const response = await axios.get(`${API_URL}/notice`);
  //       notificationList.value = response.data;
  //       console.log('알림 리스트 불러오기 성공');
  //   } catch (error) {
  //       console.error('알림 리스트 불러오기 실패', error);
  //   }
  // };

  //   const notificationElseList = async () => {
  //   // 1. API 호출 부분 --> 알림 리스트 불러오기
  //   try {
  //       const response = await axios.get(`${API_URL}/notice2`);
  //       notificationList.value = response.data;
  //       console.log('알림 리스트 불러오기 성공');
  //   } catch (error) {
  //       console.error('알림 리스트 불러오기 실패', error);
  //   }
  // };

  return {
    notificationChatList,
    notificationElseList,
    notificationList,
  };
});
