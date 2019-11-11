import HTTP from '../utils/http'
const _http=new HTTP()
class Product{
    //登陆
    logins (obj){
        return _http.request({
            type:'post',
            url:'login',
            data:{
                username:obj.user,
                password:obj.pass
            }
        })
    }
    //菜单
    case(){
        return _http.request({
            type:'get',
            url:'menus',
            // data:{
            //     token:token
            // }
        })
    }
    //用户列表
    userList(obj){
        return _http.request({
            type:'get',
            url:`users?query=&pagenum=${obj.pagenum}&pagesize=${obj.pagesize}`,
            // data:{
            //     token:obj.token
            // }
        })
    }
    //添加用户
    addUser(obj){
        return _http.request({
            type:"post",
            url:'users',
            data:{
                username:obj.users,
                password:obj.pass,
                email:obj.email,
                mobile:obj.tel,
            }
        })
    }
    //删除用户
    delUser(obj){
        return _http.request({
            type:'delete',
            url:`users/${obj.id}`,
        })
    }
    //修改用户状态
    update(obj){
        return _http.request({
            type:'put',
            url:`users/${obj.id}/state/${obj.state}`
        })
    }
    //编辑用户
    editUser(obj){
        return _http.request({
            type:"put",
            url:`users/${obj.id}`,
            data:{
                username:obj.username,
                email:obj.email,
                mobile:obj.mobile
            }
        })
    }
    //用户搜索
    searchUser(obj){
        return _http.request({
            type:"get",
            url:`users?query=${obj.key}&pagenum=${obj.pagenum}&pagesize=${obj.pagesize}`
        })
    }
    //角色列表
    rolesList(){
        return _http.request({
            type:"get",
            url:'roles'
        })
    }
    //角色分配
    roleChange(obj){
        return _http.request({
            type:'put',
            url:`users/${obj.id}/role`,
            data:{
                rid:obj.role
            }
        })
    }
    //添加角色
    addRoles(obj){
        return _http.request({
            type:'post',
            url:'roles',
            data:{
                roleName:obj.users,
                roleDesc:obj.userDiscription
            }
        })
    }
    //修改角色
    updateRoles(obj){
        return _http.request({
            type:'put',
            url:`roles/${obj.id}`,
            data:{
                roleName:obj.roleName,
                roleDesc:obj.roleDesc
            }
        })
    }
    //删除角色
    delRoles(obj){
        return _http.request({
            type:'delete',
            url:`roles/${obj.id}`
        })
    }
    //权限列表
    rightsList(){
        return _http.request({
            type:'get',
            url:'rights/tree'
        })
    }

}
export default Product