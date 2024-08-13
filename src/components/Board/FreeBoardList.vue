<template>
  <div>
    <h5 style="font-weight: bold;">자유게시판 <a href="#" class="custom-more-link">더보기</a></h5>
    <table class="table table-borderless table-hover custom-table">
      <thead class="custom-thead">
        <tr>
          <th scope="col">작성시간</th>
          <th scope="col">제목</th>
          <th scope="col">작성자</th>
          <th scope="col">조회수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.time }}</td>
          <td><router-link :to="{ name: 'boardDetail', params: { id: post.id } }" class="custom-link">{{ post.title }}</router-link></td>
          <td>{{ post.author }}</td>
          <td>{{ post.views }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'FreeBoardList',
  data() {
    return {
      posts: [
        { id: 1, time: '08:57:59', title: '전적 부탁해요 :)', author: '세로', views: 0 },
        { id: 2, time: '03:47:44', title: '힘드네요 인생이', author: '너모', views: 1576 },
        { id: 3, time: '23:11:47', title: '착한 멘토님 구해요', author: '동그리미', views: 7 },
        { id: 4, time: '23:11:47', title: '여기 멘토요!', author: '동그리미', views: 7 },
        { id: 5, time: '12:45:23', title: '컴퓨터가 이상해요', author: '피터팬', views: 123 },
      ],
    };
  },
};
</script>

<style scoped>
.custom-table {
  background-color: #333 !important;
  color: #fff !important;
}

.custom-table th,
.custom-table td {
  background-color: #333 !important;
  color: #fff !important;
}

.custom-table tbody tr:hover {
  background-color: #444 !important;
}

.custom-thead {
  border-bottom: 2px solid orange;
}

.custom-link {
  color: #fff !important;
  text-decoration: none;
}

.custom-link:hover {
  color: #ddd !important;
}

.custom-more-link {
  color: #fff !important;
  font-size: 0.8rem; /* 글씨 크기를 더 작게 조정 */
}

.custom-more-link:hover {
  color: #ddd !important;
}
</style>
