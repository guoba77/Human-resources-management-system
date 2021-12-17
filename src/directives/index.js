/**
 * 定义全局公共指令（多个）
 */
// 作用：处理图片加载失败，如果失败显示一个默认图片
export const imgerr = {
  /**
   *
   * @param {*} el 当前绑定指令的元素DOM对象=》img元素的dom对象
   * @param {*} opt 获取指令绑定的变量值
   */
  inserted (el, opt) {
    // 类似window.onload=()=>{}
    el.onerror = () => {
      // 注册图片加载失败事件=》加载失败就会执行这个回调函数
      el.src = opt.value
    }
  }
}

export const fb = {
  /**
   *
   * @param {*} el 当前绑定指令的DOM对象
   * @param {*} opt 获取指令绑定的变量值
   */
  inserted (el, opt) {
    // console.log(el, opt)
    el.style.border = `2px solid ${opt.value || 'red'}`
  }
}

