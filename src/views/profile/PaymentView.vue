<template>
  <div class="container mt-4 text-white">
    <h1 style="font-weight: bold">결제내역 페이지입니다 !</h1>
  </div>

  <!-- 1. 결제내역 관련 영역 -->
  <!-- <div class="notification-section">
    <h2 style="font-weight: bold">읽지 않은 알림</h2>
    <div
      v-if="unreadNotifications.length"
      v-for="notification in unreadNotifications"
      :key="notification.id"
      class="notification-card unread"
    >
      <div class="notification-content">
        <p class="notification-type">{{ notification.typeId }}</p>
        <p class="notification-message">{{ notification.message }}</p>
        <div class="notification-actions">
          <input
            type="checkbox"
            v-model="notification.read"
            @change="markAsRead(notification)"
            class="read-checkbox"
          />
          <button
            v-if="notification.typeId === '컴터챗 확정'"
            @click="enterComtochat(notification.id)"
            class="enter-button"
          >
            컴터챗 입장하기
          </button>
        </div>
      </div>
    </div>
    <p v-else class="empty-message">새로운 알림이 없습니다.</p>
  </div> -->
</template>

<script></script>

<style scoped></style>
