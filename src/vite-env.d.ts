/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MSW_ENABLED?: boolean
  readonly VITE_BACKEND_URL: string
  readonly VITE_YOUTUBE_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
