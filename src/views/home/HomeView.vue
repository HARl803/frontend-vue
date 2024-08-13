<template>
  <div class="d-flex flex-column min-vh-100">
    <div class="container mt-4 mb-4 flex-grow-1">
      <!-- 1. 컴터챗 광고 배너 부분 -->
      <div class="row mb-5">
        <div class="col">
          <div class="card bg-dark text-white ad-banner">
            <div class="card-body">
              <h5 class="card-title" style="font-weight: bold;">컴터챗 안에서 자유롭게 원격 수리 멘토링을 받을 수 있어요 !</h5>
              <p class="card-text">조립 컴퓨터의 궁금한 정보들 직접 얻는 1:1 음성대화, 컴터챗 어때요?</p>
              <div class="button-container">
                <router-link to="/community" class="btn btn-primary">멘토 알아보기</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 2. 신규 멘토 섹션 -->
      <div class="row mb-5"> 
        <div class="col">
          <h5 style="font-weight: bold;">신규 등록한 멘토님이에요!</h5>
          <div class="d-flex justify-content-center flex-wrap">
            <div v-for="mentor in mentors" :key="mentor.id" class="card m-4 position-relative" style="width: 18rem;">
              <div class="card-header" style="background-color: #D83F78; color: white; font-style: normal !important;">신규 멘토님이에요!</div>
              <div class="image-container">
                <img :src="mentor.image" class="card-img-top" alt="멘토 이미지">
              </div>
              <div class="card-body">
                <h5 class="card-title" style="font-weight: bold;">{{ mentor.name }}</h5>
                <p class="card-text" style="color: #5e67eb; font-weight: bold;">응답시간: {{ mentor.responseTime }} | 만족률: {{ mentor.matchingRate }}%</p>
                <p class="card-text">모든 부품 멘탈잡아보세요! 전화하기 열일하는덕후!!!</p>
                <div class="button-group">
                  <button class="btn btn-outline-primary btn-sm custom-button">SSD 장착</button>
                  <button class="btn btn-outline-primary btn-sm custom-button">백업/복구</button>
                  <button class="btn btn-outline-primary btn-sm custom-button">BIOS 설정</button>
                  <button class="btn btn-outline-primary btn-sm custom-button">하드웨어 진단</button>
                </div>
                <i :class="bookmarkStore.isMentorBookmarked(mentor.id) ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'"
                  class="position-absolute top-0 end-0 m-2 bookmark-icon"
                  role="button"
                  @click="bookmarkItem(mentor, 'mentor')"></i>
              </div>
              <div class="card-footer text-center">
                <a href="#" class="btn btn-dark btn-sm detail-button w-100">상세보기</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 3. 인기 부품 섹션 -->
      <div class="row mb-5">
        <div class="col">
          <h5 style="font-weight: bold;">지금 많이 검색되고 있는 부품은? TOP 3</h5>
          <div class="d-flex justify-content-center flex-wrap">
            <div v-for="part in topParts" :key="part.id" class="card m-4 position-relative" style="width: 18rem;">
              <div class="card-header bg-success text-white">인기 부품이에요 !</div>
              <img :src="part.image" class="card-img-top" alt="부품 이미지">
              <div class="card-body">
                <h5 class="card-title" style="font-weight: bold;">{{ part.name }}</h5>
                <div class="button-group mb-3">
                  <button class="btn btn-outline-primary btn-sm custom-button">{{ part.socketType }}</button>
                  <button class="btn btn-outline-primary btn-sm custom-button">{{ part.coreCount }} cores</button>
                  <button class="btn btn-outline-primary btn-sm custom-button">{{ part.threadCount }} threads</button>
                  <button class="btn btn-outline-primary btn-sm custom-button">{{ part.baseClock }}GHz</button>
                </div>
                <i :class="bookmarkStore.isPartBookmarked(part.id) ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'"
                   class="position-absolute top-0 end-0 m-2 bookmark-icon"
                   role="button"
                   @click="bookmarkItem(part, 'part')"></i>
                <router-link :to="{ name: 'partDetail', params: { id: part.id } }" class="btn btn-dark btn-sm detail-button w-100">상세보기</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 4. 게시판 -->
      <div class="row mb-4">
        <div class="col-md-6">
          <FreeBoardList />
        </div>
        <div class="col-md-6">
          <HotBoardList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useBookmarkStore } from '@/stores/bookmark';
import FreeBoardList from '@/components/Board/FreeBoardList.vue';
import HotBoardList from '@/components/Board/HotBoardList.vue';
import partsData from '@/assets/dummy.json';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'HomeView',
  components: {
    FreeBoardList,
    HotBoardList,
    Navbar,
  },
  setup() {
    const bookmarkStore = useBookmarkStore();

    const mentors = [
      { id: 1, name: '가브리엘', image: 'https://via.placeholder.com/150', description: '컴퓨터 멘토', responseTime: '30분 이내', matchingRate: 99 },
      { id: 2, name: '미카엘', image: 'https://via.placeholder.com/150', description: '컴퓨터 멘토', responseTime: '1시간 이내', matchingRate: 98 },
      { id: 3, name: '라파엘', image: 'https://via.placeholder.com/150', description: '컴퓨터 멘토', responseTime: '2시간 이내', matchingRate: 95 }
    ];

    const sampleParts = Object.entries(partsData.cpu).slice(0, 3).map(([id, part]) => ({
      id,
      name: `${part.manufacturer} ${part.cpuType}`,
      image: 'https://via.placeholder.com/150',
      socketType: part.socketType,
      coreCount: part.coreCount,
      threadCount: part.threadCount,
      baseClock: part.baseClock
    }));

    const bookmarkItem = (item, type) => {
      if (type === 'mentor') {
        if (bookmarkStore.isMentorBookmarked(item.id)) {
          bookmarkStore.removeMentorBookmark(item.id);
        } else {
          bookmarkStore.addMentorBookmark(item);
        }
      } else if (type === 'part') {
        if (bookmarkStore.isPartBookmarked(item.id)) {
          bookmarkStore.removePartBookmark(item.id);
        } else {
          bookmarkStore.addPartBookmark(item);
        }
      }
    };

    return {
      mentors,
      topParts: sampleParts,
      bookmarkItem,
      bookmarkStore
    };
  }
};
</script>

<style scoped>
.card-deck {
  display: flex;
  gap: 1rem;
}
.card-header {
  font-weight: bold;
}
footer {
  width: 100%;
}
.bi-bookmark, .bi-bookmark-fill {
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  z-index: 1;
}
.bookmark-icon {
  z-index: 1;
}

.ad-banner {
  height: 250px; 
  padding: 20px; 
  position: relative; 
}

.button-container {
  position: absolute;
  bottom: 20px; 
  right: 20px; 
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; 
}

.custom-button {
  background-color: #ebedff; 
  color: #333; 
  border-color: #ebedff; 
}

.custom-button:hover {
  background-color: #0056b3; 
  border-color: #0056b3;
}

.detail-button {
  background-color: #333;
  border-color: #333;
  width: 100%;
  display: block;
  text-align: center;
}

.mb-3 {
  margin-bottom: 1rem !important;
}
</style>
