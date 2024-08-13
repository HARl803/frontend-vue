<template>
  <div class="container mt-4">
    <div class="card shadow-sm">
      <div class="card-header bg-primary text-white">
        <h3 class="mb-0">{{ part.name }}</h3>
      </div>
      <div class="card-body">
        <div class="text-center mb-4">
          <img
            :src="part.image"
            alt="부품 이미지"
            class="img-fluid"
            style="max-width: 200px"
          />
        </div>
        <table class="table table-striped table-bordered">
          <tbody>
            <tr v-for="(value, key) in part" :key="key">
              <th class="text-nowrap" style="color: aliceblue">{{ key }}</th>
              <td style="color: aliceblue">
                <!-- 값이 여러개인 경우, 콤마로 구분해서 출력 -->
                <span v-if="typeof value === 'object'">
                  {{ Object.values(value).join(', ') }}
                </span>
                <span v-else>
                  {{ value }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-center">
          <button class="btn btn-primary" @click="goBack">뒤로 가기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import partsData from "@/assets/dummy.json";

export default {
  name: "PartsDetailView",
  data() {
    return {
      part: {},
    };
  },
  created() {
    const partId = this.$route.params.id;
    this.part = this.findPartById(partId);
  },
  methods: {
    findPartById(id) {
      for (const category in partsData) {
        if (partsData[category][id]) {
          return { 
            ...partsData[category][id], 
            id,
            image: "https://via.placeholder.com/150", // 기본 이미지 링크 추가
          };
        }
      }
      return {};
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 8px;
  background-color: #ffffff99; /* 카드의 배경색을 하얀색으로 변경 */
}

.card-header {
  border-bottom: 2px solid #dee2e6;
}

.bg-primary {
  --bs-bg-opacity: 1;
  background-color: #fff !important; /* 배경색을 하얀색으로 변경 */
}

.table {
  background-color: #333; /* 테이블 배경색을 어두운 색으로 변경 */
  color: #fff; /* 글자 색을 하얀색으로 변경 */
}

.table th,
.table td {
  vertical-align: middle;
}

.table th {
  background-color: #444; /* 헤더의 배경색을 조금 더 밝은 색으로 변경 */
}

.table td {
  background-color: #333; /* 데이터 셀의 배경색을 어두운 색으로 유지 */
}

.img-fluid {
  max-width: 100%;
  height: auto;
}

.btn-primary {
  background-color: #333;
  border-color: #333;
}
</style>
