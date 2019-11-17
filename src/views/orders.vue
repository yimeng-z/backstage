<!--  -->
<template>
  <div class="roles">
    <div class="roles_content">
      <div class="roles_right">
        <p class="roles_right_title">
          <span>首页></span>
          <span>用户管理></span>
          <span>用户列表></span>
        </p>
        <div class="roles_right_content">
          <input placeholder="请输入内容" type="text" />
          <button class="search">
            <i class="el-icon-search"></i>
          </button>
          <el-table :data="orderlists.goods" style="width: 100%;boxSizing:borderBox;padding:20px">
            <el-table-column type="index" label="#" width="50"></el-table-column>
            <el-table-column prop="order_number" label="订单编号"></el-table-column>
            <el-table-column prop="order_price" label="订单价格"></el-table-column>
            <el-table-column prop="is_send" label="是否付款">
              <template slot-scope="scope">
                <el-tag v-html="scope.row.order_pay>0?'已支付':'未支付'"></el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="is_send" label="是否发货"></el-table-column>
            <el-table-column prop="create_time" label="下单时间">
                 <template slot-scope="scope">
                  {{ new Date(scope.row.create_time).toLocaleString() }}
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  :plain="true"
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="setOrders(scope.$index, scope.row)"
                ></el-button>
                <el-dialog title="修改地址" :visible.sync="setOrder">
                  <el-form :model="localtion" ref="update" label-width="100px" class="demo-dynamic">
                    <el-form-item
                      prop="sheng"
                      label="详细地址"
                      :rules="[
      { required: true, message: '请输入详细地址', trigger: 'blur' },
    ]"
                    >
                      <el-input maxlength="11" v-model="localtion.sheng"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="setOrder = false">取 消</el-button>
                    <el-button :plain="true" type="primary" @click="sureSetOrder">确 定</el-button>
                  </div>
                </el-dialog>
                <el-button type="success"  :plain="true" icon="el-icon-map-location" size="mini"></el-button>
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
              :total="orderlists.total"
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
  data() {
    //这里存放数据
    return {
      orderlists: [],
      currentPage4: 1,
      setOrder: false,
      localtion: {
        sheng: "",
        detail: ""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化s
  watch: {},
  //方法集合
  methods: {
    setOrders(i, v) {
      this.setOrder = true;
      console.log(i, v);
    },
    sureSetOrder() {
      //   this.setOrder = true;
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
    _product.orderList(obj).then(res => {
      this.orderlists = res.data.data;
      console.log(res.data);
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
      box-sizing: border-box;
      padding: 20px;
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