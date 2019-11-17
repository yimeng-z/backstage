<!--  -->
<template>
  <div class="roles">
    <div class="roles_content">
      <div class="roles_right">
        <div>
          <p class="roles_right_title">
            <span>首页></span>
            <span>权限管理></span>
            <span>角色列表></span>
          </p>
          <div class="roles_right_content">
            <el-button type="primary" @click="dialogFormVisible = true">添加角色</el-button>
            <el-dialog title="添加新角色" :visible.sync="dialogFormVisible">
              <el-form
                :model="dynamicValidateForm"
                ref="dynamicValidateForm"
                label-width="100px"
                class="demo-dynamic"
              >
                <el-form-item
                  prop="users"
                  label="角色名称"
                  :rules="[
      { required: true, message: '请输入角色名', trigger: 'blur' },
    ]"
                >
                  <el-input maxlength="6" v-model="dynamicValidateForm.users"></el-input>
                </el-form-item>
                <el-form-item
                  prop="userDescription"
                  label="角色描述"
                  :rules="[
      { required: true, message: '请输入角色描述', trigger: 'blur' },
    ]"
                >
                  <el-input maxlength="10" v-model="dynamicValidateForm.userDescription"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button :plain="true" type="primary" @click="addUser">确 定</el-button>
              </div>
            </el-dialog>
            <div>
              <el-table :data="rolesLists" size="mini" style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <div class="roles_goodsType" v-for="(v1,i1) in props.row.children" :key="i1">
                      <el-tag class="roles_goodsType_first_tag" size="mini" closable>{{v1.authName}}</el-tag>
                      <div class="roles_goodsType_secend" v-for="(v2,i2) in v1.children" :key="i2">
                        <el-tag
                          class="roles_goodsType_secend_tag"
                          size="mini"
                          type="success"
                          closable
                        >{{v2.authName}}</el-tag>
                        <div class="roles_goodsType_third" v-for="(v3,i3) in v2.children" :key="i3">
                          <el-tag
                            size="mini"
                            class="roles_goodsType_third_tag"
                            type="danger"
                            closable
                          >{{v3.authName}}</el-tag>
                        </div>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="描述" prop="roleDesc"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      size="mini"
                      @click="setUsers(scope.$index, scope.row)"
                    >
                      <i class="el-icon-edit"></i>编辑
                    </el-button>
                    <el-dialog title="修改用户" :visible.sync="setUser">
                      <el-form
                        :model="update"
                        ref="update"
                        label-width="100px"
                        class="demo-dynamic"
                      >
                        <el-form-item
                          prop="roleName"
                          label="角色名称"
                          :rules="[
      { required: true, message: '请输入角色名称', trigger: 'blur' },
    ]"
                        >
                          <el-input maxlength="6" v-model="update.roleName"></el-input>
                        </el-form-item>
                        <el-form-item
                          prop="roleDes"
                          label="角色描述"
                          :rules="[
      { required: true, message: '请输入角色描述', trigger: 'blur' },
    ]"
                        >
                          <el-input maxlength="11" v-model="update.roleDes"></el-input>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="setUser = false">取 消</el-button>
                        <el-button :plain="true" type="primary" @click="updateUser">确 定</el-button>
                      </div>
                    </el-dialog>
                    <el-button type="danger" size="mini" @click="del(scope.$index, scope.row)">
                      <i class="el-icon-delete"></i>删除
                    </el-button>
                    <el-button type="warning" size="mini" @click="fenpei(scope.$index, scope.row)">
                      <i class="el-icon-setting"></i> 分配权限
                    </el-button>
                    <el-dialog title="分配权限" :visible.sync="fenpeiRights">
                      <el-tree
                        :data="datas"
                        show-checkbox
                        node-key="id"
                        ref="tree"
                        :props="defaultProps"
                        default-expand-all
                        @check="getId"
                      ></el-tree>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="fenpeiRights = false">取 消</el-button>
                        <el-button :plain="true" type="primary" @click="fenpeiRight">确 定</el-button>
                      </div>
                    </el-dialog>
                  </template>
                </el-table-column>
              </el-table>
            </div>
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
  components: {
  },
  inject: ["reload"],
  data() {
    //这里存放数据
    return {
      dialogFormVisible: false,
      dynamicValidateForm: {
        userDescription: "",
        users: ""
      },
      rolesLists: [],
      setUser: false,
      update: {
        id: "",
        roleName: "",
        roleDes: ""
      },
      fenpeiRights: false,
      datas: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      get:[],
      fenpeiId:''
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getId() {
      this.get = this.$refs.tree.getCheckedNodes()
      console.log(this.get)
    },
    fenpeiRight() {
      let a = []
      this.get.forEach(v=>{
        a.push(v.id)
      })
      a.join()
      let obj={
        id:this.fenpeiId,
        rids:a.join()
      }
      _product.distribution(obj).then(res=>{
        this.$message({
          message:res.data.meta.msg
        })
        this.reload()
      })
    },
    fenpei(i, v) {
      console.log(v)
      this.fenpeiRights = true;
      this.fenpeiId=v.id
      _product.rolesList().then(res=>{
        if(res.data.meta.status==200){
          let arr =[];
          arr.push(v.id)
          v.children.map(item=>{
            arr.push(item.id);
            item.children.map(j=>{
              arr.push(j.id);
              j.children.map(x=>{
                arr.push(x.id)
              })
            })
          })
          this.$refs.tree.setCheckedKeys(arr,true)
        }
      })
    },
    del(i, v) {
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
          _product.delRoles(obj).then(res => {
            console.log(res);
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
    setUsers(i, v) {
      this.setUser = true;
      console.log(v);
      this.update.id = v.id;
      this.update.roleName = v.roleName;
      this.update.roleDes = v.roleDesc;
    },
    updateUser() {
      let obj = {
        id: this.update.id,
        roleName: this.update.roleName,
        roleDesc: this.update.roleDes
      };
      _product.updateRoles(obj).then(res => {
        this.$message({
          message: "修改成功"
        });
        this.reload();
      });
    },
    addUser() {
      let obj = {
        userDiscription: this.dynamicValidateForm.userDescription,
        users: this.dynamicValidateForm.users
      };
      _product.addRoles(obj).then(res => {
        console.log(res.data);
        this.$message({
          message: res.data.meta.msg
        });
        this.reload();
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    _product.rolesList().then(res => {
      this.rolesLists = res.data.data;
    });
    _product.rightsList().then(res => {
      console.log(res.data);
      this.datas = res.data.data;
      // for (let i = 0; i < array.length; i++) {
      //   if(array[i] instanceof Array){
      //     a++;
      //     a
      //   }
      // }
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
.roles_goodsType {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  > div {
    width: 80%;
    display: flex;
    margin-top: 10px;
    width: 80%;
    margin-left: 100px;
    align-items: center;
    .el-tag.el-tag--danger {
      margin-left: 10px;
    }
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
      span:nth-child(1) {
        font-weight: bolder;
      }
    }
    .roles_right_content {
      width: 95%;
      height: 785px;
      background-color: white;
      border-radius: 5px;
      margin: 0 auto;
      padding: 20px;
    }
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>