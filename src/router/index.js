import Vue from 'vue'
import Router from 'vue-router'
import ContactPage from '@/components/ContactPage'
import SyncPage from '@/components/SyncPage'
import SettingsPage from '@/components/SettingsPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'form',
      component: ContactPage
    }, {
      path: '/sync',
      name: 'sync',
      component: SyncPage
    }, {
      path: '/settings',
      name: 'settings',
      component: SettingsPage
    }
  ],
})
