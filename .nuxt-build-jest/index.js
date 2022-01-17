import Vue from 'vue'

import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'

/* Plugins */
/* eslint-disable camelcase */
import nuxt_plugin_plugin_2ea4e4b6 from 'nuxt_plugin_plugin_2ea4e4b6' // Source: .\\components\\plugin.js (mode: 'all')
import nuxt_plugin_vuesocialsharingplugin_428c0e52 from 'nuxt_plugin_vuesocialsharingplugin_428c0e52' // Source: .\\vue-social-sharing-plugin.js (mode: 'all')
import nuxt_plugin_cookieuniversalnuxt_069a0781 from 'nuxt_plugin_cookieuniversalnuxt_069a0781' // Source: .\\cookie-universal-nuxt.js (mode: 'all')
import nuxt_plugin_axios_693539d9 from 'nuxt_plugin_axios_693539d9' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_vueawesomeswiper_4c7fbf9a from 'nuxt_plugin_vueawesomeswiper_4c7fbf9a' // Source: ..\\plugins\\vue-awesome-swiper.js (mode: 'client')
import nuxt_plugin_vuetouch_b2d0d29a from 'nuxt_plugin_vuetouch_b2d0d29a' // Source: ..\\plugins\\vue-touch.js (mode: 'client')

/* eslint-enable camelcase */

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root.$options.$nuxt
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    router,
    nuxt: {
      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution
  /* eslint-disable camelcase */

  if (typeof nuxt_plugin_plugin_2ea4e4b6 === 'function') {
    await nuxt_plugin_plugin_2ea4e4b6(app.context, inject)
  }

  if (typeof nuxt_plugin_vuesocialsharingplugin_428c0e52 === 'function') {
    await nuxt_plugin_vuesocialsharingplugin_428c0e52(app.context, inject)
  }

  if (typeof nuxt_plugin_cookieuniversalnuxt_069a0781 === 'function') {
    await nuxt_plugin_cookieuniversalnuxt_069a0781(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_693539d9 === 'function') {
    await nuxt_plugin_axios_693539d9(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueawesomeswiper_4c7fbf9a === 'function') {
    await nuxt_plugin_vueawesomeswiper_4c7fbf9a(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuetouch_b2d0d29a === 'function') {
    await nuxt_plugin_vuetouch_b2d0d29a(app.context, inject)
  }

  /* eslint-enable camelcase */
  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    // Ignore 404s rather than blindly replacing URL in browser
    if (process.client) {
      const { route } = router.resolve(app.context.route.fullPath)
      if (!route.matched.length) {
        return resolve()
      }
    }
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    app,
    router
  }
}

export { createApp, NuxtError }
