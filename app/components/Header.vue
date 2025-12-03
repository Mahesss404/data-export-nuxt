<template>
    <div class="mb-8 ">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-white mb-4">Orders Dashboard</h1>
        <div class="p-4 bg-gray-900 rounded-xl">
            <i class="pi pi-clock mr-2"></i>
            <span>{{ currentTime }}</span>
        </div>
      </div>
      <div class="flex gap-4">
          <NuxtLink to="/"> <Button label="Home" /></NuxtLink>
          <NuxtLink to="/orderManagement"> <Button label=" Order Management" /></NuxtLink>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const currentTime = ref('');

const updateClock = () => {
  currentTime.value = new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
};

onMounted(() => {
  updateClock();
  const timer = setInterval(updateClock, 1000);

  onUnmounted(() => clearInterval(timer));
});
</script>