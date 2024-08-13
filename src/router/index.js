import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/home/HomeView.vue";
import BoardListView from "@/views/board/BoardListView.vue";
import BoardDetailView from "@/views/board/BoardDetailView.vue";
import BoardCreateView from "@/views/board/BoardCreateView.vue";
import PartsSearchView from "@/views/partsSearch/PartsSearchView.vue";
import PartsDetailView from "@/views/partsSearch/PartsDetailView.vue";
import RecommendView from "@/views/partsSearch/RecommendView.vue";
import MentorSearchView from "@/views/mentorSearch/MentorSearchView.vue";
import MentorDetailView from "@/views/mentorSearch/MentorDetailView.vue";
import ProfileView from "@/views/profile/ProfileView.vue";
import MyPCView from "@/views/profile/MyPCView.vue";
import ReservationsView from "@/views/profile/ReservationsView.vue";
import ScheduleView from "@/views/profile/ScheduleView.vue";
import WishlistView from "@/views/profile/WishlistView.vue";
import CScenterView from "@/views/profile/CScenterView.vue";
import NotificationsView from "@/views/profile/NotificationsView.vue";
import ReserveView from "@/views/mentorMatch/ReserveView.vue";
import PaymentView from "@/views/profile/PaymentView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  {
    path: "/community",
    name: "community",
    component: BoardListView,
    props: { boardTitle: "자유게시판" },
  },
  {
    path: "/community/create",
    name: "boardCreate",
    component: BoardCreateView,
  },
  { path: "/parts-search", name: "partsSearch", component: PartsSearchView },
  { path: "/parts-search/:id", name: "partDetail", component: PartsDetailView },
  { path: "/recommend", name: "recommend", component: RecommendView },
  { path: "/mentor-search", name: "mentorSearch", component: MentorSearchView },
  {
    path: "/mentor-search/:id",
    name: "mentorDetail",
    component: MentorDetailView,
  },
  { path: "/mentor-reserve/:id", name: "reserve", component: ReserveView },
  { path: "/profile", name: "profile", component: ProfileView },
  { path: "/my-pc", name: "myPC", component: MyPCView },
  { path: "/reservations", name: "reservations", component: ReservationsView },
  { path: "/schedule", name: "schedule", component: ScheduleView },
  { path: "/wishlist", name: "wishlist", component: WishlistView },
  {
    path: "/notifications",
    name: "notifications",
    component: NotificationsView,
  },
  { path: "/cscenter", name: "cscenter", component: CScenterView },
  { path: "/board/:id", name: "boardDetail", component: BoardDetailView },
  { path: "/payment", name: "payment", component: PaymentView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
