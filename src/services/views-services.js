import HTTP from '../utils/http'
const _http = new HTTP()
class Product {
    //登陆
    logins(obj) {
        return _http.request({
            type: 'post',
            url: 'login',
            data: {
                username: obj.user,
                password: obj.pass
            }
        })
    }
    //菜单
    case() {
        return _http.request({
            type: 'get',
            url: 'menus',
            // data:{
            //     token:token
            // }
        })
    }
    //用户列表
    userList(obj) {
        return _http.request({
            type: 'get',
            url: `users?query=&pagenum=${obj.pagenum}&pagesize=${obj.pagesize}`,
            // data:{
            //     token:obj.token
            // }
        })
    }
    //添加用户
    addUser(obj) {
        return _http.request({
            type: "post",
            url: 'users',
            data: {
                username: obj.users,
                password: obj.pass,
                email: obj.email,
                mobile: obj.tel,
            }
        })
    }
    //删除用户
    delUser(obj) {
        return _http.request({
            type: 'delete',
            url: `users/${obj.id}`,
        })
    }
    //修改用户状态
    update(obj) {
        return _http.request({
            type: 'put',
            url: `users/${obj.id}/state/${obj.state}`
        })
    }
    //编辑用户
    editUser(obj) {
        return _http.request({
            type: "put",
            url: `users/${obj.id}`,
            data: {
                username: obj.username,
                email: obj.email,
                mobile: obj.mobile
            }
        })
    }
    //用户搜索
    searchUser(obj) {
        return _http.request({
            type: "get",
            url: `users?query=${obj.key}&pagenum=${obj.pagenum}&pagesize=${obj.pagesize}`
        })
    }
    //角色列表
    rolesList() {
        return _http.request({
            type: "get",
            url: 'roles'
        })
    }
    //角色分配
    roleChange(obj) {
        return _http.request({
            type: 'put',
            url: `users/${obj.id}/role`,
            data: {
                rid: obj.role
            }
        })
    }
    //添加角色
    addRoles(obj) {
        return _http.request({
            type: 'post',
            url: 'roles',
            data: {
                roleName: obj.users,
                roleDesc: obj.userDiscription
            }
        })
    }
    //修改角色
    updateRoles(obj) {
        return _http.request({
            type: 'put',
            url: `roles/${obj.id}`,
            data: {
                roleName: obj.roleName,
                roleDesc: obj.roleDesc
            }
        })
    }
    //删除角色
    delRoles(obj) {
        return _http.request({
            type: 'delete',
            url: `roles/${obj.id}`
        })
    }
    //权限列表
    rightsList() {
        return _http.request({
            type: 'get',
            url: 'rights/tree'
        })
    }
    //权限分配
    distribution(obj) {
        return _http.request({
            type: 'post',
            url: `roles/${obj.id}/rights`,
            data: {
                rids: obj.rids
            }
        })
    }
    //商品搜索
    goodsSearch(obj) {
        return _http.request({
            type: 'get',
            url: `goods?query=${obj.search}&pagenum=${obj.pagenum}&pagesize=${obj.pagesize}`
        })
    }
    //商品列表
    goodList(obj) {
        return _http.request({
            type: "get",
            url: `goods?pagenum=${obj.pagenum}&pagesize=${obj.pagesize}`
        })
    }
    //添加商品
    addGoods(obj) {
        return _http.request({
            type: 'post',
            url: 'goods',
            data: {
                goods_name: obj.goods_name,
                goods_price: obj.goods_price,
                goods_weight: obj.goods_weight,
                goods_number: obj.goods_number,
                goods_cat: obj.goods_cat,
                goods_introduce: obj.goods_introduce,
                pics: obj.pics,
                attrs: obj.attrs
            }
        })
    }
    //删除商品
    delGood(id) {
        return _http.request({
            type: 'delete',
            url: `goods/${id}`
        })
    }
    //商品分类
    goodsClass() {
        return _http.request({
            type: 'get',
            url: 'categories?type=3'
        })
    }
    //商品2
    goodsClass1() {
        return _http.request({
            type: 'get',
            url: 'categories?type=2'
        })
    }
    //商品参数
    attributes(id) {
        return _http.request({
            type: "get",
            url: `categories/${id}/attributes?sel=many`
        })
    }
    //商品属性
    shuxing(id) {
        return _http.request({
            type: "get",
            url: `categories/${id}/attributes?sel=only`
        })
    }
    //分类列表
    categories(obj) {
        return _http.request({
            type: 'get',
            url: `categories?type=${obj.type}&pagenum=${obj.pagenum}&pagesize=${obj.pagesize}`
        })
    }
    //订单列表
    orderList(obj) {
        return _http.request({
            type: "get",
            url: `orders?pagenum=${obj.pagenum}&pagesize=${obj.pagesize}`
        })
    }
    //数据报表
    reports() {
        return _http.request({
            type: "get",
            url: 'reports/type/1'
        })
    }
    //商品属性
    quiet(id) {
        return _http.request({
            type: "get",
            url: `categories/${id}/attributes?sel=only`
        })
    }
    //删除添加修改标签
    delTag(obj) {
        return _http.request({
            type: 'put',
            url: `categories/${obj.cat_id}/attributes/${obj.attr_id}`,
            data: {
                attr_name: obj.attr_name,
                attr_sel: obj.attr_sel,
                attr_vals: obj.attr_vals
            }
        })
    }
    //动态参数、静态属性添加
    activecan(obj){
        return _http.request({
            type:'post',
            url:`categories/${obj.id}/attributes`,
            data:{
                attr_name:obj.type,
                attr_sel:obj.attr_sel
            }
        })
    }
    //动态参数删除
    delActives(obj){
        return _http.request({
            type:'delete',
            url:`categories/${obj.cat_id}/attributes/${obj.attr_id}`
        })
    }
    //静态属性删除
    delquiets(obj){
        return _http.request({
            type:'delete',
            url:`categories/${obj.cat_id}/attributes/${obj.attr_id}`
        })
    }
    //删除分类
    delClass(id){
        return _http.request({
            type:"delete",
            url:`categories/${id}`
        })
    }
    // 添加分类
    addClass(obj){
        return _http.request({
            type:'post',
            url:`categories`,
            data:{
                cat_pid:obj.id,
                cat_name:obj.name,
                cat_level:obj.level
            }
        })
    }
    //修改分类
    uodateClass(obj){
        return _http.request({
            type:'put',
            url:`categories/${obj.id}`,
            data:{
                cat_name:obj.name
            }
        })
    }
}
export default Product