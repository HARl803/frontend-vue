<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/profile">회원정보</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/my-pc">내 PC</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/reservations"
            >예약관리</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/schedule">스케줄관리</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/wishlist">찜 목록</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/notifications">알림</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/cscenter">문의</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/payment"
            >결제내역/관리</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "ProfileNav",
};
</script>

<style scoped>
.navbar {
  margin-bottom: 20px;
  background-color: #b9b5b5 !important;
}
</style>
