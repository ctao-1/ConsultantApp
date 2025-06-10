<template>
  <div class="consultant-detail-page p-4 md:p-8" v-if="consultant">
    <button @click="goBack" class="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg inline-flex items-center transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
      返回列表
    </button>

    <div class="bg-white shadow-xl rounded-lg overflow-hidden">
      <div class="md:flex">
        <!-- 左侧：头像和基本信息 -->
        <div class="md:w-1/3 p-6 bg-teal-500 text-white flex flex-col items-center justify-center">
          <img :src="consultant.avatar" alt="avatar" class="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md mb-4">
          <h1 class="text-3xl font-bold text-center">{{ consultant.name }}</h1>
          <p class="text-teal-100 text-center text-lg">{{ consultant.title }}</p>
          <span :class="['mt-3 px-3 py-1 rounded-full text-sm font-semibold', consultant.isOnline ? 'bg-white text-teal-600' : 'bg-gray-700 text-gray-200']">
            {{ consultant.isOnline ? '当前在线' : '当前离线' }}
          </span>
        </div>

        <!-- 右侧：详细信息和操作 -->
        <div class="md:w-2/3 p-6 md:p-8">
          <h2 class="text-2xl font-semibold text-gray-700 mb-4">详细信息</h2>
          <div class="space-y-3 text-gray-600">
            <p><strong class="font-medium text-gray-800">擅长领域：</strong> {{ consultant.specialties.join(', ') }}</p>
            <p><strong class="font-medium text-gray-800">咨询经验：</strong> {{ consultant.experience }}</p>
            <p><strong class="font-medium text-gray-800">教育背景：</strong> {{ consultant.education || '暂未提供' }}</p>
            <p><strong class="font-medium text-gray-800">执业证书：</strong> {{ consultant.certification || '暂未提供' }}</p>
            <p><strong class="font-medium text-gray-800">咨询费用：</strong> <span class="text-orange-500 font-bold text-xl">¥{{ consultant.rate }}/小时</span></p>
            <div class="prose prose-sm mt-4 max-w-none">
              <strong class="font-medium text-gray-800">个人简介：</strong>
              <p>{{ consultant.bio || '这位咨询师很低调，暂未填写简介。' }}</p>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-gray-200">
            <h3 class="text-xl font-semibold text-gray-700 mb-3">开始咨询</h3>
            <p class="text-gray-600 mb-4">准备好了吗？点击下方按钮，立即与 {{ consultant.name }} 开始一对一沟通。</p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button 
                @click="startChatting"
                class="w-full sm:w-auto flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
                立即咨询
              </button>
              <button 
                @click="makeAppointment"
                class="w-full sm:w-auto flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
                预约稍后咨询
              </button>
              <!-- 弹窗组件 -->
              <ChatReserve v-if="showReserveModal" :consultant-id="Number(consultant.id)"
                           :consultant-name="consultant.name" @close="showReserveModal = false"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 其他信息，如用户评价、相关文章等 -->
    <div class="mt-8">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">用户评价</h2>
      <div class="bg-white shadow-lg rounded-lg p-6">
        <p class="text-gray-500 italic">暂无用户评价。第一个留下您的反馈吧！</p>
        <!-- 评价列表 -->
      </div>
    </div>

  </div>
  <div v-else-if="loading" class="p-8 text-center text-gray-500">
    正在加载咨询师信息...
  </div>
  <div v-else class="p-8 text-center text-red-500">
    未找到该咨询师的信息。
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ChatReserve from './ChatReserve.vue'

const showReserveModal = ref(false)

const route = useRoute()
const router = useRouter()

const consultantId = computed(() => route.params.id)
const consultant = ref(null)
const loading = ref(true)

// 模拟的咨询师数据，实际应该从store或API获取
const mockConsultantsData = {
  '1': {
    id: '1',
    name: '王老师',
    title: '国家二级心理咨询师',
    avatar: 'https://via.placeholder.com/150/FFC107/000000?Text=User1',
    specialties: ['情绪管理', '青少年心理', '压力疏导'],
    experience: '8年经验',
    rate: '300',
    isOnline: true,
    education: '北京师范大学心理学硕士',
    certification: '国家二级心理咨询师证书编号：XXXXXXXXX',
    bio: '王老师拥有超过8年的专业心理咨询经验，尤其擅长处理青少年在成长过程中遇到的情绪波动、学业压力及人际关系问题。她相信每个人都有自我疗愈的能力，咨询的目标是激发并引导来访者发现自身的力量，共同面对和解决生活中的困扰。'
  },
  '2': {
    id: '2',
    name: '李医生',
    title: '临床心理学博士',
    avatar: 'https://via.placeholder.com/150/4CAF50/FFFFFF?Text=User2',
    specialties: ['婚姻家庭', '职场压力', '焦虑抑郁'],
    experience: '12年经验',
    rate: '500',
    isOnline: false,
    education: 'XX医科大学临床心理学博士',
    certification: '注册临床心理师证书编号：YYYYYYYYY',
    bio: '李医生在心理咨询领域深耕十余年，对婚姻关系调适、家庭冲突解决以及职场人士常见的焦虑、抑郁情绪有深入研究和丰富的干预经验。他的咨询风格温和而富有洞察力，致力于帮助来访者重建积极的家庭互动模式和健康的工作心态。'
  },
  '3': {
    id: '3',
    name: '张顾问',
    title: '认证生涯规划师',
    avatar: 'https://via.placeholder.com/150/2196F3/FFFFFF?Text=User3',
    specialties: ['职业发展', '个人成长', '生涯规划'],
    experience: '6年经验',
    rate: '280',
    isOnline: true,
    education: 'XX大学人力资源管理学士',
    certification: '国际认证生涯发展规划师 (GCDF)',
    bio: '张顾问专注于个人职业发展与生涯规划领域，帮助众多职场人士和学生明确职业方向，提升职场竞争力。她善于运用多种测评工具和咨询技巧，引导来访者探索自身兴趣、价值观与能力，制定个性化的职业发展路径。'
  }
};

onMounted(() => {
  // 模拟API调用获取特定ID的咨询师信息
  loading.value = true;
  setTimeout(() => {
    consultant.value = mockConsultantsData[consultantId.value] || null;
    loading.value = false;
  }, 500);
});

const goBack = () => {
  router.back() // 或者 router.push('/consultants')
}

const startChatting = () => {
  if (!consultant.value) return;
  // 这里可以加入检查用户是否登录的逻辑
  // if (!userStore.isLoggedIn) {
  //   alert('请先登录后再开始咨询。');
  //   router.push('/login'); // 跳转到登录页
  //   return;
  // }
  router.push(`/chat/${consultant.value.id}`);
}

const makeAppointment = () => {
  //alert(`预约 ${consultant.value?.name || ''} 的功能开发中...`);
  // router.push(`/appointment/${consultant.value.id}`);
  if (!consultant.value) return;
  // router.push(`/Reserve/${consultant.value.id}`);
  showReserveModal.value = true
}

</script>

<style scoped>
/* 特定于此页面的样式 */
.prose :where(p):not(:where([class~="not-prose"] *)) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
</style> 