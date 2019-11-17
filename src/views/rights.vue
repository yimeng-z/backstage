<!--  -->
<template>
  <div class="roles">
    <div class="roles_content">
      <div class="roles_right">
        <p class="roles_right_title">
          <span>首页></span>
          <span>权限管理></span>
          <span>权限列表></span>
        </p>
        <div class="roles_right_content">
          <el-table :data="datas" style="width: 100%;boxSizing:borderBox;padding:20px">
            <el-table-column type="index" label="#" ></el-table-column>
            <el-table-column prop="authName" label="权限名称" ></el-table-column>
            <el-table-column prop="path" label="路径" ></el-table-column>
            <el-table-column prop="ji" label="权限等级">
                  <template slot-scope="scope">
                    <el-tag :type="`${scope.row.ji=='一级'?'warning':scope.row.ji=='二级'?'info':'danger'}`">{{scope.row.ji}}</el-tag>
                </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Product from "../services/views-services";
const _product = new Product();
import Sort from '../utils/sort'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      datas: []
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
    _product.rightsList().then(res => {
      console.log(res.data);
      res.data.data.forEach(v=>{
        v.ji = "一级"
        this.datas.push(v)
        v.children.forEach(j=>{
          j.ji = "二级"
        this.datas.push(j)
          j.children.forEach(l=>{
            l.ji="三级"
            this.datas.push(l)
          })
        })
      })
      this.datas=this.datas.sort(Sort.compare(("id"),true))
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
.roles {
  width: 100%;
}
.roles_content {
  display: flex;
  width: 100%;
  background-color: #ddd;
  .roles_right {
    width: 100%;
    .roles_right_title {
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-indent: 50px;
      padding-top: 20px;
    }
    .roles_right_content {
      width: 95%;
      height: 825px;
      background-color: white;
      border-radius: 5px;
      margin: 0 auto;
    }
  }
}
</style>