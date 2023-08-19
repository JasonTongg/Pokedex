import {store} from '../store/store'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(store);
})