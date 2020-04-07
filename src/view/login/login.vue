<template>
  <!-- 最外层标签的class名字使用组件名     -->
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/img/loginLogo.png" alt />
        <span class="titleName">黑马面面</span>
        <span class="titleLine">|</span>
        <span class="titleName2">用户登陆</span>
      </div>

      <!-- 表单 -->
    <el-form :model="form" :rules='rules' ref="form">
      <el-form-item prop='phone'>
        <el-input prefix-icon="el-icon-user" v-model="form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
          <el-input
            :show-password="true"
            prefix-icon="el-icon-lock"
            v-model="form.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop='code'>
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" prefix-icon="el-icon-key" placeholder="请输入图形验证码"></el-input>
            </el-col>
            <el-col :span="8">
            <img src="@/assets/img/key.png" class="key" alt="">
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item v-model="form.isCheck">
          <el-checkbox>我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
         <el-button class="btn" type="primary" @click="loginClick">登录</el-button>
        </el-form-item>
        <el-form-item>
         <el-button class="btn" type="primary">注册</el-button>
        </el-form-item>
    </el-form>
 
    </div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form:{
        phone:"", // 手机号
        password:"",  //密码
        isCheck:"", //条款
        code:''//验证码

      },
      rules:{
        phone:[{required: true, message: '请输入手机号', trigger: 'change'},],
        password:[{required: true, message: '请输入密码', trigger: 'change'},
        {min:6,max:12,message:"请输入6-12位长度的密码",trigger: 'change'}
        ],
         code:[{required: true, message: '请输入图形验证码', trigger: 'change'},
        {min:4,max:4,message:"请输入正确的验证码",trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    loginClick(){
      this.$refs.form.validate(result =>{
        this.$message.success(result+'')
      })
    }
  },

};
</script>

<style lang="less">
.login {
  // 弹性盒子布局
  display: flex;
  //   主轴布局
  justify-content: space-around;
  //   侧轴居中
  align-items: center;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 43px;
    .title {
      margin-bottom: 20px;
      .titleName {
        font-size: 24px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-left: 15px;
        margin-right: 15px;
      }
      .titleLine {
        color: #ccc;
        font-size: 24px;
      }
      .titleName2 {
        font-size: 22px;
        margin-left: 15px;
      }
    }
    .key {
      width: 100%;
      height: 40px;
    }
    .btn{
      width: 100%;
    }
  }
}
</style>