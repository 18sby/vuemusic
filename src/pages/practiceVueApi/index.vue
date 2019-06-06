<template>
  <div class="container">

  </div>
</template>
<script>
import Vue from 'vue'

export default {
  props: {
    argType: {
      type: [ Number, String ],
      required: true,
      default: 0,
      validator: function (value) {
        return value > 5
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    practice () {
      
      // 1.取消vue所有日志和警告
      Vue.config.silent = true

      // 2.自定义键位别名
      Vue.config.keyCodes = {
        v: 86,
        "mediaPlayPause": 179
      }

      // 3.下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
      Vue.nextTick(function () {
        // DOM更新了
      })

      // 4.set delete 目标对象不能是一个 Vue 实例或 Vue 实例的根数据对象。
      Vue.set(target, propertyName/index, value)
      Vue.delete(target, propertyName/index. value)

      // 5.注册或获取全局指令
      Vue.directive('first-directive', {
        bind: function () {},
        inserted: function () {},
        update: function () {},
        componentUpdated: function () {},
        unbind: function () {},
      })
      Vue.directive('first-directive', function () {
        // 这里会被bind 和 update调用
      })
      var firstDirective = Vue.directive('first-directive')

      // 6.过滤器
      Vue.filter('first-filter', function (value) {
        // 返回处理后的值
      })
      var firstFilter = Vue.filter('first-filter')

      // 7.注册全局组件
      Vue.component('first-component', Vue.extend({ /*   */ }))

      // 8.使用插件
      Vue.use(plugin)

      // 9.props验证

      // 10.

    }
  }
}
</script>
<style scoped>

</style>

