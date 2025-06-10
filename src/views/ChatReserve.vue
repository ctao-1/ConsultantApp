<script setup>
import { ref} from 'vue'
import axios from 'axios'
// import dayjs from 'dayjs'

const props = defineProps({
  consultantId: Number,
  consultantName: String
})
const emit = defineEmits(['close'])

const date = ref('')
const startTime = ref('')
const endTime = ref('')

const loading = ref(false)
const error = ref('')
const success = ref('')

const submitReservation = async () => {
  if (!date.value || !startTime.value || !endTime.value) {
    error.value = '请选择完整的日期和时间段'
    return
  }

  loading.value = true
  error.value = ''
  success.value = ''

  try {
    const reserveTime = `${date.value} ${startTime.value}-${endTime.value}`

      await axios.post('http://localhost:3000/api/reserve', {
        user_name: 'admin',
        consultant_id: props.consultantId,
        reserve_date: reserveTime
      })
      success.value = '预约成功！'
      setTimeout(() => emit('close'), 1000)


  } catch (err) {
    error.value = '预约失败，请稍后重试'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">预约 {{ consultantName }} 的咨询</h2>

      <div class="space-y-3">
        <label class="block">
          <span class="text-sm text-gray-700">选择日期</span>
          <input type="date" v-model="date" class="w-full mt-1 p-2 border rounded-lg">
        </label>

        <label class="block">
          <span class="text-sm text-gray-700">开始时间</span>
          <input type="time" v-model="startTime" class="w-full mt-1 p-2 border rounded-lg">
        </label>

        <label class="block">
          <span class="text-sm text-gray-700">结束时间</span>
          <input type="time" v-model="endTime" class="w-full mt-1 p-2 border rounded-lg">
        </label>

        <div class="text-sm text-red-500" v-if="error">{{ error }}</div>
        <div class="text-sm text-green-600" v-if="success">{{ success }}</div>
      </div>

      <div class="mt-4 flex justify-end space-x-2">
        <button @click="$emit('close')" class="px-4 py-2 bg-gray-200 rounded-lg">取消</button>
        <button @click="submitReservation" :disabled="loading"
                class="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg">
          {{ loading ? '提交中...' : '确认预约' }}
        </button>
      </div>
    </div>
  </div>
</template>
