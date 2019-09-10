var siteInfo = require('./content/setup/info.json');
console.log(siteInfo);
var glob = require('glob');
var path = require('path');

// Enhance Nuxt's generate process by gathering all content files from Netifly CMS
// automatically and match it to the path of your Nuxt routes.
// The Nuxt routes are generate by Nuxt automatically based on the pages folder.
var dynamicRoutes = getDynamicPaths({
  '/blog': 'blog/posts/*.json',
  '/': 'page/posts/*.json',
  '/category': 'categories/posts/*.json',
  '/tagged': 'tags/posts/*.json'
});

export default {
  mode: 'universal',

  pageTransition: { mode: 'in-out' },

  env: {
    API_URL: process.env.API_URL
  },

  head: {
    title: siteInfo.sitename,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: siteInfo.sitedescription
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/main.css'],
  /*
   ** Plugins to load before mounting the App
   */
  // plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/markdownit',
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    // // '@nuxtjs/dotenv',
    // '@nuxtjs/google-analytics',
    // {
    //   id: 'UA-12301-2'
    // }
    // 'nuxt-netlify-cms',
    '@bazzite/nuxt-netlify'
  ],

  markdownit: {
    injected: true,
    preset: 'default',
    breaks: true,
    html: true
  },

  manifest: {
    name: siteInfo.sitename,
    short_name: siteInfo.sitename,
    description: siteInfo.sitedescription,
    lang: 'en'
  },

  workbox: {
    runtimeCaching: [
      {
        urlPattern: '/images/uploads/.*',
        handler: 'cacheFirst',
        strategyOptions: {
          cacheName: 'image-cache',
          cacheExpiration: {
            maxEntries: 100,
            maxAgeSeconds: 86400
          }
        }
      }
    ]
  },

  /*
   ** Route config for pre-rendering
   */
  router: {
    middleware: ['title']
  },

  generate: {
    routes: dynamicRoutes
  },

  plugins: [
    {
      src: '~/plugins/vue-lazyload',
      ssr: false
    }
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};

/**
 * Create an array of URLs from a list of files
 * @param {*} urlFilepathTable
 */
function getDynamicPaths(urlFilepathTable) {
  return [].concat(
    ...Object.keys(urlFilepathTable).map((url) => {
      var filepathGlob = urlFilepathTable[url];
      return glob
        .sync(filepathGlob, { cwd: 'content' })
        .map((filepath) => `${url}/${path.basename(filepath, '.json')}`);
    })
  );
}
