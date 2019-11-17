<!--  -->
<template>
  <div class="roles">
    <div class="roles_content">
      <div class="roles_right">
        <p class="roles_right_title">
          <span>首页></span>
          <span>商品管理></span>
          <span>商品分类></span>
        </p>
        <div class="roles_right_content">
          <div class="clssify">
            <el-button type="primary" :plain="true" @click="showadd=true">添加分类</el-button>
            <el-dialog title="添加分类" :visible.sync="showadd">
              <el-form :model="addclass" ref="addclass" label-width="100px" class="demo-dynamic">
                <el-form-item
                  prop="father"
                  label="分类名称"
                  :rules="[
      { required: true, message: '请输入用户名', trigger: 'blur' },
    ]"
                >
                  <el-input maxlength="6" v-model="addclass.father"></el-input>
                </el-form-item>
                <div class="block1">
                  <span class="demonstration">父级分类 </span>
                  <el-cascader
                    v-model="acc"
                    :options="options"
                    :props="{ checkStrictly: true ,label:'cat_name',value:'cat_id'}"
                    clearable
                    @change="handleChange"
                  ></el-cascader>
                </div>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="showadd = false">取 消</el-button>
                <el-button :plain="true" type="primary" @click="addclassify">确 定</el-button>
              </div>
            </el-dialog>
            <el-table
              :data="goods.result"
              style="width: 100%;margin-bottom: 20px;"
              row-key="cat_id"
              border
              sort-by="index"
              :tree-props="{children: 'children', children: 'children'}"
            >
              <el-table-column prop="cat_id" label="#" sortable width="180"></el-table-column>
              <el-table-column prop="cat_name" label="分类名称" sortable width="180"></el-table-column>
              <el-table-column prop="cat_delete" label="是否有效">
                <el-button size="mini" icon="el-icon-check" circle></el-button>
              </el-table-column>
              <el-table-column prop="cat_level" label="排序">
                <template slot-scope="scope">
                  <el-tag
                    :type="`${scope.row.cat_level=='0'?'success':scope.row.cat_level=='1'?'info':'danger'}`"
                    v-html="`${scope.row.cat_level=='0'?'一级':scope.row.cat_level=='1'?'二级':'三级'}`"
                  >{{scope.row.ji}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="success"
                    @click="editiclass(scope.row,scope.$index)"
                    icon="el-icon-check"
                  >编辑</el-button>

                  <el-button
                    type="danger"
                    @click="delclass(scope.row,scope.$index)"
                    icon="el-icon-delete"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block" style="marginTop:20px">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[ 5, ]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="goods.total"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog style="zIndex:100" title="编辑分类信息" :visible.sync="edit">
      <el-form :model="edits" ref="edits" label-width="100px" class="demo-dynamic">
        <el-form-item
          prop="content"
          label="分类名称"
          :rules="[
      { required: true, message: '请输入分类名称', trigger: 'blur' },
    ]"
        >
          <el-input v-model="edits.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit = false">取 消</el-button>
        <el-button :plain="true" type="primary" @click="editcla">确 定</el-button>
      </div>
    </el-dialog>
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
      goods: {},
      currentPage4: 1,
      showadd: false,
      addclass: {
        father: ""
      },
      options: [],
      acc: [],
      edit: false,
      edits: {
        content: "",
        id: ""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleSizeChange(val) {
      let obj = {
        pagenum: 1,
        pagesize: val
      };
      _product.categories(obj).then(res => {
        this.goods = res.data.data;
      });
    },
    handleCurrentChange(val) {
      let obj = {
        pagenum: val,
        pagesize: 5
      };
      _product.categories(obj).then(res => {
        this.goods = res.data.data;
      });
    },
    addclassify() {
      this.showadd = false;
      console.log(this.acc1, this.addclass.father);
      let obj = {
        id: this.acc1[1],
        name: this.addclass.father,
        level: 2
      };
      _product.addClass(obj).then(res => {
        if (res.data.meta.status == 201) {
          this.$message({
            message: res.data.meta.msg
          });
          this.reload();
        }
      });
    },
    editiclass(v, i) {
      this.edit = true;
      this.edits.content = v.cat_name;
      this.edits.id = v.cat_id;
    },
    editcla() {
      let obj = {
        id: this.edits.id,
        name: this.edits.content
      };
      _product.uodateClass(obj).then(res => {
        this.$message({
          message: this.data.meta.msg
        });
        this.reload();
      });1
    },
    delclass(v, i) {
      this.$confirm("此操作不可逆 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _product.delClass(v.cat_id).then(res => {
            console.log(res.data);
            this.$message({
              type: "success",
              message: res.data.meta.msg
            });
            this.$router.push({
              path: "/users"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleChange(value) {
      this.acc1 = value;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let obj = {
      type: 3,
      pagenum: 1,
      pagesize: 5
    };
    _product.categories(obj).then(res => {
      this.goods = res.data.data;
    });
    _product.goodsClass1().then(res => {
      this.options = res.data.data;
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
.block1{
  margin-left: 32px;
  .demonstration{
  font-size: 13px !important;

  }
}
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
      padding: 25px;
      .clssify {
      }
    }
  }
}
</style>