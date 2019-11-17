<!--  -->
<template>
  <div class="lefts">
    <div :class="isCollapse?'lefts_left1':'lefts_left2'">
      <div class="toggle" @click="isCollapse=!isCollapse">| | |</div>
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#333744"
        text-color="white"
        :collapse-transition="false"
        router
        unique-opened
      >
        <el-submenu :key="i" v-for="(v,i) in menu" :index="String(v.order)">
          <template slot="title">
            <i class="el-icon-grape" v-if="v.authName==='用户管理'"></i>
            <i class="el-icon-odometer" v-if="v.authName==='权限管理'"></i>
            <i class="el-icon-ship" v-if="v.authName==='商品管理'"></i>
            <i class="el-icon-cold-drink" v-if="v.authName==='订单管理'"></i>
            <i class="el-icon-ice-cream-square" v-if="v.authName==='数据统计'"></i>
            <span :index="v.path" slot="title">{{v.authName}}</span>
          </template>
          <el-menu-item
            :key="index"
            enter-active-class="active"
            v-for="(item,index) in v.children"
            :index="item.path"
          >
            <i class="el-icon-sunny"></i>
            <span>{{item.authName}}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Product from "../services/views-services";
import Header from "./header";
const _product = new Product();
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Header
  },
  data() {
    //这里存放数据
    return {
      isCollapse: true,
      menu: []
    };
  },
  //监听属性 类似于data概念
  computed: {
    showApp() {
      return this.$store.state.showApp;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let a = JSON.parse(window.localStorage.getItem("token"));
    _product.case(a).then(res => {
      this.menu = res.data.data;
    });
  },
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
* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 16px;
}
.lefts {
  height: 100vh;
  min-height: 800px;
  // overflow: hidden;
  // padding-bottom: 2009px;
  background-color: #333744;
  // margin-bottom: -999px;
  padding-top: 60px;
}
.el-menu-vertical-demo:not(.el-menu--collapse){
  height: 100% !important;
  width: 200px;
}
.el-aside{
  background-color: #333744;
  height: 100vh;
}
.el-menu--collapse{
  height: 100% !important;
}
img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.lefts_left1 {
  width: 64px;
  background-color: #333744;
  // transition: all 1s;
}
.lefts_left2 {
  width: 200px;
  background-color: #333744;
  // transition: all 1s;
}
.el-radio-group {
  background-color: darkslategray !important;
  .el-menu-vertical-demo el-menu--collapse el-menu {
    background-color: darkslategray !important;
  }
}
.toggle {
  color: #fff;
  font-size: 12px;
  line-height: 24px;
  background-color: #333744;
  cursor: pointer;
  text-align: center;
}
</style>