<!--  -->
<template>
  <div class="roles">
    <div class="roles_content">
      <div class="roles_right">
        <p class="roles_right_title">
          <span>首页></span>
          <span>商品管理></span>
          <span>商品商品列表></span>
        </p>
        <div class="roles_right_content">
          <el-alert title="添加商品信息" :closable="false" type="info"></el-alert>
          <div class="add_content">
            <el-steps :active="active" finish-status="success" class="steps_list">
              <el-step title="基本信息"></el-step>
              <el-step title="商品参数"></el-step>
              <el-step title="商品属性"></el-step>
              <el-step title="商品图片"></el-step>
              <el-step title="商品内容"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>
            <el-tabs
              @tab-click="handleClick"
              :tab-position="tabPosition"
              :before-leave="leave"
              style="height: 100%; marginTop:20px"
            >
              <el-tab-pane label="基本信息">
                <el-form
                  :model="numberValidateForm"
                  ref="numberValidateForm"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item
                    label="商品名称"
                    prop="goodName"
                    :rules="[
      { required: true, message: '商品名称不能为空'},
      
    ]"
                  >
                    <el-input
                      type="text"
                      v-model.number="numberValidateForm.goodName"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="商品价格"
                    prop="goodPrice"
                    :rules="[
      { required: true, message: '商品价格不能为空'},
      { type: 'number', message: '商品价格必须为数字值'}
    ]"
                  >
                    <el-input
                      type="number"
                      v-model.number="numberValidateForm.goodPrice"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="商品重量"
                    prop="goodWeight"
                    :rules="[
      { required: true, message: '商品重量不能为空'},
      { type: 'number', message: '商品重量必须为数字值'}
    ]"
                  >
                    <el-input
                      type="number"
                      v-model.number="numberValidateForm.goodWeight"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="商品数量"
                    prop="goodNum"
                    :rules="[
      { required: true, message: '商品数量不能为空'},
      { type: 'number', message: '商品数量必须为数字值'}
    ]"
                  >
                    <el-input
                      type="number"
                      v-model.number="numberValidateForm.goodNum"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="商品分类" prop="goodsClass">
                    <div class="block">
                      <el-cascader
                        v-model="acc1"
                        :options="options"
                        ref="getGoodclass"
                        :props="{ expandTrigger: 'hover',label:'cat_name',value:'cat_id' }"
                        @change="handleChange"
                      ></el-cascader>
                    </div>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="商品参数">
                <div v-for="(v,i) in shopcan" :key="i">
                  <p>{{v.attr_name}}</p>
                  <el-checkbox
                    v-for="(item,index) in v.attr_vals.split(' ')"
                    v-if="v.attr_vals!==''"
                    :checked="true"
                    :key="'item'+index"
                    @change="show(v,i,item,index)"
                    :label="item"
                    border
                  ></el-checkbox>
                </div>
              </el-tab-pane>
              <el-tab-pane label="商品属性">
                <div v-for="(v,i) in shuxings" :key="i">
                  <p>{{v.attr_name}}</p>
                  <el-checkbox
                    v-if="v.attr_vals!==''"
                    v-for="(item,index) in v.attr_vals.split(' ')"
                    :checked="true"
                    :key="item"
                    @change="show1(v,i,item,index)"
                    :label="item"
                    border
                  ></el-checkbox>
                </div>
              </el-tab-pane>
              <el-tab-pane label="商品图片">
                <el-upload
                  class="upload-demo"
                  action="http://www.wyunfei.com:7001/api/private/v1/upload"
                  :on-preview="handlePreview"
                  :on-success="handleRemove"
                  :file-list="fileList"
                  list-type="picture"
                  :headers="headers"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-tab-pane>
              <el-tab-pane label="商品内容">
                <quill-editor
                  ref="text"
                  v-model="content"
                  class="myQuillEditor"
                  :options="editorOption"
                />
                <el-button type="primary" :plain="true" @click="submit">提交</el-button>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { quillEditor } from "vue-quill-editor";
import Product from "../services/views-services";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
const _product = new Product();
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    quillEditor
  },
  data() {
    //这里存放数据
    return {
      tabPosition: "left",
      active: 0,
      numberValidateForm: {
        goodName: "",
        goodPrice: "",
        goodWeight: "",
        goodNum: ""
      },
      options: [],
      value: [],
      acc1: [],
      canshu: [],
      shuxings: [],
      fileList: [],
      headers: {
        Authorization: ""
      },
      pictures: [],
      content: "",
      editorOption: {},
      shopcan: []
    };
  },
  props: ["catchData"],
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化f
  watch: {},
  //方法集合
  methods: {
    show(v, i, j, index) {
      let attr = this.shopcan[i].attr_vals.split(" ");
      attr.splice(index, 1);
      this.shopcan[i].attr_vals = attr.join(" ");
    },
    show1(v, i, j, index) {
      let attr = this.shuxings[i].attr_vals.split(" ");
      attr.splice(index, 1);
      this.shuxings[i].attr_vals = attr.join(" ");
      console.log(this.shuxings[i]);
    },
    handleChange(value) {
      this.acc1 = value;
      _product.attributes(this.acc1[2]).then(res => {
        this.shopcan = res.data.data;
        res.data.data.forEach(v => {
          let attrs = {};
          (attrs.attr_id = v.attr_id), (attrs.attr_value = v.attr_name);
          this.canshu.push(attrs);
        });
        console.log(this.canshu);
      });
      _product.shuxing(this.acc1[2]).then(res => {
        this.shuxings = res.data.data;
      });
    },
    handleClick(v) {
      if (this.acc1.length <= 0) {
        this.$message({
          type: "error",
          message: "请补充商品信息"
        });
      } else {
        this.active = Number(v.index);
      }
    },
    handleRemove(response, file, fileList) {
      let pic = {
        pic: response.data.tmp_path
      };
      this.pictures.push(pic);
    },
    handlePreview(file) {
      console.log(file);
    },
    leave(active) {
      if (this.acc1.length <= 0) {
        if (
          active == 1 ||
          active == 2 ||
          active == 3 ||
          active == 3 ||
          active == 4
        ) {
          return false;
        }
      }
    },
    submit() {
      let obj = {
        goods_name: this.numberValidateForm.goodName,
        goods_price: this.numberValidateForm.goodPrice,
        goods_weight: this.numberValidateForm.goodWeight,
        goods_number: this.numberValidateForm.goodNum,
        goods_cat: this.acc1.join(),
        goods_introduce: this.$refs.text.value,
        pics: JSON.stringify(this.pictures),
        attrs: JSON.stringify(this.canshu)
      };
      _product.addGoods(obj).then(res => {
        if (res.data.meta.status == 201) {
          this.$message({
            message: res.data.meta.msg
          });
          this.$router.push({
            path: "/goods"
          });
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let token = JSON.parse(localStorage.getItem("token"));
    this.headers.Authorization = token;
    _product.goodsClass().then(res => {
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
    }
  }
}
.add_content {
  width: 95%;
  margin: 0 auto;
  margin-top: 20px;
  .steps_list {
    width: 92%;
    margin: 0 auto;
  }
}
</style>