<template>
  <div class="min-h-screen bg-gray-50 pb-16">
    <!-- 头部区域 -->
    <div class="relative bg-white px-6 pt-8 pb-6 flex flex-col items-center shadow">
      <!-- 右上角图标 -->
      <div class="absolute top-4 right-4 flex gap-4">
        <button class=" bg-white border-none outline-none text-gray-500 hover:text-teal-600 transition-colors">
          <span class="i-carbon-wallet text-1xl mb-1">📞</span>
          <span class="i-carbon-headset text-1xl">客服</span>
        </button>
        <button class=" bg-white border-none outline-none text-gray-500 hover:text-teal-600 transition-colors">
          <span class="i-carbon-shopping-bag text-1xl mb-1">⚙️</span>
          <span class="i-carbon-settings text-1xl">设置</span>
        </button>
      </div>
      <!-- 用户信息 -->
      <img
        class="w-20 h-20 rounded-full border-4 border-teal-200 mb-2 object-cover"
        src="https://placehold.co/80x80/4fc3f7/fff?text=U"
        alt="用户头像"
      />
      <div class="text-lg font-semibold text-gray-800 mt-1">用户名</div>
      <div class="text-sm text-gray-500 mt-0.5">账号：138****8888</div>
    </div>

    <!-- 下方功能区 -->
    <div class="grid grid-cols-0 gap-6 px-8 py-8">
        <div class="flex justify-around gap-8 px-8 py-8">
        <button class="flex flex-col items-center bg-white border-none outline-none text-gray-700 hover:text-teal-600 transition-colors">
            <span class="i-carbon-wallet text-3xl mb-1">💳</span>
            <span class="text-sm">钱包</span>
        </button>
        <button class="flex flex-col items-center bg-white border-none outline-none text-gray-700 hover:text-teal-600 transition-colors">
            <span class="i-carbon-shopping-bag text-3xl mb-1">📃</span>
            <span class="text-sm">订单</span>
        </button>
        </div>
    </div>
  </div>
</template>