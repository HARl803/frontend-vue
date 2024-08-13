<template>
  <div class="container mt-4">
    <div class="header">
      <h5>내 PC 관리</h5>
      <button class="btn btn-primary btn-sm" @click="addPC" :disabled="pcs.length >= 5">추가</button>
    </div>
    <div class="pc-list mt-4">
      <div v-for="(pc, index) in pcs" :key="index" class="card mb-3">
        <div class="card-header d-flex justify-content-between align-items-center">
          <span class="d-flex align-items-center">
            <img :src="pc.image" class="img-fluid me-2" alt="PC 이미지" style="width: 50px; height: 50px;"/>
            <div v-if="pc.editing">
              <input v-model="pc.name" @blur="saveName(pc, index)" @keyup.enter="saveName(pc, index)" class="form-control" style="width: auto;" />
            </div>
            <div v-else>
              {{ pc.name }}
              <i class="bi bi-pencil-square ms-2" @click="editName(pc)" role="button"></i>
            </div>
          </span>
          <div>
            <button class="btn btn-secondary btn-sm me-2" @click="editPC(index)">편집</button>
            <button class="btn btn-danger btn-sm" @click="confirmRemovePC(index)">삭제</button>
          </div>
        </div>
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" :id="'heading' + index">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + index" aria-expanded="false" :aria-controls="'collapse' + index">
                상세 정보
              </button>
            </h2>
            <div :id="'collapse' + index" class="accordion-collapse collapse" :aria-labelledby="'heading' + index" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <table class="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th>부품명</th>
                      <th>상세 설명</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(value, key) in pc" :key="key" v-if="key !== 'name' && key !== 'image' && key !== 'editing'">
                      <td>{{ key }}</td>
                      <td>{{ value }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { usePcStore } from '@/stores/pcStore';
import { useRouter } from 'vue-router';

export default {
  name: 'MyPCView',
  setup() {
    const pcStore = usePcStore();
    const pcs = computed(() => pcStore.pcList);
    const router = useRouter();

    const addPC = () => {
      const newPC = {
        id: Date.now(),
        computerName: "새 PC",
        image: "https://via.placeholder.com/150",
        editing: false,
        ...Object.keys(pcStore.pcList[0]).reduce((acc, key) => {
          acc[key] = null;
          return acc;
        }, {}),
      };
      pcStore.pcList.push(newPC);
    };

    const removePC = async (pcId) => {
      if (confirm("정말로 이 PC를 삭제하시겠습니까?")) {
        await pcStore.removePC(pcId);
      }
    };

    const editPC = (index) => {
      pcStore.currentPCIndex = index;
      router.push({ name: 'partsSearch', params: { pcIndex: index } });
    };

    const editPCName = (pc) => {
      pc.editing = true;
    };

    const saveName = (pc, index) => {
      pc.editing = false;
      pcStore.updatePC(index, pc);
    };

    return {
      pcs,
      addPC,
      removePC,
      editPC,
      editPCName,
      saveName,
    };
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #343a40;
  color: white;
  padding: 20px;
  border-radius: 10px;
}
.pc-list .card {
  background-color: #212121;
  color: white;
}
.card-header {
  background-color: #343a40;
}
.accordion-button::after {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7' /%3E%3C/svg%3E");
}
.btn-primary {
  background-color: #007bff;
}
.bi-pencil-square {
  cursor: pointer;
}
</style>
