<!--  -->
<template>
  <div class="login">
    <video width="100%" height="100%" autoplay loop muted>
      <source src="../assets/郭顶 - 水星记.mp4" type="video/mp4" />
    </video>
    <div class="user">
      <img src="../assets/287977.jpg" alt />
      <div>
        <input
          :class="testu?'right':'falses'"
          @blur="testuser"
          placeholder="请输入用户名"
          type="text"
          v-model="user"
          name
          id
        />
        <!-- <span class="el-icon-user"></span> -->
        <!-- <p>3-6位字母</p> -->
      </div>
      <div>
        <input
          :class="testp?'right':'falses'"
          @blur="testpass"
          placeholder="请输入密码"
          type="password"
          v-model="pass"
          name
          id
        />
        <!-- <span class="el-icon-camera"></span>
        <span class="el-icon-camera-solid"></span>
        <p>数字</p>-->
      </div>
      <template>
  <!-- <el-button :plain="true" @click="open2">成功</el-button>
  <el-button :plain="true" @click="open3">警告</el-button>
  <el-button :plain="true" @click="open1">消息</el-button>
  <el-button :plain="true" @click="open4">错误</el-button> -->
      <el-button :plain="true" type="primary" @click="submits">登陆</el-button>
      <el-button :plain="true" type="danger" @click="clear">重置</el-button>
</template>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Product from "../services/views-services";
const _product = new Product();
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      user: "",
      pass: "",
      testu: true,
      testp: true
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    testuser() {
      if(/^[a-zA-Z0-9]{3,6}$/.test(this.user)){
        this.testu=true
      }else{
        this.testu=false
      }
    },
    testpass() {
       if(/^[a-zA-Z0-9]{5,15}$/.test(this.user)){
        this.testp=true
      }else{
        this.testp=false
      }
    },
    submits() {
      if (this.user == "" || this.pass == "") {
        this.$message("请输入有效信息")
        return false;
      }else if(this.user==''){
        this.$message("请输入用户名")
      }else if(this.pass==''){
        this.$message("请输入有效密码")
      }
      let obj = {
        user: this.user,
        pass: this.pass
      };
      _product.logins(obj).then(res => {
        if(res.data.data==null){
          this.$message(res.data.meta.msg)
        }else{
          this.$message(res.data.meta.msg)
          window.localStorage.setItem("token",JSON.stringify(res.data.data.token))
          this.$router.push({
            path:'/welcome'
          })
        }
      });
    },
    clear() {
      this.user = "";
      this.pass = "";
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

.login {
  width: 1900px;
  height: 900px;
  border: 1px solid red;
  .user {
    width: 100%;
    position: absolute;
    top: 200px;
    text-align: center;

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-bottom: 10px;
    }
    div {
      height: 100px;
      p {
        color: red;
      }
    }
    .right {
      width: 400px;
      height: 50px;
      border-radius: 5px;
      border: none;
      outline: none;
      opacity: 0.5;
      text-indent: 10px;
    }
    .falses {
      width: 400px;
      height: 50px;
      border-radius: 5px;
      border: none;
      outline: none;
      opacity: 0.5;
      text-indent: 10px;
      border: 1px solid red;
    }
    button {
      width: 120px;
      height: 50px;
    }
  }
}
</style>