import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
    proxy: {
      '/dev-api': {
        target: 'https://vue.ruoyi.vip/prod-api', //目标源，目标服务器，真实请求地址
        changeOrigin: true, //支持跨域
        ws: false, //如果要代理 websockets，配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数
        rewrite: (path) => path.replace(/^\/dev-api/, '') //重写真实路径,替换/api
      }
    }
  }
})
