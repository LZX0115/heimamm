<template>
  <el-dialog class="addUserList" :visible.sync="dialogVisible" width="600px">
    <div slot="title" class="title">{{mode=="add" ?'新增用户':'编辑用户'}}</div>
    <el-form :model="form" label-width="100px" :rules="rules" ref="form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
       <el-form-item label="角色"  prop="role_id">
            <el-select class="setWidth" v-model="form.role_id">
                <!-- v-for
                    数组 v-for="(intem,index) in 数组"
                    对象 v-for =(value,key,index(序号，从0开始) in 对象)
                 -->
                 <!-- vuex访问 this.$store.state.roleObj -->
                <el-option
                 v-for="(value,key,index) in $store.state.roleObj"
                  :key ="index" 
                  :value="key" 
                  :label="value">

                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
        <el-select placeholder="请选择状态" v-model="form.status">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="用户备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
         </el-form>
    <div slot="footer" class="footer">
      <el-button @click="dialogVisible =false">取消</el-button>
      <el-button type="primary" @click="submitClick">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addUserData,editUserData } from "@/api/user.js";
export default {
   props: ["mode"],
  data() {
    return {
      dialogVisible: false,
      rules: {
        username: [{ required: true, message: "请输入用户名！", trigger:"blur" }],
        //自定义表单验证
        // validator:(rule,value,callback) =>{}
        email :[{ required: true, message: "请输入邮箱！", trigger:"blur" },
                {
                    validator:(rule,value,callback) =>{
                        let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                        if (_reg.test(value)) {
                            callback()
                        } else {
                            callback("请输入正确的邮箱号！")
                        }
                    },
                    trigger: "blur"
                }
        ],
         phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请正确输入手机号！");
              }
            },
            trigger: "blur"
          }
        ],
        role_id: [{ required: true, message: "请选择角色", trigger: "change" }]
      },
      form: {
        username:"",
        email:"",
        phone:"",
        role_id:"",
        status:"",
        remark:""
      }
      
    };
  },
    // 打开弹框时清空一下验证就OK了
  watch: {
    // 写出需要监听的值，转换成去this的字符串，它本质是一个function(newVal,oldVal){}
    dialogVisible(newVal) {
      if (newVal == true) {
        //  执行一次清空验证处理
        // 使用表单的clearValidate()
        // 注意点，第一次打开弹框时，form表单根本没渲染出来，我们是访问不了的，需要加一个延时处理
        //$nextTick
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
        window.console.log(this.$refs.form);
      }
    }
  },

  methods: {

    submitClick(){
      // 全局验证表单
      //1：在el-form上定义一个ref  2:this.$refs.值.validate(result=>{})
      this.$refs.form.validate(result =>{
        window.console.log(result);
        if (result) {
            if (this.mode =="add") {
                 //验证通过，调用接口  1.导入接口  2.调用
          addUserData(this.form).then(() =>{
            this.$message.success("添加成功")
            this.dialogVisible =false

            //刷新企业列表
            this.$parent.search();
          });
            }else {
          // 调用编辑接口
          editUserData(this.form).then(() =>{
            this.$message.success("编辑成功");
            this.dialogVisible = false;
            // 刷新企业列表
            this.$parent.search();
          })
        }
         
        }
      })
    },

  },
};
</script>

<style lang="less">
.addBusiness {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .title {
    height: 53px;
    text-align: center;
    color: #fff;
    background-color: rgb(14, 156, 250);
    line-height: 53px;
  }
  .footer {
    text-align: center;
  }
}
</style>