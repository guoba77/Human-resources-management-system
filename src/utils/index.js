/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 *
 * @param {*} list 部门数据列表（没有父子关系，也就是不是树形结构）
 * list数据的规律：
 * 1. 公司的pid值：'-1'
 * 2. 公司下顶级部门pid值：''
 * 3. 子部门pid值：父部门id值（纽带关系）=》重点
 */
export function tranformTreeData (list) {
  // console.log('被转换的数据：', list)
  /**
   * 思路：
   * 1. 准备空数组，存储转换后数据
   * 2. 生成一个map映射关系
   * 3. 循环list根据map关系查找父部门
   * 4. 返回转换后的数据
   */
  const treeData = []
  // 开始转换
  const map = {}
  list.forEach(item => {
    map[item.id] = item
  })
  // 部门数据映射关系
  console.log('部门数据映射关系:', map)
  list.forEach(item => {
    // 排除公司
    if (item.pid === '-1') return
    // 找父
    const parent = map[item.pid]
    /**
     * 根据map对象找父部门：
     * 1. item.pid如果是空（''）或-1: 没有父
     * 2. item.pid是父部门的id值：有父
     */
    if (parent) {
      if (!parent.children) {
        // 第一次的时候，给父部门初始化children=》存储子部门
        parent.children = []
      }
      parent.children.push(item)
    } else {
      // 公司或顶部部门
      treeData.push(item)
    }
  })

  // 结束转换
  return treeData
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime (time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj (url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}
