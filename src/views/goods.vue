<!--  -->
<template>
  <div class="roles">
    <div class="roles_content">
      <div class="roles_right">
        <p class="roles_right_title">
          <span>首页></span>
          <span>商品管理></span>
          <span>商品列表></span>
        </p>
        <div class="roles_right_content">
          <input placeholder="请输入内容" v-model="searchs" type="text" />
          <button class="search" @click="search">
            <i class="el-icon-search"></i>
          </button>
          <el-button type="primary" @click="addGoods">添加商品</el-button>
          <el-table :data="goods.goods" style="width: 100%;boxSizing:borderBox;padding:20px">
            <el-table-column type="index" label="#" width="50"></el-table-column>
            <el-table-column prop="goods_name" label="商品名称" width="780"></el-table-column>
            <el-table-column prop="goods_price" label="商品价格(元)"></el-table-column>
            <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
            <el-table-column prop="add_time" label="创建时间">
              <template slot-scope="scope">
                  {{ new Date(scope.row.add_time).toLocaleString() }}
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="editGoods(scope.$index, scope.row)"
                  type="primary"
                  icon="el-icon-edit"
                ></el-button>
                <el-button
                  @click="delGoods(scope.$index, scope.row)"
                  type="danger"
                  icon="el-icon-delete"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block" style="marginTop:20px">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[ 10, ]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="goods.total"
            ></el-pagination>
          </div>
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
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  inject: ["reload"],
  data() {
    //这里存放数据
    return {
      searchs: "",
      currentPage4: 1,
      goods: {}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    addGoods(){
      this.$router.push({
        path:'/add'
      })
    },
    editGoods(i,v){
      console.log(i,v)
    },
    delGoods(i, v) {
      console.log(v)
      this.$confirm("此操作不可逆 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _product.delGood(v.goods_id).then(res => {
            console.log(res.data);
            this.$message({
              message:res.data.meta.msg
            })
            this.reload();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    search() {
      let obj = {
        search: this.searchs,
        pagenum: 1,
        pagesize: 10
      };
      _product.goodsSearch(obj).then(res => {
        this.goods=res.data.data
      });
    },
    handleSizeChange(val) {
      let obj = {
        pagenum: 1,
        pagesize: val
      };
      _product.userList(obj).then(res => {
        this.users = res.data.data;
      });
    },
    handleCurrentChange(val) {
      let obj = {
        pagenum: val,
        pagesize: 10
      };
      _product.userList(obj).then(res => {
        this.users = res.data.data;
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let obj = {
      pagenum: 1,
      pagesize: 10
    };
    _product.goodList(obj).then(res => {
      this.goods = res.data.data;
      this.goods.goods.forEach(v => {});
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
      padding: 20px;
      box-sizing: border-box;
      input {
        width: 300px;
        height: 40px;
        border-radius: 5px;
        text-indent: 10px;
        border: none;
        border: 1px solid #ddd;
      }
      .search {
        width: 100px;
        margin-left: 10px;
        height: 40px;
        border-radius: 5px;
        border: none;
        margin-right: 50px;
      }
    }
  }
}
</style>