import { defineConfig, presetAttributify, presetUno, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(), // 默认预设，包含 Tailwind CSS, Windi CSS, Bootstrap 等的核心功能
    presetAttributify(), // 属性化模式支持，例如 <div text-xl text-red></div>
    presetIcons({ // 图标预设
      // options
      collections: {
        // example: 'mdi': () => import('@iconify-json/mdi/icons.json').then(i => i.default)
      },
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  // shortcuts: [
  //   // 你可以在这里自定义快捷方式
  //   // ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
  // ],
  theme: {
    // colors: {
    //   'very-cool': '#0000ff', // class="text-very-cool"
    //   'brand': {
    //     'primary': '#somecolor', // class="bg-brand-primary"
    //   }
    // }
  }
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:5000'
  //   }
  // }
}) 