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
      <h2>컴터챗 알림</h2>
      <!-- 읽지 않은 알림 -->
      <div v-if="unreadChatNotifications.length" class="notification-section">
        <h3>읽지 않은 알림</h3>
        <div
          v-for="notification in unreadChatNotifications"
          :key="notification.notiId"
          :class="['notification-card', 'unread']"
        >
          <div class="notification-content">
            <p class="notification-type">{{ notification.typeId }}</p>
            <p class="notification-message">
              {{ notification.messageContent }}
            </p>
            <div class="notification-actions">
              <input
                type="checkbox"
                v-if="!notification.isRead"
                v-model="notification.isRead"
                @change="markAsRead(notification)"
                class="read-checkbox"
              />
              <button
                v-if="notification.typeId === '컴터챗 확정'"
                @click="enterComtochat(notification.matchingId)"
                class="enter-button"
              >
                컴터챗 입장하기
              </button>
              <div v-if="notification.typeId === '컴터챗 요청'">
                <button
                  @click="showAcceptModal(notification.notiId)"
                  class="apply-button"
                >
                  수락
                </button>
                <button
                  @click="showRejectModal(notification.notiId)"
                  class="reject-button"
                >
                  거절
                </button>
              </div>
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

      <!-- 읽은 알림 -->
      <div v-if="readChatNotifications.length" class="notification-section">
        <h3>읽은 알림</h3>
        <div
          v-for="notification in readChatNotifications"
          :key="notification.notiId"
          :class="['notification-card', 'read']"
        >
          <div class="notification-content">
            <p class="notification-type">{{ notification.typeId }}</p>
            <p class="notification-message">
              {{ notification.messageContent }}
            </p>
            <div class="notification-actions">
              <button
                v-if="notification.typeId === '컴터챗 확정'"
                @click="enterComtochat(notification.matchingId)"
                class="enter-button"
              >
                컴터챗 입장하기
              </button>
              <div v-if="notification.typeId === '컴터챗 요청'">
                <button
                  @click="showAcceptModal(notification.notiId)"
                  class="apply-button"
                >
                  수락
                </button>
                <button
                  @click="showRejectModal(notification.notiId)"
                  class="reject-button"
                >
                  거절
                </button>
              </div>
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
      <p v-else class="empty-message">읽은 알림이 없습니다.</p>
    </div>

    <!-- 기타 알림 영역 -->
    <div v-else class="notification-section">
      <h2>기타 알림</h2>

      <!-- 읽지 않은 알림 -->
      <div v-if="unreadElseNotifications.length" class="notification-section">
        <h3>읽지 않은 알림</h3>
        <div
          v-for="notification in unreadElseNotifications"
          :key="notification.notiId"
          :class="['notification-card', 'unread']"
        >
          <div class="notification-content">
            <p class="notification-type">{{ notification.typeId }}</p>
            <p class="notification-message">
              {{ notification.messageContent }}
            </p>
            <div class="notification-actions">
              <input
                type="checkbox"
                v-if="!notification.isRead"
                v-model="notification.isRead"
                @change="markAsRead(notification)"
                class="read-checkbox"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 읽은 알림 -->
      <div v-if="readElseNotifications.length" class="notification-section">
        <h3>읽은 알림</h3>
        <div
          v-for="notification in readElseNotifications"
          :key="notification.notiId"
          :class="['notification-card', 'read']"
        >
          <div class="notification-content">
            <p class="notification-type">{{ notification.typeId }}</p>
            <p class="notification-message">
              {{ notification.messageContent }}
            </p>
            <div class="notification-actions"></div>
          </div>
        </div>
      </div>
      <p v-else class="empty-message">읽은 알림이 없습니다.</p>
    </div>
  </div>

  <!-- 모달 관련 코드 -->
  <div
    class="modal fade"
    id="rejectModal"
    tabindex="-1"
    aria-labelledby="rejectModalLabel"
    aria-hidden="true"
    ref="rejectModal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="rejectModalLabel">거절하기</h5>
          <button
            type="button"
            class="btn-close"
            @click="closeRejectModal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p style="color: black">정말 거절하시겠습니까? 진짜로?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="confirmReject">
            확인
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="closeRejectModal"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- '수락' 모달 -->
  <div
    class="modal fade"
    id="acceptModal"
    tabindex="-1"
    aria-labelledby="acceptModalLabel"
    aria-hidden="true"
    ref="acceptModal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="acceptModalLabel">수락하기</h5>
          <button
            type="button"
            class="btn-close"
            @click="closeAcceptModal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p style="color: black">원하는 시간을 선택해주세요:</p>
          <div v-for="time in possibleTimes" :key="time">
            <input type="radio" :value="time" v-model="selectedTime" />
            <label>{{ new Date(time).toLocaleString() }}</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" @click="confirmAccept">
            확인
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="closeAcceptModal"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useNotificationStore } from "@/stores/notification";
import { useMatchingStore } from "@/stores/matching";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "NotificationsView",
  setup() {
    const notificationStore = useNotificationStore();
    const matchingStore = useMatchingStore();
    const router = useRouter();
    const activeTab = ref("컴터챗");
    const reportTarget = ref({ id: "" });
    const acceptModal = ref(null);
    const rejectModal = ref(null);
    const selectedTime = ref(null);
    const possibleTimes = ref([]);

    // 컴터챗 알림 관련 데이터
    const notificationChatList = computed(
      () => notificationStore.notificationChatList
    );

    // 기타 알림 관련 데이터
    const notificationElseList = computed(
      () => notificationStore.notificationElseList
    );

    // 매칭 관련 데이터
    const matchingList = computed(() => matchingStore.matchingList);

    // 읽지 않은 알림과 읽은 알림을 나누기 위한 computed 속성
    const unreadChatNotifications = computed(() => {
      return notificationChatList.value.filter(
        (notification) => !notification.isRead
      );
    });

    const readChatNotifications = computed(() => {
      return notificationChatList.value.filter(
        (notification) => notification.isRead
      );
    });

    const unreadElseNotifications = computed(() => {
      return notificationElseList.value.filter(
        (notification) => !notification.isRead
      );
    });

    const readElseNotifications = computed(() => {
      return notificationElseList.value.filter(
        (notification) => notification.isRead
      );
    });

    // 탭 관련
    const setActiveTab = (tabName) => {
      activeTab.value = tabName;
    };

    // 컴터챗 입장하기 --> 백엔드로 매칭 아이디 보내기 --> 추후, 수정 팔요
    const enterComtochat = async (matchingId) => {
      try {
        await axios.post("/api/v1/comtochat/enter", { matchingId });

        console.log(
          `Successfully sent matchingId ${matchingId} to the backend.`
        );
      } catch (error) {
        console.error("Error sending matchingId to backend:", error);
      }
    };

    // 알림 읽음 표시 --> 백엔드로 보내기
    const markAsRead = async (notification) => {
      try {
        await axios.put(`/api/v1/notice/${notification.id}`, {
          isRead: notification.isRead,
        });
        console.log("알림 읽기 상태가 업데이트되었습니다.");
      } catch (error) {
        console.error(
          "알림 상태를 업데이트하는 중 오류가 발생했습니다:",
          error
        );
      }
    };

    // '수락' 모달 열기
    const showAcceptModal = (id) => {
      reportTarget.value.id = id;

      // 알림 리스트에서 matchingId를 가져옴
      const notification = notificationChatList.value.find(
        (item) => item.notiId === id
      );

      console.log(notification);

      if (notification) {
        const matchingId = notification.matchingId;

        // matchingId를 사용해 matchingList에서 해당 매칭 데이터를 찾음
        const matchingData = matchingList.value.find(
          (item) => item[matchingId]
        );

        console.log(matchingData);

        if (matchingData) {
          // possible_start_time 값을 possibleTimes에 할당
          possibleTimes.value = matchingData[matchingId].possible_start_time;
          console.log(possibleTimes.value);
        } else {
          console.error("Matching data not found.");
          return;
        }
      } else {
        console.error("Notification not found.");
        return;
      }

      const modalElement = document.getElementById("acceptModal");
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    };

    // '거절' 모달 열기
    const showRejectModal = (id) => {
      reportTarget.value = { id };

      const modalElement = document.getElementById("rejectModal");
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    };

    // 모달 닫기
    const closeAcceptModal = () => {
      const modalElement = document.getElementById("acceptModal");
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    };

    const closeRejectModal = () => {
      const modalElement = document.getElementById("rejectModal");
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    };

    // 수락 -> 시간대 선택 -> 하나의 시간 만 백엔드로 전송
    const confirmAccept = async () => {
      if (!selectedTime.value) {
        alert("시간을 선택해주세요.");
        return;
      }

      try {
        const matchingId = reportTarget.value.id;
        await axios.put(``, {
          matchingId: notification.matchingId,
          possible_start_time: [selectedTime.value], // 선택된 시간만 보냄
        });

        console.log(
          `Confirmed accept for matching ID: ${matchingId} with time: ${selectedTime.value}`
        );
        closeAcceptModal();
      } catch (error) {
        console.error("Error updating matching data:", error);
      }
    };

    // 거절에서 '확인' -> 백엔드로 possible_start_time을 null값 처리 후 전송
    const confirmReject = async () => {
      try {
        const notification = notificationChatList.value.find(
          (item) => item.notiId === reportTarget.value.id
        );

        console.log(reportTarget.value); // matching_id
        console.log(notificationChatList.value);
        console.log(notification);

        if (notification) {
          const matchingId = notification.matchingId;

          const matchingData = matchingList.value.find(
            (item) => item[matchingId]
          );

          if (matchingData) {
            matchingData[matchingId].possible_start_time = null;

            await axios.put(``, {
              matchingId: notification.matchingId,
              possible_start_time: "",
            });

            console.log(`Confirmed reject for matching ID: ${matchingId}`);
          } else {
            console.error("Matching data not found.");
          }
        } else {
          console.error("Notification not found.");
        }

        closeRejectModal();
      } catch (error) {
        console.error("Error updating matching data:", error);
      }
    };

    // 결제 관련 기능 추가
    const IMP = window.IMP;
    IMP.init("imp42622840");

    const requestPay = () => {
      IMP.request_pay(
        {
          pg: "kakaopay",
          pay_method: "card",
          merchant_uid: "sadkjlsadf-dfsdfsdfssdfsdgdgsfsdfsdfdf", 
          name: "컴터챗 이용권",
          amount: 3000,
        },
        async function (rsp) {
          console.log(rsp);
          console.log(reportTarget.value.id)

          if (rsp.success) {
            try {
              const data = {
                merchantUID: rsp.merchant_uid,
                matchingId: reportTarget.value.id,
                productName: rsp.name,
                paidAmount: rsp.paid_amount,
              };

              // 백엔드 API로 데이터 전송
              const response = await axios.post("/api/v1/payment", data);

              console.log("Payment data sent successfully:", response.data);
            } catch (error) {
              console.error("Error sending payment data:", error);
            }
          } else {
            console.error("Payment failed or canceled:", rsp.error_msg);
          }
        }
      );
    };

    return {
      reportTarget,
      activeTab,
      unreadChatNotifications,
      readChatNotifications,
      unreadElseNotifications,
      readElseNotifications,
      setActiveTab,
      markAsRead,
      enterComtochat,
      requestPay,
      matchingList,
      acceptModal,
      rejectModal,
      showAcceptModal,
      showRejectModal,
      confirmAccept,
      confirmReject,
      closeRejectModal,
      closeAcceptModal,
      selectedTime,
      possibleTimes,
    };
  },
};
</script>

<style scoped>
.notification-container {
  padding: 20px;
  background-color: #18191c;
  border-radius: 10px;
  max-width: 800px;
  margin: 0;
  margin-left: 20px; /* 왼쪽 정렬을 위해 추가 */
  color: #ffffff;
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  background-color: #222;
  border-radius: 8px;
}

.tabs button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: #aaa;
  transition: color 0.3s ease, border-bottom 0.3s ease;
}

.tabs button.active {
  color: #ffffff;
  border-bottom: 2px solid #ffffff;
}

.notification-section {
  margin-bottom: 40px;
}

.notification-card {
  border: 1px solid #333;
  border-radius: 10px;
  padding: 20px;
  background-color: #1e1f24;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.notification-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
}

.notification-card.unread {
  border-left: 4px solid #e7e0e2;
}

.notification-card.read {
  border-left: 4px solid #444;
  background-color: #2c2c2c;
}

.notification-content {
  display: flex;
  flex-direction: column;
  position: relative;
}

.notification-type {
  font-weight: bold;
  color: #ffffff;
}

.notification-message {
  margin-top: 5px;
  color: #aaa;
}

.notification-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  top: 10px;
  right: 10px;
}

.notification-actions .read-checkbox {
  margin-bottom: 10px;
  transform: scale(1.2);
}

.notification-actions .enter-button {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  background: linear-gradient(45deg, #00f260, #0575e6);
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;
}

.notification-actions .enter-button:hover {
  background: linear-gradient(45deg, #0575e6, #00f260);
}

.empty-message {
  font-size: 16px;
  color: #777;
  text-align: center;
}

h2 {
  font-size: 22px;
  color: #ffffff;
  margin-bottom: 20px;
  border-bottom: 1px solid #555;
  padding-bottom: 10px;
}

h3 {
  font-size: 18px;
  color: #ffffff;
  margin-bottom: 15px;
  padding-left: 5px;
  border-left: 4px solid #007bff;
}

.apply-button {
  margin-left: 5px;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  background: #0575e6;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;
}

.notification-actions .apply-button:hover {
  background: linear-gradient(45deg, #0575e6, #65a2d8);
}

.reject-button {
  margin-left: 5px;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  background: #ea1333;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;
}

.notification-actions .reject-button:hover {
  background: linear-gradient(45deg, #ea1333, #e29f9f);
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  color: black;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
