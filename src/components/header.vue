<!--  -->
<template>
<div class='header'>
    <div class="lefts_top">
      <div>
        <img src="../assets/287977.jpg" alt />
        <p>电商后台管理系统</p>
      </div>
      <button>退出</button>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.header{
    width: 100%;
}
.lefts_top {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #333744;
  color: white;
  justify-content: space-between;
  position: relative;
  img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
  div {
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    p {
      font-family: "黑体";
      font-size: 20px;
    }
  }
  button {
    margin-right: 50px;
    width: 70px;
    height: 30px;
    color: black;
    border: none;
    border-radius: 5px;
  }
}
</style>