export default {
  env: {
    BASE_URL: process.env.BASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    secure: {
      name: 'dev_admin',
      pwd: 'YQ54T896GJSG!47'
    }
  },
  ssr: false,
  globals: {
    id: '__dirilis-client', // replacing __nuxt
    context: '__NEBULA__', // replacing __NUXT__,
    nuxt: 'dirilis__group'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Nebula',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Nebula GTS'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name'
      },
      { property: 'og:image', content: 'https://nebulagts.io/images/nebula-insta.jpg' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', href: 'https://fonts.cdnfonts.com/css/euclid-circular-a' },
      { href: 'https://unpkg.com/maplibre-gl@1.14.0/dist/maplibre-gl.css', rel: 'stylesheet' },
      { hid: 'shortcut-icon', rel: 'shortcut icon', href: 'https://nebulagts.io/images/nebula-insta.jpg' },
      { hid: 'apple-touch-icon', rel: 'apple-touch-icon', sizes: '512x512', href: 'https://nebulagts.io/images/nebula-insta.jpg' }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/js/all.min.js', async: true }
    ]
  },
  auth: {
    strategies: {
      oauth2: {
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://tms-backend.auth.us-east-1.amazoncognito.com/login',
          token: 'https://tms-backend.auth.us-east-1.amazoncognito.com/oauth2/token'
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 1800
        },
        codeChallengeMethod: 'S256',
        responseType: 'code',
        redirectUri: 'https://nebulagts.io',
        clientId: '2dg7vbu87na4putabr3dcbruo0',
        scope: 'TMSBackendResourceServer/*',
        grantType: 'authorization_code'
      }
    }
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css'
  ],
  image: {
    staticFilename: '[publicPath]/images/[name]-[hash][ext]',
    dir: 'static',
    domains: ['https://nebulagts.io', 'https://nebulagts.com']
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios.ts',
    '@/plugins/vee-validate.js',
    { src: '~plugins/outsideClick.js', mode: 'client' },
    { src: '~/plugins/cognito.js' },
    { src: '~/plugins/vueKinderGarten.js' },
    '@/plugins/globalComponents.js'
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: [
  //   {
  //     path: '~/components'
  //   }
  // ],
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    'nuxt-compress',
    '@nuxt/image'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxt/image',
    [
      'nuxt-compress',
      {
        gzip: {
          threshold: 8192
        },
        brotli: {
          threshold: 8192
        }
      }
    ]
  ],
  tailwindcss: {
    mode: 'jit',
    jit: true,
    exposeConfig: true
  },
  axios: {
    // prefix: '/api/',
    proxy: true,
    progress: true,
    proxyHeaders: false,
    credentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  },
  proxy: {
    BASE_URL: {
      target: process.env.BASE_URL,
      headers: {
        origin: 'nebulagts.io'
      },
      pathRewrite: { '^/https://tranquil-everglades-96249-a8ea8630be21.herokuapp.com/api/v1/': '' },
      changeOrigin: true
    }
  },
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL

  },
  router: {
    linkActiveClass: 'link-active',
    linkExactActiveClass: 'exact-link-active',
    base: '/',
    extendRoutes (routes, resolve) {
      routes.push({
        path: '/',
        component: resolve(__dirname, 'pages/landing-page/index.vue')
      })
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
    publicPath: 'nebula',
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    }
  }
}
