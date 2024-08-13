<template>
  <div class="container mt-4">
    <div class="header">
      <h5>찜 목록</h5>
      <p>찜한 멘토와 부품 목록을 확인할 수 있습니다.</p>
    </div>
    <ul class="nav nav-tabs mt-4" id="wishlistTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="mentors-tab" data-bs-toggle="tab" data-bs-target="#mentors" type="button" role="tab" aria-controls="mentors" aria-selected="true">멘토</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="parts-tab" data-bs-toggle="tab" data-bs-target="#parts" type="button" role="tab" aria-controls="parts" aria-selected="false">부품</button>
      </li>
    </ul>
    <div class="tab-content mt-4" id="wishlistTabContent">
      <div class="tab-pane fade show active" id="mentors" role="tabpanel" aria-labelledby="mentors-tab">
        <div class="row">
          <div v-for="mentor in mentors" :key="mentor.id" class="col-md-4">
            <div class="card mb-4 position-relative">
              <img :src="mentor.image" class="card-img-top" alt="멘토 이미지">
              <i class="bi bi-bookmark-fill position-absolute top-0 end-0 m-2" role="button" @click="removeBookmark(mentor, 'mentor')"></i>
              <div class="card-body">
                <h5 class="card-title">{{ mentor.name }}</h5>
                <p class="card-text">{{ mentor.description }}</p>
                <p class="card-text">응답시간: {{ mentor.responseTime }} | 매칭률: {{ mentor.matchingRate }}%</p>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-outline-secondary">기술1</button>
                  <button type="button" class="btn btn-outline-secondary">기술2</button>
                  <button type="button" class="btn btn-outline-secondary">기술3</button>
                  <button type="button" class="btn btn-outline-secondary">기술4</button>
                  <button type="button" class="btn btn-outline-secondary">기술5</button>
                </div>
                <a href="#" class="btn btn-primary mt-3">상세보기</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="parts" role="tabpanel" aria-labelledby="parts-tab">
        <div class="row">
          <div v-for="part in parts" :key="part.id" class="col-md-4">
            <div class="card mb-4 position-relative">
              <img :src="part.image" class="card-img-top" alt="부품 이미지">
              <i class="bi bi-bookmark-fill position-absolute top-0 end-0 m-2" role="button" @click="removeBookmark(part, 'part')"></i>
              <div class="card-body">
                <h5 class="card-title">{{ part.name }}</h5>
                <p class="card-text">{{ part.description }}</p>
                <p class="card-text">가격: {{ part.price }}원</p>
                <a href="#" class="btn btn-primary mt-3">상세보기</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useBookmarkStore } from '@/stores/bookmark';
import { computed } from 'vue';

export default {
  name: 'WishlistView',
  setup() {
    const bookmarkStore = useBookmarkStore();

    const mentors = computed(() => bookmarkStore.mentorBookmarks);
    const parts = computed(() => bookmarkStore.partBookmarks);

    const removeBookmark = (item, type) => {
      if (type === 'mentor') {
        bookmarkStore.removeMentorBookmark(item.id);
      } else if (type === 'part') {
        bookmarkStore.removePartBookmark(item.id);
      }
    };

    return {
      mentors,
      parts,
      removeBookmark
    };
  }
};
</script>

<style scoped>
.header {
  background-color: #343a40;
  color: white;
  padding: 20px;
  border-radius: 10px;
}
.nav-tabs .nav-link.active {
  background-color: #007bff;
  color: white;
}
.card {
  background-color: #212121;
  color: white;
}
.card-title {
  font-size: 1.25rem;
}
.card-text {
  font-size: 1rem;
}
.btn-primary {
  background-color: #007bff;
}
.btn-outline-secondary {
  border-color: #6c757d;
  color: #6c757d;
}
.bi-bookmark-fill {
  font-size: 1.5rem;
  color: yellow;
  cursor: pointer;
}
.bi-bookmark {
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
}
</style>
