import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
// 1. 注册一个叫svg-icon图标全局组件
Vue.component('svg-icon', SvgIcon)
// 2. 批量加载svg图标文件（webpack）
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
