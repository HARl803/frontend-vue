<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
          <span class="text-primary">P</span><span class="text-success">|</span
        ><span class="text-success2">sh</span
        ><span class="text-success3">el</span
        ><span class="text-success4">ter</span>
        </router-link>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
            class="collapse navbar-collapse"
            id="navbarNav"
            style="font-weight: bold"
        >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/parts-search"
              >부품 찾기
              </router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/mentor-search"
              >멘토 검색
              </router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/community"
              >자유게시판
              </router-link
              >
            </li>
          </ul>
          <div v-if="profile" class="d-flex align-items-center position-relative">
            <div class="dropdown">
              <div
                  class="profile"
                  @click="toggleProfileDropdown"
                  id="profileDropdown"
                  role="button"
              >
                <img class="profileImage"
                     src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
                     alt="프로필 이미지">
                <!--                                <img class="profileImage" :src="profile.profileMember.profileImage">-->
              </div>

              <ul
                  class="dropdown-menu dropdown-menu-end"
                  :class="{ show: showProfileDropdown }"
                  aria-labelledby="profileDropdown"
              >
                <li>
                  <router-link
                      class="dropdown-item"
                      to="/profile"
                      @click="hideProfileDropdown"
                  >회원정보
                  </router-link
                  >
                </li>
                <li>
                  <router-link
                      class="dropdown-item"
                      to="/my-pc"
                      @click="hideProfileDropdown"
                  >내 PC
                  </router-link
                  >
                </li>
                <li>
                  <router-link
                      class="dropdown-item"
                      to="/reservations"
                      @click="hideProfileDropdown"
                  >예약관리
                  </router-link
                  >
                </li>
                <li>
                  <router-link
                      class="dropdown-item"
                      to="/schedule"
                      @click="hideProfileDropdown"
                  >스케줄관리
                  </router-link
                  >
                </li>
                <li>
                  <router-link
                      class="dropdown-item"
                      to="/wishlist"
                      @click="hideProfileDropdown"
                  >찜 목록
                  </router-link
                  >
                </li>
                <li>
                  <router-link
                      class="dropdown-item"
                      to="/notifications"
                      @click="hideProfileDropdown"
                  >알림
                  </router-link
                  >
                </li>
                <li>
                  <router-link
                      class="dropdown-item"
                      to="/cscenter"
                      @click="hideProfileDropdown"
                  >문의
                  </router-link
                  >
                </li>
                <li>
                  <router-link
                      class="dropdown-item"
                      to="/payment"
                      @click="hideProfileDropdown"
                  >결제내역/관리
                  </router-link
                  >
                </li>
                <li>
                  <router-link
                      class="dropdown-item"
                      to="/"
                      @click="logout"
                  >로그아웃
                  </router-link
                  >
                </li>
              </ul>
            </div>
          </div>
          <a v-else href="https://i11a803.p.ssafy.io/api/v1/auth/authorize">
            <img src="@/assets/kakao_login_medium_narrow.png" alt="카카오 로그인">
          </a>

        </div>
      </div>
    </nav>
    <ProfileNav v-if="showProfileNav"/>
  </header>
</template>

<script>
import ProfileNav from "./ProfileNav.vue";
import {computed, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth.js";


export default {
  name: "Navbar",
  components: {
    ProfileNav,
  },
  setup() {
    const showProfileDropdown = ref(false);
    const showProfileNav = ref(false);
    const showNotificationsDropdown = ref(false);
    const unreadNotifications = ref([
      {id: 1, text: "새로운 메시지가 도착했습니다."},
      {id: 2, text: "새로운 댓글이 달렸습니다."},
    ]);
    const route = useRoute();

    const authStore = useAuthStore();
    const profile = computed(() => authStore.profile);

    const toggleProfileDropdown = () => {
      showProfileDropdown.value = !showProfileDropdown.value;
    };

    const hideProfileDropdown = () => {
      showProfileDropdown.value = false;
    };

    const toggleNotificationsDropdown = () => {
      showNotificationsDropdown.value = !showNotificationsDropdown.value;
    };

    const hideNotificationsDropdown = () => {
      showNotificationsDropdown.value = false;
    };

    const logout = () => {
      authStore.logout();
    }

    onMounted(() => {
      authStore.getProfile();
    })

    watch(route, (newRoute) => {
      if (
          newRoute.path.startsWith("/profile") ||
          newRoute.path.startsWith("/my-pc") ||
          newRoute.path.startsWith("/reservations") ||
          newRoute.path.startsWith("/schedule") ||
          newRoute.path.startsWith("/wishlist") ||
          newRoute.path.startsWith("/notifications") ||
          newRoute.path.startsWith("/cscenter")
      ) {
        showProfileNav.value = true;
      } else {
        showProfileNav.value = false;
      }
    });

    return {
      showProfileDropdown,
      showProfileNav,
      showNotificationsDropdown,
      unreadNotifications,
      toggleProfileDropdown,
      hideProfileDropdown,
      toggleNotificationsDropdown,
      hideNotificationsDropdown,

      profile,
      logout,

    };
  },
};
</script>

<style scoped>
.navbar {
  font-family: "NotoSansKR", sans-serif !important;
  letter-spacing: -1px !important;
}

.navbar-dark .navbar-brand span.text-primary {
  color: #ff00ff !important;
  letter-spacing: 1.5px !important;
}

.navbar-dark .navbar-brand span.text-success {
  color: #e56d11 !important;
  letter-spacing: 1.5px !important;
}

.navbar-dark .navbar-brand span.text-success2 {
  color: #e7ea0e !important;
  letter-spacing: 1.5px !important;
}

.navbar-dark .navbar-brand span.text-success3 {
  color: #00ff00 !important;
  letter-spacing: 1.5px !important;
}

.navbar-dark .navbar-brand span.text-success4 {
  color: #2015f2 !important;
  letter-spacing: 1.5px !important;
}

.navbar-dark .nav-link {
  color: #ffffff !important;
}

.navbar-dark .nav-link:hover {
  color: #cccccc !important;
}

.bi-bell,
.bi-person-circle {
  font-size: 1.5rem;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1000;
  display: none;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
}

.dropdown-menu.show {
  display: block;
}

.profile {
  border-radius: 70%;
  overflow: hidden;
}

.profileImage {
  width: 60px;
  height: 60px;
  object-fit: cover;
}
</style>
