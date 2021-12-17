import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

// create an axios instance
// 1. 通过axios.create工厂函数创建请求实例
const service = axios.create({
  // 后台请求地址（根据环境变量动态配置）
  /**
   * 动态获取后台请求地址：
   * 1. 开发环境读取.env.development文件中VUE_APP_BASE_API的请求地址
   * 2. 生产环境读取.env.production文件中VUE_APP_BASE_API的请求地址
   */
  baseURL: process.env.VUE_APP_BASE_API // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})

// request interceptor
// 请求拦截器=》发请求之前执行（请求没有发出）
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // 作用：统一添加token
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
// 响应拦截器=》请求响应了（页面还没有拿到数据）
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // console.log('后台返回数据：', response)
    // 正常：状态码200进入
    // success:true请求成功|false请求失败  data:后台返回的数据  message:后台返回的消息提示
    const { success, data, message } = response.data
    // 说明：返回之后，页面才能获取res数据
    // 作用：简化返回给页面的数据
    if (success) {
      // 请求成功
      return data
    } else {
      // 请求失败
      // 提示
      Message({
        message: message,
        type: 'error',
        duration: 3 * 1000
      })
      // 抛出一个promise错误
      return Promise.reject(new Error(message))
    }
  },
  error => {
    // 出错：状态码400 500进入
    // error 对象 =》只能通过console.dir
    console.dir(error) // for debug
    // 需求：判断请求401了(未登录或token失效)，跳转回登录页
    if (error.response.status === 401) {
      // 处理某些页面多个请求多次401重复跳转问题，造成重新登录后不能正确跳转到上次访问页面问题
      if (router.currentRoute.path === '/login') return
      Message({
        message: error.response.data.message,
        type: 'error',
        duration: 3 * 1000
      })
      // 清除token和登录人信息
      store.dispatch('user/logoutAction')
      // 说明：跳转的时候携带当前出现401页面的地址参数，目的是下次登录成功后跳回上次访问页面
      // router.currentRoute.path 获取当前页面的地址
      router.replace(`/login?redirect=${router.currentRoute.path}`)
    }

    return Promise.reject(error)
  }
)

export default service
