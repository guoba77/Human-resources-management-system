<template>
  <!--
  问题：国际化切换el-calendar日历组件，星期没有动态翻译
  解决：让组件重新渲染
  key 是组件的唯一标识（身份证），如果发生变化，会重新渲染组件
 -->
  <el-calendar :key="$i18n.locale" v-model="currentDate">
    <!-- 通过具名插槽dateCell自定义样式结构
    1. date当前时间的日期类型
    2. data.day当前年月日时间 =》2021-11-28
    -->
    <template #dateCell="{ date, data }">
      <!-- 小格子自定义结构 -->
      <div class="date-content">
        <span class="text">{{ formatDay(data.day) }}</span>
        <!-- 周六日显示休 -->
        <span v-if="isWeekend(date)" class="rest">休</span>
      </div>
    </template>
  </el-calendar>
</template>

<script>
export default {
  data () {
    return {
      currentDate: new Date()
    }
  },
  methods: {
    // 格式化获取日
    // ymd 年-月-日
    formatDay (ymd) {
      return ymd.split('-')[2]
    },
    // 判断是否是周六日
    isWeekend (date) {
      return date.getDay() === 6 || date.getDay() === 0
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-calendar-day {
  height: 50px;
}
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
// 休息时间
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text {
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
}
// 当前日期
::v-deep .el-calendar-table td.is-selected .text {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}
</style>
