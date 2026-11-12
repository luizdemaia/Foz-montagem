const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || 'https://fox-montagem-moveis.vercel.app').replace(/\/$/, '')
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15', experimental: { payloadExtraction: false }, devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  runtimeConfig: { public: { siteUrl } },
  app: { head: { htmlAttrs: { lang: 'pt-BR' }, title: 'FOX | Montagem de móveis planejados em Blumenau', meta: [{ name: 'theme-color', content: '#10110e' }], link: [{ rel: 'icon', type: 'image/webp', href: '/media/logo.webp' }] } },
  nitro: { prerender: { routes: ['/'] } },
  hooks: { 'nitro:config'(config) { config.prerender ||= {}; config.prerender.routes ||= [] } }
})
