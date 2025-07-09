// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: false,
  modules: ['@wagmi/vue/nuxt'],
  runtimeConfig: {
    public: {
      projectId: 'cfa4eb2b3ecc4d91b3a43cfd19c91fda'
    }
  }
})