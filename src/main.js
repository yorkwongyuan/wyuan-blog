import './public-path'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router'
import store from './store'

Vue.use(VueRouter)

Vue.config.productionTip = false
let instance = ''

// 渲染函数
function render (props = {}) {
  const { container, routerBase } = props
  // 路由实例化
  const router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL,
    mode: 'history',
    routes
  })
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// 不是qiankun环境运行
if (!window.__POWERED_BY_QIANKUN__) {
  // 只是调用render, 而不去传参数
  render()
}

// ==== qiankun 生命周期函数 ====

// bootstrap: 全局初始化钩子,只是第一次触发
export async function bootstrap () {
  console.log('vue app bootstrap!')
}

// mount: 每次进入应用都会触发
export async function mount (props) {
  render(props)
}

// unmount: 离开应用的时候调用
export async function unmount () {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
