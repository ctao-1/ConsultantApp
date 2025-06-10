<template>
  <div class="home-page p-4 pb-8 md:pb-12">
    <header class="text-center mb-8 md:mb-12">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-700">心灵驿站</h1>
      <p class="text-gray-500 mt-1 md:text-lg">您身边的心理咨询专家</p>
    </header>

    <!-- 轮播图开始 -->
    <div class="relative w-full max-w-3xl mx-auto mb-8 rounded-xl overflow-hidden shadow-md">
      <img
        :src="carouselImages[currentIndex]"
        class="w-full h-48 md:h-64 object-cover transition-all duration-700"
        alt="banner"
      />
      <!-- 左右切换按钮 -->
      <button
        class="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-90 transition"
        @click="prevImage"
      >
        <span class="i-carbon-chevron-left text-xl"></span>
      </button>
      <button
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-90 transition"
        @click="nextImage"
      >
        <span class="i-carbon-chevron-right text-xl"></span>
      </button>
      <!-- 指示点 -->
      <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        <span
          v-for="(img, idx) in carouselImages"
          :key="idx"
          class="w-2 h-2 rounded-full"
          :class="currentIndex === idx ? 'bg-teal-500' : 'bg-gray-300'"
        ></span>
      </div>
    </div>
    <!-- 轮播图结束 -->

    <main>
      <section class="mb-8 md:mb-12">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-600 mb-4 md:mb-6 text-center">服务特色</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <BaseCard shadow="md" rounded="lg" padding="md" class="service-card flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <div class="flex justify-center items-center">
              <div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-teal-600 icon-animation" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
            </div>
            <h3 class="text-xl font-medium text-teal-600 mb-2">专业咨询师</h3>
            <p class="text-gray-600 text-sm">持证上岗，经验丰富，一对一匿名咨询。</p>
          </BaseCard>
          <BaseCard shadow="md" rounded="lg" padding="md" class="service-card flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <div class="flex justify-center items-center">
              <div class="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-sky-600 icon-animation" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
            </div>
            <h3 class="text-xl font-medium text-sky-600 mb-2">多种咨询方式</h3>
            <p class="text-gray-600 text-sm">文字、语音、视频，选择您最舒适的方式。</p>
          </BaseCard>
          <BaseCard shadow="md" rounded="lg" padding="md" class="service-card flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <div class="flex justify-center items-center">
              <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-amber-600 icon-animation" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
            </div>
            <h3 class="text-xl font-medium text-amber-600 mb-2">严格隐私保护</h3>
            <p class="text-gray-600 text-sm">您的所有信息都将得到最严格的保密。</p>
          </BaseCard>
        </div>
      </section>

      <!-- 热门咨询师 -->
      <section class="mb-8 md:mb-12">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-600 mb-4 md:mb-6 text-center">热门咨询师</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <BaseCard 
            v-for="consultant in featuredConsultants"
            :key="consultant.id"
            shadow="lg" 
            rounded="xl" 
            padding="md"
            class="hover:shadow-xl transition-shadow cursor-pointer flex flex-col"
            @click="goToConsultantDetail(consultant.id)"
          >
            <div class="flex items-center mb-4">
              <img :src="'data:image/jpeg;base64,' + consultant.profile_picture" alt="avatar" class="w-16 h-16 rounded-full mr-4 object-cover border-2 border-gray-100">
              <div>
                <h3 class="text-xl font-semibold text-teal-700">{{ consultant.name }}</h3>
                <p class="text-sm text-gray-500">{{ consultant.title }}</p>
              </div>
            </div>
            <p class="text-gray-600 text-sm mb-1 flex-grow"><span class="font-medium">擅长:</span> {{ consultant.specialties.join(', ') }}</p>
            <div class="flex justify-between items-center mt-3">
              <span class="text-lg font-bold text-orange-500">¥{{ consultant.rate }}/小时</span>
              <span :class="['px-2 py-0.5 rounded-full text-xs font-semibold', consultant.isOnline ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500']">
                {{ consultant.isOnline ? '在线' : '离线' }}
              </span>
            </div>
          </BaseCard>
        </div>
        <div class="text-center mt-6 md:mt-8">
            <BaseButton 
                label="查看全部咨询师 &rarr;"
                variant="outline"
                size="md"
                @click="goToConsultantsList" 
            />
        </div>
      </section>

      <BaseCard shadow="lg" rounded="lg" class="mb-8 md:mb-12 text-center" padding="lg" variant="default">
        <div class="bg-teal-500 text-white p-6 rounded-md">
            <h2 class="text-2xl md:text-3xl font-semibold mb-3">准备好开始了吗？</h2>
            <p class="text-teal-100 mb-6 max-w-xl mx-auto">我们致力于提供一个安全、私密和专业的环境，帮助您探索内心世界，找到解决问题的方法。</p>
            <BaseButton 
            label="立即寻找咨询师"
            variant="primary" 
            size="lg" 
            @click="startConsultation"
            class="bg-blue-100 hover:bg-gray-200 text-teal-600 shadow-md hover:shadow-lg"
            />
        </div>
      </BaseCard>

      <!-- 科普文章入口 -->
      <section>
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-600 mb-4 md:mb-6 text-center">心理科普</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <BaseCard shadow="md" rounded="lg" padding="md" class="article-preview hover:shadow-lg transition-shadow cursor-pointer" @click="goToArticlesPage">
                <h3 class="text-xl font-medium text-sky-700 mb-2">如何应对工作压力？</h3>
                <p class="text-gray-600 text-sm mb-3">了解工作压力的来源，学习有效的应对技巧，保持身心健康...</p>
                <span class="text-sm text-teal-600 hover:underline">阅读更多 &rarr;</span>
            </BaseCard>
            <BaseCard shadow="md" rounded="lg" padding="md" class="article-preview hover:shadow-lg transition-shadow cursor-pointer" @click="goToArticlesPage">
                <h3 class="text-xl font-medium text-sky-700 mb-2">改善睡眠质量的5个技巧</h3>
                <p class="text-gray-600 text-sm mb-3">睡眠对心理健康至关重要。尝试这些简单的方法，拥有更好的睡眠...</p>
                <span class="text-sm text-teal-600 hover:underline">阅读更多 &rarr;</span>
            </BaseCard>
        </div>
         <div class="text-center mt-6 md:mt-8">
            <BaseButton 
                label="查看更多科普文章 &rarr;"
                variant="outline"
                custom-class="border-sky-500 text-sky-600 hover:bg-sky-50"
                size="md"
                @click="goToArticlesPage"
            />
        </div>
      </section>

    </main>

    <footer class="text-center mt-12 md:mt-16 py-6 border-t border-gray-200">
      <p class="text-sm text-gray-500">&copy; {{ new Date().getFullYear() }} 心灵驿站. 保留所有权利.</p>
      <div class="mt-2 space-x-4">
        <BaseButton label="关于我们" variant="link" size="sm" @click="alert('关于我们')"/>
        <BaseButton label="服务条款" variant="link" size="sm" @click="alert('服务条款')"/>
        <BaseButton label="隐私政策" variant="link" size="sm" @click="alert('隐私政策')"/>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import BaseCard from '@/components/BaseCard.vue'

import axios from 'axios'

const router = useRouter()
const consultants = ref([])
const featuredConsultants = ref([])

const carouselImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80'
]
const currentIndex = ref(0)
let timer = null

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % carouselImages.length
}
const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + carouselImages.length) % carouselImages.length
}

// 模拟热门咨询师数据 (可以从咨询师列表页的模拟数据中选取或单独定义)
const mockFeaturedConsultants = [
  {
    id: '1',
    name: '王老师',
    title: '国家二级心理咨询师',
    avatar: "'data:image/jpeg;base64,' + image",
    specialties: ['情绪管理', '青少年心理'],
    rate: '300',
    isOnline: true,
  },
  {
    id: '2',
    name: '李医生',
    title: '临床心理学博士',
    avatar: 'https://via.placeholder.com/150/4CAF50/FFFFFF?Text=User2',
    specialties: ['婚姻家庭', '职场压力'],
    rate: '500',
    isOnline: false,
  },
  {
    id: '3',
    name: '张顾问',
    title: '认证生涯规划师',
    avatar: 'https://via.placeholder.com/150/2196F3/FFFFFF?Text=User3',
    specialties: ['职业发展', '个人成长'],
    rate: '280',
    isOnline: true,
  },
];

onMounted(async () => {
  timer = setInterval(nextImage, 3500)
  // 实际应用中，这里可以从API获取热门咨询师数据
  const res_consult = await axios.get(`http://localhost:3000/api/consultant`)
  consultants.value = res_consult.data
  featuredConsultants.value = consultants.value.slice(0, 3); // 只展示前3位
});
onBeforeUnmount(() => {
  clearInterval(timer)
})

const startConsultation = () => {
  console.log("开始咨询，跳转到咨询师列表...")
  router.push('/consultants')
}

const goToConsultantDetail = (id) => {
  router.push(`/consultant/${id}`)
}

const goToConsultantsList = () => {
    router.push('/consultants');
}

const goToArticlesPage = () => {
    alert('科普文章页面开发中...');
    // router.push('/articles'); // 假设有科普文章列表页
}

</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

.service-card .icon-animation {
    transition: transform 0.3s ease;
}

.service-card:hover .icon-animation {
    transform: scale(1.15);
}
</style> 