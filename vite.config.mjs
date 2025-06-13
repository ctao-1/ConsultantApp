import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3000', // 你后端服务运行在哪
  //       changeOrigin: true,
  //       rewrite: path => path.replace(/^\/api/, '')
  //     }
  //   }
  // },
  plugins: [
    vue(),
    UnoCSS(),
  ],
  // 为小程序配置，可能需要调整 base 和 build.outDir
  // base: './', 
  // build: {
  //   outDir: 'dist/mp-weixin', // 举例：微信小程序
  //   minify: 'terser',
  //   terserOptions: {
  //     compress: {
  //       drop_console: true, // 生产环境移除 console
  //     },
  //   },
  // },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  //服务地址
  // server:{
  //   port:5175,//自定义端口号
  //   allowedHosts: ["df3a-240e-400-6e28-11a2-156f-6c25-309a-26bf.ngrok-free.app" +
  //   ""]
  // },
}) 