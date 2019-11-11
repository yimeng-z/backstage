<!--  -->
<template>
  <div class="users">
    <div class="right_users">
      <div class="users_right">
        <p class="users_right_title">
          <span>首页 ></span>
          <span>用户管理 ></span>
          <span>用户列表 ></span>
        </p>
        <div class="users_right_content">
          <input placeholder="请输入内容" v-model="searchs" type="text" />
          <button class="search" @click="search">
            <i class="el-icon-search"></i>
          </button>
          <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
          <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
            <el-form
              :model="dynamicValidateForm"
              ref="dynamicValidateForm"
              label-width="100px"
              class="demo-dynamic"
            >
              <el-form-item
                prop="users"
                label="用户名"
                :rules="[
      { required: true, message: '请输入用户名', trigger: 'blur' },
    ]"
              >
                <el-input maxlength="6" v-model="dynamicValidateForm.users"></el-input>
              </el-form-item>
              <el-form-item
                prop="pass"
                label="密码"
                :rules="[
      { required: true, message: '请输入密码', trigger: 'blur' },
    ]"
              >
                <el-input maxlength="10" v-model="dynamicValidateForm.pass"></el-input>
              </el-form-item>
              <el-form-item
                prop="email"
                label="邮箱"
                :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    ]"
              >
                <el-input v-model="dynamicValidateForm.email"></el-input>
              </el-form-item>
              <el-form-item
                prop="tel"
                label="手机号"
                :rules="[
      { required: true, message: '请输入手机号', trigger: 'blur' },
    ]"
              >
                <el-input maxlength="11" v-model="dynamicValidateForm.tel"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button :plain="true" type="primary" @click="addUser">确 定</el-button>
            </div>
          </el-dialog>
          <div class="users_table">
            <el-table size="mini" :data="users.users" stripe style="width: 95%">
              <el-table-column type="index" label="#" width="180"></el-table-column>
              <el-table-column prop="username" label="姓名" width="180"></el-table-column>
              <el-table-column prop="email" label="邮箱" width="260"></el-table-column>
              <el-table-column prop="mobile" label="电话"></el-table-column>
              <el-table-column prop="role_name" label="角色"></el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <el-switch
                    :plain="true"
                    v-model="scope.row.mg_state"
                    @change="changeroles(scope.$index, scope.row)"
                    active-color="#13ce66"
                    inactive-color="#ddd"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    size="mini"
                    @click="showcancelUpdate(scope.$index, scope.row)"
                  ></el-button>
                  <el-dialog title="修改用户" :visible.sync="cancelUpdate">
                    <el-form :model="update" ref="update" label-width="100px" class="demo-dynamic">
                      <el-form-item
                        prop="users"
                        label="用户名"
                        :rules="[
      { required: true, message: '请输入用户名', trigger: 'blur' },
    ]"
                      >
                        <el-input maxlength="6" disabled v-model="update.users"></el-input>
                      </el-form-item>
                      <el-form-item
                        prop="email"
                        label="邮箱"
                        :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    ]"
                      >
                        <el-input v-model="update.email"></el-input>
                      </el-form-item>
                      <el-form-item
                        prop="tel"
                        label="手机号"
                        :rules="[
      { required: true, message: '请输入手机号', trigger: 'blur' },
    ]"
                      >
                        <el-input maxlength="11" v-model="update.tel"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="cancelUpdate = false">取 消</el-button>
                      <el-button :plain="true" type="primary" @click="updateUser">确 定</el-button>
                    </div>
                  </el-dialog>
                  <el-button
                    size="mini"
                    type="danger"
                    circle
                    icon="el-icon-delete"
                    @click="del(scope.$index, scope.row)"
                  ></el-button>
                  <el-button
                    type="warning"
                    @click="setUsers(scope.$index, scope.row)"
                    icon="el-icon-setting"
                    size="mini"
                    circle
                  ></el-button>
                  <el-dialog title="分配角色" :visible.sync="setUser">
                    <el-form
                      :model="changeset"
                      ref="dynamicValidateForm"
                      label-width="100px"
                      class="demo-dynamic"
                    >
                      <p class="distribution">
                        当前用户：
                        <span v-html="changeset.user"></span>
                      </p>
                      <p class="distribution">
                        当前的角色：
                        <span v-html="changeset.role_name"></span>
                      </p>
                      <p class="distribution">
                        分配角色：
                        <el-select v-model="value" @change="getroleName(value)" placeholder="请选择">
                          <el-option
                            v-for="(item,index) in options"
                            :key="index"
                            :label="item.roleName"
                            :value="item.roleName"
                          ></el-option>
                        </el-select>
                      </p>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="setUser = false">取 消</el-button>
                      <el-button :plain="true" type="primary" @click="setU">确 定</el-button>
                    </div>
                  </el-dialog>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[ 10, ]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="users.total"
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
import Header from "../components/header";
import Lefts from "../components/lefts";
import Product from "../services/views-services";
const _product = new Product();
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Header,
    Lefts
  },
  inject:['reload'],
  data() {
    //这里存放数据
    return {
      searchs: "",
      setUser: false,
      cancelUpdate: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      dynamicValidateForm: {
        tel: "",
        email: "",
        users: "",
        pass: ""
      },
      update: {
        id: "",
        users: "",
        email: "",
        tel: ""
      },
      users: {},
      a: false,
      currentPage4: 1,
      changeset: {
        user: "",
        id: "",
        role_name: ""
      },
      options: [],
      value: "",
      changeroleName: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    setU() {
      let obj = {
        id: this.changeset.id,
        role: this.changeroleName[0].id
      };
      _product.roleChange(obj).then(res => {
          this.$message({
            message: res.data.meta.msg
          });
          this.reload()
        //  this.setUser = false
      });
      console.log(this.changeset, this.changeroleName);
    },
    getroleName(v) {
      console.log(v);
      this.changeroleName = this.options.filter(res => {
        return res.roleName == v;
      });
      console.log(this.changeroleName);
    },
    setUsers(i, v) {
      this.setUser = true;
      // console.log(i, v);
      this.changeset.user = v.username;
      this.changeset.id = v.id;
      this.changeset.role_name = v.role_name;
    },
    search() {
      let obj = {
        key: this.searchs,
        pagenum: 1,
        pagesize: 10
      };
      _product.searchUser(obj).then(res => {
        this.users = res.data.data;
      });
    },
    showcancelUpdate(i, v) {
      this.cancelUpdate = true;
      this.update.users = v.username;
      this.update.email = v.email;
      this.update.tel = v.mobile;
      this.update.id = v.id;
    },
    updateUser() {
      let obj = {
        id: this.update.id,
        username: this.update.users,
        email: this.update.email,
        mobile: this.update.tel
      };
      _product.editUser(obj).then(res => {
        console.log(res);
        this.$message({
          message: res.data.meta.msg,
          type: "success"
        });
        this.cancelUpdate = false;
        this.update = "";
      });
    },
    addUser() {
      let obj = {
        tel: this.dynamicValidateForm.tel,
        email: this.dynamicValidateForm.email,
        users: this.dynamicValidateForm.users,
        pass: this.dynamicValidateForm.pass
      };
      _product.addUser(obj).then(res => {
        this.$message(res.data.meta.msg);
        this.dialogFormVisible = false;
        this.dynamicValidateForm = "";
        this.reload()
      });
    },
    changeroles(i, v) {
      let obj = {
        id: v.id,
        state: v.mg_state
      };
      console.log(obj);
      _product.update(obj).then(res => {
        console.log(res);
        this.$message({
          message: res.data.meta.msg
        });
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
    },
    del(i, v) {
      console.log(i, v);
      // let a =JSON.parse(window.localStorage.getItem("token"))

      this.$confirm("此操作不可逆 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let obj = {
            id: v.id
          };
          console.log(obj);
          _product.delUser(obj).then(res => {
            this.$message({
              type: "success",
              message: res.data.mate.msg
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
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // let a = JSON.parse(window.localStorage.getItem("token"));
    let obj = {
      pagenum: 1,
      pagesize: 10
    };
    _product.userList(obj).then(res => {
      this.users = res.data.data;
    });
    _product.rolesList().then(res => {
      console.log(res.data.data);
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
.distribution {
  font-size: 14px !important;
  text-indent: 20px;
  margin-bottom: 20px;
}
.block {
  margin-top: 30px;
}
.users {
  width: 100%;
  background-color: #ddd;
  border-radius: 5px;
  
}
.right_users {
  width: 100%;
  margin-left: 20px;
  margin: 0 auto;
}
.users_right {
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 95%;
  margin: 20px;
  margin-left: 20px;
  background: #fff;
  .users_right_title {
    text-indent: 20px;
    height: 30px;
    font-size: 16px !important;
    span:nth-child(1) {
      font-weight: bolder;
    }
  }
  .users_right_content {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    padding: 10px;
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
</style>