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
    <div v-else class="notification-section">
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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "NotificationsView",
  setup() {
    const notificationStore = useNotificationStore();
    const router = useRouter();
    const activeTab = ref("컴터챗");

    // 컴터챗 알림 관련 데이터
    const notificationChatList = computed(
      () => notificationStore.notificationChatList
    );

    // 기타 알림 관련 데이터
    const notificationElseList = computed(
      () => notificationStore.notificationElseList
    );

    const setActiveTab = (tabName) => {
      activeTab.value = tabName;
    };

    const markAsRead = (notification) => {
      notification.isRead = true;
    };

    const enterComtochat = (matchingId) => {
      console.log(`Entering Comtochat with ID: ${matchingId}`);
    };

    const showReportModal = (matchingId) => {
      console.log(`Showing report modal for ID: ${matchingId}`);
    };

    // 결제 관련 기능 추가
    const IMP = window.IMP;
    IMP.init("imp42622840");

    const requestPay = () => {
      IMP.request_pay(
        {
          pg: "kakaopay",
          pay_method: "card",
          merchant_uid: "sadkjlsadf-sasdfsdffssdfsdfkjafsd", // 상점 고유 주문번호
          name: "포트원 테스트",
          amount: 1004,
          buyer_email: "good@portone.io",
          buyer_name: "포트원 기술지원팀",
          buyer_tel: "010-1234-5678",
          buyer_addr: "서울특별시 강남구 삼성동",
          buyer_postcode: "123-456",
        },
        function (rsp) {
          console.log(rsp);
          // callback 처리: rsp.imp_uid 값으로 결제 단건조회 API를 호출하여 결제결과를 판단합니다.
        }
      );
    };

    return {
      activeTab,
      notificationChatList,
      notificationElseList,
      setActiveTab,
      markAsRead,
      enterComtochat,
      showReportModal,
      requestPay,
    };
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
