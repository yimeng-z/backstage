import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login'
import Welcome from '../views/welcome'
import Users from '../views/users'
import Categories from '../views/categories'
import Goods from '../views/goods'
import Orders from '../views/orders'
import Rights from '../views/rights'
import Roles from '../views/roles'
import Params from '../views/params'
import Reports from '../views/reports'
import Add from '../views/add'
Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
export default new Router({
  mode:'history',
  base:'/zhangqiqi/',
  linkActiveClass:'active',
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path:'/welcome',
      component:Welcome,
      children:[
        {
          path:'/users',
          component:Users
        },
        {
          path:'/categories',
          component:Categories
        },
        {
          path:'/goods',
          component:Goods,
        },
        {
          path:'/orders',
          component:Orders
        },
        {
          path:'/rights',
          component:Rights
        },
        {
          path:'/roles',
          component:Roles
        },
        {
          path:'/params',
          component:Params
        },
        {
          path:'/reports',
          component:Reports
        },
        {
          path:'/add',
          component:Add
        }
      ]
    },
    

  ]
})
