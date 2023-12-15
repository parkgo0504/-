import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 원하는 주소로 변경
    port: 3000 // 원하는 포트 번호로 변경
  }
})
