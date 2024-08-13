<template>
  <div class="notification-container">
    <div class="tabs">
      <button
        :class="{ active: activeTab === '컴터챗' }"
        @click="setActiveTab('컴터챗')"
      >
        컴터챗
      </button>
      <button
        :class="{ active: activeTab === '기타' }"
        @click="setActiveTab('기타')"
      >
        기타
      </button>
    </div>

    <!-- 컴터챗 알림 영역 -->
    <div v-if="activeTab === '컴터챗'" class="notification-section">
      <h5>컴터챗 알림입니다 !</h5>
      <div v-if="notificationChatList.length">
        <div
          v-for="notification in notificationChatList"
          :key="notification.notiId"
          :class="[
            'notification-card',
            notification.isRead ? 'read' : 'unread',
          ]"
        >
          <div class="notification-content">
            <p class="notification-type">{{ notification.typeId }}</p>
            <p class="notification-message">
              {{ notification.messageContent }}
            </p>
            <div class="notification-actions">
              <input
                type="checkbox"
                v-model="notification.isRead"
                @change="markAsRead(notification)"
                class="read-checkbox"
              />

              <!-- 컴터챗 확정 -->
              <button
                v-if="notification.typeId === '컴터챗 확정'"
                @click="enterComtochat(notification.matchingId)"
                class="enter-button"
              >
                컴터챗 입장하기
              </button>

              <!-- 컴터챗 요청 -->
              <div v-if="notification.typeId === '컴터챗 요청'">
                <button
                  @click="showReportModal(notification.matchingId)"
                  class="apply-button"
                >
                  수락
                </button>
                <button
                  @click="showReportModal(notification.matchingId)"
                  class="reject-button"
                >
                  거절
                </button>
              </div>

              <!-- 컴터챗 결제 -->
              <button
                v-if="notification.typeId === '컴터챗 결제'"
                @click="requestPay"
                class="enter-button"
              >
                결제하기
              </button>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="empty-message">새로운 알림이 없습니다.</p>
    </div>

    <!-- 기타 알림 영역 -->
    <div v-if="activeTab === '기타'" class="notification-section">
      <h5>기타 알림입니다 !</h5>
      <div v-if="notificationElseList.length">
        <div
          v-for="notification in notificationElseList"
          :key="notification.notiId"
          :class="[
            'notification-card',
            notification.isRead ? 'read' : 'unread',
          ]"
        >
          <div class="notification-content">
            <p class="notification-type">{{ notification.typeId }}</p>
            <p class="notification-message">
              {{ notification.messageContent }}
            </p>
            <div class="notification-actions">
              <input
                type="checkbox"
                v-model="notification.isRead"
                @change="markAsRead(notification)"
                class="read-checkbox"
              />

              <!-- 기타 알림의 링크 버튼 -->
              <a :href="notification.link" class="link-button">알림 확인하기</a>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="empty-message">새로운 알림이 없습니다.</p>
    </div>
  </div>
</template>

<script>
import { useNotificationStore } from "@/stores/notification";
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "NotificationsView",
  data() {
    return {
      activeTab: "컴터챗", // 초기 탭을 설정합니다.
      notificationChatList: [
        // 예시 데이터: 실제 데이터는 API로부터 받아옵니다.
        {
          notiId: 1,
          receiver: "chaeni",
          typeId: "컴터챗 확정",
          messageContent: "오주원님과 컴터챗이 확정되었습니다.",
          isRead: false,
          createdTime: "2024-08-01T00:00:30",
          matchingId: "1",
        },
      ],
      notificationElseList: [
        // 예시 데이터: 실제 데이터는 API로부터 받아옵니다.
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
      ],
    };
  },
  methods: {
    setActiveTab(tabName) {
      this.activeTab = tabName;
    },
    markAsRead(notification) {
      // 알림을 읽음 처리하는 로직을 여기에 추가합니다.
      notification.isRead = true;
    },
    enterComtochat(matchingId) {
      // 컴터챗 입장하기 동작을 여기에 추가합니다.
      console.log(`Entering Comtochat with ID: ${matchingId}`);
    },
    showReportModal(matchingId) {
      // 수락/거절 모달을 여는 동작을 여기에 추가합니다.
      console.log(`Showing report modal for ID: ${matchingId}`);
    },
    requestPay() {
      // 결제하기 동작을 여기에 추가합니다.
      console.log("Requesting payment");
    },
  },
};
</script>

<style scoped>
/* 스타일 정의 */
.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: #f1f1f1;
}

.tabs button.active {
  font-weight: bold;
  border-bottom: 2px solid #ffffff;
}

.notification-section {
  margin-top: 20px;
}

.notification-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.notification-card.unread {
  background-color: #f9f9f9;
}

.notification-card.read {
  background-color: #e9e9e9;
}

.notification-content {
  display: flex;
  flex-direction: column;
}

.notification-type {
  font-weight: bold;
  color: black;
}

.notification-message {
  color: black;
  margin: 5px 0;
}

.notification-actions {
  display: flex;
  align-items: center;
}

.read-checkbox {
  margin-right: 10px;
}

.enter-button,
.apply-button,
.reject-button,
.link-button {
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 3px;
}

.link-button {
  background-color: #28a745;
}

.empty-message {
  text-align: center;
  color: #333333;
  margin-top: 20px;
}
</style>
