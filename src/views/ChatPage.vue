<template>
  <div class="chat-page flex flex-col h-screen p-4">
    <header class="mb-4 pb-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <button @click="goBack" class="text-teal-600 hover:text-teal-700 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          返回
        </button>
        <h1 class="text-xl font-semibold text-gray-700">与 {{ chatTargetName }} 的对话</h1>
        <div class="w-16"></div> <!-- 占位，保持标题居中 -->
      </div>
    </header>

    <!-- 消息显示区域 -->
    <main class="flex-1 overflow-y-auto mb-4 p-4 bg-gray-100 rounded-lg space-y-4">
      <div v-for="message in messages" :key="message.id" 
           :class="['flex', message.sender === 'me' ? 'justify-end' : 'justify-start']">
        <div 
          :class="['max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-xl shadow',
                   message.sender === 'me' ? 'bg-teal-500 text-white' : 'bg-white text-gray-700']">
          <p class="text-sm">{{ message.text }}</p>
          <p :class="['text-xs mt-1', message.sender === 'me' ? 'text-teal-100' : 'text-gray-400']">
            {{ new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
          </p>
        </div>
      </div>
      <div v-if="!messages.length" class="text-center text-gray-400 py-10">
        <p>开始您的对话吧！</p>
        <p class="text-sm">所有消息都将进行加密保护。</p>
      </div>
    </main>

    <!-- 输入区域 -->
    <footer class="pb-4 pt-2 border-t border-gray-200">
      <form @submit.prevent="sendMessage" class="flex items-center space-x-3">
        <input 
          type="text" 
          v-model="newMessage" 
          placeholder="输入消息..." 
          class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
        >
        <button 
          type="submit" 
          class="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
          :disabled="!newMessage.trim()"
        >
          发送
        </button>
        <!-- 更多功能按钮，如发送图片、表情等 -->
         <button type="button" title="更多功能" class="p-3 text-gray-500 hover:text-teal-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
        </button>
      </form>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import axios from 'axios'

const GLM_API_URL = "https://api.siliconflow.cn/v1/chat/completions"
const GLM_API_KEY = "sk-dutoqtmqkqobfctlzfzvfpzdhdtdieyjcfmxlwjnbdseowai"

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const chatTargetId = computed(() => route.params.id) // 咨询师ID或用户ID
const chatTargetName = ref('咨询师X') // 后续可以根据ID获取真实姓名

const messages = ref([])
const newMessage = ref('')

// 模拟加载历史消息和对话对象信息
onMounted(() => {
  if (chatTargetId.value) {
    // 假设 consultantId 为 1 的是王老师
    if (chatTargetId.value === '1') {
        chatTargetName.value = "王老师";
    } else if (chatTargetId.value === '2') {
        chatTargetName.value = "李医生";
    } else if (chatTargetId.value === '3') {
        chatTargetName.value = "张顾问";
    } else {
        chatTargetName.value = `咨询对象 ${chatTargetId.value}`;
    }
  }
  // 模拟一些初始消息
  messages.value = [
    { id: '1', text: '您好，请问有什么可以帮助您的吗？', sender: chatTargetId.value || 'consultant', timestamp: Date.now() - 200000 },
    { id: '2', text: '我最近感到有些焦虑，特别是在工作上。不知道该怎么办。😔', sender: 'me', timestamp: Date.now() - 100000 },
     { id: '3', text: '明白了，工作的焦虑是很常见的。您可以具体说说是什么方面让您感到焦虑吗？比如是任务压力、人际关系还是其他？', sender: chatTargetId.value || 'consultant', timestamp: Date.now() - 50000 },
  ];
  scrollToBottom();
})

const sendMessage = async () => {
  if (!newMessage.value.trim()) return

  // 用户发送的消息加入聊天记录
  const userMessage = {
    id: Date.now().toString(),
    text: newMessage.value,
    sender: 'me',
    timestamp: Date.now(),
  };
  messages.value.push(userMessage)

  const userInput = newMessage.value
  newMessage.value = ''
  scrollToBottom()

  try {
    // 请求硅基流动模型生成回复
    const response = await axios.post(
        GLM_API_URL,
        {
          model: "Qwen/QwQ-32B",  // 具体模型名称
          messages: [
            { role: "system", content: "你是一位专业心理咨询师。" },
            { role: "user", content: userInput }
          ],
          temperature: 0.8
        },
        {
          headers: {
            Authorization: `Bearer ${GLM_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
    )

    // 提取模型回复内容
    const aiText = response.data.choices?.[0]?.message?.content || '（无回复）'

    // 加入 AI 回复到聊天记录
    messages.value.push({
      id: (Date.now() + 1).toString(),
      text: aiText,
      sender: chatTargetId.value || 'consultant',
      timestamp: Date.now(),
    })
    scrollToBottom()

  } catch (error) {
    console.error("AI 请求失败：", error)
    messages.value.push({
      id: (Date.now() + 2).toString(),
      text: "抱歉，AI 回应失败，请稍后再试。",
      sender: chatTargetId.value || 'consultant',
      timestamp: Date.now(),
    })
    scrollToBottom()
  }
}

const scrollToBottom = () => {
  // 确保在DOM更新后执行滚动
  const messageContainer = document.querySelector('main.overflow-y-auto');
  if (messageContainer) {
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
}

const goBack = () => {
  // 通常返回到咨询师列表或会话列表
  router.back()
}

// 确保用户已登录才能进入聊天，如果需要的话
// onMounted(() => {
//   if (!userStore.isLoggedIn) {
//     alert('请先登录再开始咨询。')
//     router.push('/login') // 假设有登录页
//   }
// });
</script>

<style scoped>
/* 使用 Tailwind CSS，大部分样式已通过类名定义 */
/* 如果需要，可以添加额外的自定义样式 */
.chat-page {
  /* 可以设置一个最大宽度，使其在宽屏上更易读 */
  /* max-width: 800px; */
  /* margin: 0 auto; */
}
</style> 