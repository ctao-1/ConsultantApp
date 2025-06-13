import { defineStore } from 'pinia'

//创建 Store：user
export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,//用户未登录
    userInfo: null, // { id, name, avatar, ... }
  }),
  getters: {
    userName: (state) => state.userInfo?.name || '游客',// userInfo 为 null时返回 '游客'
  },
  actions: {
    login(userData) {
      this.isLoggedIn = true//Pinia 允许直接修改 state
      this.userInfo = userData// 假设 userData 是一个包含用户信息的对象
      // 通常这里还会调用API，并将token等信息存储到localStorage或cookie
      console.log('用户已登录:', userData)
    },
    logout() {
      this.isLoggedIn = false
      this.userInfo = null
      // 清理存储的token等
      console.log('用户已登出')
    },
    // 模拟从后端获取用户信息
    async fetchUserProfile() {
      if (!this.isLoggedIn) return
      // 假设这是API调用
      // const response = await fetch('/api/user/profile')
      // const data = await response.json()
      // this.userInfo = { ...this.userInfo, ...data }
      console.log('获取用户配置...')
    }
  },
}) 