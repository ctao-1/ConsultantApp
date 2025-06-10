<template>
  <div class="profile-page p-4 md:p-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-700">个人中心</h1>

    <BaseCard shadow="xl" rounded="xl" class="user-info-section mb-8" padding="lg">
      <div v-if="userStore.isLoggedIn && userStore.userInfo" class="flex flex-col md:flex-row items-center">
        <img 
          :src="userStore.userInfo.avatar || 'https://via.placeholder.com/150/CCCCCC/FFFFFF?Text=User'" 
          alt="avatar" 
          class="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-teal-500 shadow-md mb-4 md:mb-0 md:mr-8"
        >
        <div class="text-center md:text-left">
          <h2 class="text-2xl md:text-3xl font-semibold text-teal-700">{{ userStore.userInfo.name }}</h2>
          <p class="text-gray-500">{{ userStore.userInfo.email || '未设置邮箱' }}</p>
          <BaseButton 
            label="编辑资料"
            variant="primary"
            size="md" 
            class="mt-4"
            @click="openEditProfileModal" 
          />
        </div>
      </div>
      <div v-else class="text-center py-8">
        <p class="text-gray-600 mb-4">您当前未登录，请先登录查看个人信息。</p>
        <BaseButton label="立即登录" variant="primary" size="lg" @click="goToLogin" />
      </div>
    </BaseCard>

    <section v-if="userStore.isLoggedIn" class="actions-section mb-8">
      <h2 class="text-xl font-semibold text-gray-600 mb-4">常用功能</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <BaseCard 
            v-for="item in menuItems" 
            :key="item.name"
            @click="handleMenuClick(item.action)"
            shadow="md" rounded="lg" padding="md"
            class="action-item hover:shadow-lg transition-shadow cursor-pointer flex items-center"
        >
          <!-- Icon can be added here using a slot or prop in BaseCard if needed -->
          <span class="text-lg text-gray-700">{{ item.name }}</span>
        </BaseCard>
      </div>
    </section>
    
    <section v-if="userStore.isLoggedIn" class="mt-8 flex justify-center md:justify-start">
        <BaseButton 
            label="退出登录"
            variant="danger"
            size="lg"
            @click="handleLogout"
        />
    </section>

    <BaseModal v-model="isEditModalOpen" title="编辑个人资料" size="lg" :persistent="isSavingProfile">
      <form @submit.prevent="saveProfileChanges">
        <BaseInput 
          v-model="editableProfile.name" 
          label="姓名"
          placeholder="请输入您的姓名"
          :error="profileErrors.name"
          class="mb-4"
          wrapper-class="mb-4" 
        />
        <BaseInput 
          v-model="editableProfile.email" 
          label="邮箱"
          type="email"
          placeholder="请输入您的邮箱"
          :error="profileErrors.email"
          wrapper-class="mb-6" 
        />
      </form>
      <template #footer>
        <BaseButton label="取消" variant="outline" @click="closeEditProfileModal" :disabled="isSavingProfile" />
        <BaseButton label="保存更改" variant="primary" @click="saveProfileChanges" :loading="isSavingProfile" />
      </template>
    </BaseModal>

  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import BaseButton from '@/components/BaseButton.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseModal from '@/components/BaseModal.vue'
import BaseInput from '@/components/BaseInput.vue'

const router = useRouter()
const userStore = useUserStore()

const isEditModalOpen = ref(false)
const isSavingProfile = ref(false)
const editableProfile = reactive({
  name: '',
  email: ''
})
const profileErrors = reactive({
    name: '',
    email: ''
})

// Initialize profile data from store or set to defaults
const initializeProfileData = () => {
    if (userStore.isLoggedIn && userStore.userInfo) {
        editableProfile.name = userStore.userInfo.name || ''
        editableProfile.email = userStore.userInfo.email || ''
    } else {
        // Simulate a guest user if not logged in for UI demonstration
        editableProfile.name = '游客用户'
        editableProfile.email = 'visitor@example.com'
        if (!userStore.userInfo) { // Avoid overwriting if store has some partial guest data
             userStore.login({ 
                id: 'guest123', 
                name: '游客用户', 
                email: 'visitor@example.com', 
                avatar: 'https://via.placeholder.com/150/92C7CF/FFFFFF?Text=G' 
            });
        }
    }
}

initializeProfileData(); // Call on setup

const menuItems = ref([
  { name: '我的预约', action: 'myAppointments' },
  { name: '咨询记录', action: 'consultationHistory' },
  { name: '账户设置', action: 'accountSettings' },
  { name: '我的收藏', action: 'myFavorites' },
  { name: '帮助与反馈', action: 'helpFeedback' },
])

const openEditProfileModal = () => {
  // Re-initialize with current store data when opening modal
  if (userStore.isLoggedIn && userStore.userInfo) {
    editableProfile.name = userStore.userInfo.name || ''
    editableProfile.email = userStore.userInfo.email || ''
  }
  profileErrors.name = ''
  profileErrors.email = ''
  isEditModalOpen.value = true
}

const closeEditProfileModal = () => {
  if (isSavingProfile.value) return; // Prevent closing while saving
  isEditModalOpen.value = false
}

const validateProfile = () => {
    let isValid = true;
    profileErrors.name = ''
    profileErrors.email = ''
    if (!editableProfile.name.trim()) {
        profileErrors.name = '姓名不能为空';
        isValid = false;
    }
    if (!editableProfile.email.trim()) {
        profileErrors.email = '邮箱不能为空';
        isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(editableProfile.email)) {
        profileErrors.email = '请输入有效的邮箱地址';
        isValid = false;
    }
    return isValid;
}

const saveProfileChanges = async () => {
  if (!validateProfile()) return;
  isSavingProfile.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (userStore.isLoggedIn && userStore.userInfo) {
        userStore.login({ // This action should ideally support partial updates or be named updateUser
            ...userStore.userInfo,
            name: editableProfile.name,
            email: editableProfile.email
        });
    }
    alert('个人资料已更新！');
    closeEditProfileModal();
  } catch (error) {
    console.error("Error saving profile:", error);
    alert('资料更新失败，请稍后再试。');
  } finally {
    isSavingProfile.value = false;
  }
}

const goToLogin = () => {
  // In a real app, you might want to clear the guest user data if any was set
  // userStore.logout(); 
  alert('跳转到登录页... (登录页尚未创建)')
  // router.push('/login')
}

const handleMenuClick = (action) => {
  alert(`功能 "${action}" 开发中...`)
}

const handleLogout = () => {
  userStore.logout()
  alert('已退出登录')
  router.push('/')
}

watch(() => userStore.userInfo, (newUserInfo) => {
    if (newUserInfo && !isEditModalOpen.value) {
        editableProfile.name = newUserInfo.name || ''
        editableProfile.email = newUserInfo.email || ''
    }
     if (!newUserInfo && !isEditModalOpen.value) { // Handle logout while not editing
        initializeProfileData(); // Reset to guest or empty if that's the desired state
    }
}, { deep: true })

</script>

<style scoped>
.action-item:hover .text-gray-700 {
  color: #0D9488; /* UnoCSS teal-600 */
}
</style> 