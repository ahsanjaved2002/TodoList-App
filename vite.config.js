import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {       // ye wali lines baad ma add ki ha yt video dekh k, ye mobile pe preview krne k liye hain
    host: "0.0.0.0",
    fs: {
      strict: false,
    },
  },
  plugins: [react(), tailwindcss(),
  ],
})
