<template>
    <div class="min-h-screen pb-16">
    <!-- 页面内容 -->
    <div class="content">
      <router-view />
    </div>
    <!-- 底部导航栏 -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-14 z-50">
      <button
        class="flex flex-col items-center justify-center flex-1 py-1 bg-white border-none outline-none text-gray-500 hover:text-teal-600 transition-colors"
        @click="$router.push('/home')"
      >
        <span class="i-carbon-home text-2xl mb-0.5">🏠</span>
        <span class="text-xs">首页</span>
      </button>
      <button
        class="flex flex-col items-center justify-center flex-1 py-1 bg-white border-none outline-none text-gray-500 hover:text-teal-600 transition-colors"
        @click="$router.push('/messages')"
      >
        <span class="i-carbon-chat text-2xl mb-0.5">💬</span>
        <span class="text-xs">消息</span>
      </button>
      <button
        class="flex flex-col items-center justify-center flex-1 py-1 bg-white border-none outline-none text-gray-500 hover:text-teal-600 transition-colors"
        @click="$router.push('/mine')"
      >
        <span class="i-carbon-user text-2xl mb-0.5">👤</span>
        <span class="text-xs">我的</span>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router';

    const router = useRouter();
    router.push('/home'); //
</script>
