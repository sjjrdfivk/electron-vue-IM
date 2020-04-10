import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/components/login').default
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: require('@/components/SignUp/index.vue').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
