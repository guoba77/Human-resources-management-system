// 根据窗口大小适配菜单
import store from '@/store'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design
// 被混入的组件对象
export default {
  watch: {
    $route (route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount () {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted () {
    console.log('组件渲染完了！')
    const isMobile = this.$_isMobile()
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile () {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler () {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
