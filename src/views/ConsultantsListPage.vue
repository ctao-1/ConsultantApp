<template>
  <div class="consultants-list-page p-4">
    <h1 class="text-2xl font-bold mb-6 text-gray-700">咨询师列表</h1>
    
    <BaseCard shadow="lg" rounded="xl" class="mb-6" padding="md"> 
      <template #header>
        <h2 class="text-xl font-semibold text-gray-700">筛选与排序</h2>
      </template>
      <p class="text-gray-600">筛选和排序功能开发中...</p>
      <!-- 示例：
      <div class="flex flex-wrap gap-4 mt-4">
        <div>
          <label for="specialty" class="block text-sm font-medium text-gray-700">专业领域:</label>
          <select id="specialty" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
            <option>全部</option>
            <option>婚姻家庭</option>
            <option>情绪压力</option>
            <option>职业发展</option>
          </select>
        </div>
        <div>
          <label for="sort" class="block text-sm font-medium text-gray-700">排序方式:</label>
          <select id="sort" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
            <option>综合推荐</option>
            <option>好评优先</option>
            <option>价格从低到高</option>
          </select>
        </div>
      </div>
      -->
    </BaseCard>

    <!-- 咨询师卡片列表 -->
    <div class="consultant-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BaseCard 
        v-for="consultant in consultants" 
        :key="consultant.id"
        shadow="lg" 
        rounded="xl" 
        padding="md"
        class="hover:shadow-xl transition-shadow cursor-pointer flex flex-col"
        @click="goToConsultantDetail(consultant.id)"
      >
        <div class="flex items-center mb-4">
          <img :src="consultant.avatar" alt="avatar" class="w-16 h-16 rounded-full mr-4 object-cover border-2 border-gray-100">
          <div>
            <h2 class="text-xl font-semibold text-teal-700">{{ consultant.name }}</h2>
            <p class="text-sm text-gray-500">{{ consultant.title }}</p>
          </div>
        </div>
        <div class="flex-grow">
            <p class="text-gray-600 text-sm mb-1"><span class="font-medium">擅长领域:</span> {{ consultant.specialties.join(', ') }}</p>
            <p class="text-gray-600 text-sm mb-3"><span class="font-medium">咨询经验:</span> {{ consultant.experience }}</p>
        </div>
        <div class="flex justify-between items-center mb-3 mt-3">
          <span class="text-lg font-bold text-orange-500">¥{{ consultant.rate }}/小时</span>
          <span :class="['px-2 py-0.5 rounded-full text-xs font-semibold', consultant.isOnline ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500']">
            {{ consultant.isOnline ? '在线' : '离线' }}
          </span>
        </div>
        <BaseButton 
            label="查看详情"
            variant="primary"
            size="sm"
            block
            class="mt-auto" 
        />
      </BaseCard>
      
      <div v-if="!consultants.length && !loading" class="col-span-full text-center py-10">
          <BaseCard padding="lg" shadow="md" rounded="lg"><p class="text-gray-500">暂无符合条件的咨询师。</p></BaseCard>
      </div>
       <div v-if="loading" class="col-span-full text-center py-10">
          <BaseCard padding="lg" shadow="md" rounded="lg"><p class="text-gray-500">正在加载咨询师...</p></BaseCard>
      </div>
    </div>

    <!-- 分页 -->
    <div class="pagination mt-8 text-center flex justify-center space-x-2">
        <BaseButton label="上一页" variant="outline" size="md" :disabled="true" />
        <BaseButton label="下一页" variant="outline" size="md" />
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import BaseCard from '@/components/BaseCard.vue'

const router = useRouter()
const consultants = ref([])
const loading = ref(true)

// 模拟咨询师数据
const mockConsultants = [
  {
    id: '1',
    name: '王老师',
    title: '国家二级心理咨询师',
    avatar: 'https://via.placeholder.com/150/FFC107/000000?Text=User1',
    specialties: ['情绪管理', '青少年心理'],
    experience: '8年经验',
    rate: '300',
    isOnline: true,
  },
  {
    id: '2',
    name: '李医生',
    title: '临床心理学博士',
    avatar: 'https://via.placeholder.com/150/4CAF50/FFFFFF?Text=User2',
    specialties: ['婚姻家庭', '职场压力'],
    experience: '12年经验',
    rate: '500',
    isOnline: false,
  },
  {
    id: '3',
    name: '张顾问',
    title: '认证生涯规划师',
    avatar: 'https://via.placeholder.com/150/2196F3/FFFFFF?Text=User3',
    specialties: ['职业发展', '个人成长'],
    experience: '6年经验',
    rate: '280',
    isOnline: true,
  },
];

onMounted(() => {
  setTimeout(() => {
    consultants.value = mockConsultants;
    loading.value = false;
  }, 1000);
});

const goToConsultantDetail = (id) => {
  router.push(`/consultant/${id}`)
}
</script>

<style scoped>
/* Specific styles for this page if BaseCard/BaseButton don't cover everything */
</style> 