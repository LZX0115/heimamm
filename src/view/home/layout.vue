<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold setheight" @click="collapse=!collapse"></i>
        <img class="marginlr" src="@/assets/img/loginLogo.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img class="avatar" :src="$store.state.userInfo.avatar" alt />
        <span class="name">{{$store.state.userInfo.username}}，您好</span>
        <el-button @click="exit" type="primary">退出</el-button>
      </div>
    </el-header>

    <el-container>
      <el-aside width="auto" class="aside">
        <!-- collapse控制菜单是否折叠 
        加上它，它就会在el-menu上产生一个class   el-menu--collapse
           /* 该动画实现实际 就是一个transition  width
    transition动画实现，要有效果，要起始width  结束时的width,width动画才会有
     */
        然后为了实现动画效果，我们得给一个初始宽度，因为默认是没设置宽度的
        menuTransition就是el-menu上定义的一个class 
        .menuTransition:not(.el-menu--collapse) {
         // 初始宽度
         width: 160px;
          }
          注意点：我们得设置el-aside的宽度为auto,不能写死，不然就没有适配效果了
        -->
        <el-menu
          :router="true"
          :default-active="$route.fullPath"
          :collapse="collapse"
          class="menuTransition"
        >
        <el-menu-item
          :index="'/home/' +item.path"
          v-for="(item, index) in $router.options.routes[1].children" :key="index"
          v-show="item.meta.rules.includes($store.state.role)"
        >
          <i :class="item.meta.icon"></i>

        <span slot="title">{{item.meta.title}}</span>

        </el-menu-item>
        
          <!-- <el-menu-item index="/home/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/home/userList">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/home/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/home/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/home/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { getUserInfo, exitLogin } from "@/api/home.js";
import { removeToken, getToken } from "@/utils/token.js";
export default {
  data() {
    return {
      userInfo: "",
      collapse: false //是否折叠菜单
    };
  },
  created() {
    // 获取用户信息
    getUserInfo().then(res => {
      this.userInfo = res.data;
      this.userInfo.avatar =
        process.env.VUE_APP_URL + "/" + this.userInfo.avatar;
      this.$store.state.userInfo = this.userInfo;
      this.$store.state.role = res.data.role;
      // 一般情况我们会将角色存储到vuex，以便其他地方使用
      if (res.data.status == 0) {
        //当账号被禁用时提示一下
        this.$message.warning("您的账号已被禁用，请联系管理员!");
        //清除token
        removeToken();
        //跳转登录页
        this.$router.push("/");
      }else {
        window.console.log("当前路由的元信息",this.$route.meta);
        if (!this.$route.meta.rules.includes(res.data.role)) {
          // 不允许 访问处理
           //当账号被禁用时提示一下
        this.$message.warning("您的账号已被禁用，请联系管理员!");
        //清除token
        removeToken();
        //跳转登录页
        this.$router.push("/");
        }
      }
      window.console.log("用户信息：", res);
    });
    //  首页进行token判断，没有token的话就跳转到登录页
    if (!getToken()) {
      this.$router.push("/");
      return;
    }
  },
  methods: {
    exit() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // 退出接口调用
        exitLogin().then(() => {
          // 删除Token
          removeToken();
          // 跳转登录页
          this.$router.push("/");
        });
      });
    }
  }
};
</script>

<style lang="less">
.layout {
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    .left {
      .setheight {
        font-size: 20px;
      }
      .marginlr {
        margin-left: 10px;
        margin-right: 10px;
      }
      .title {
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }
    .right {
      display: flex;
      align-items: center;
      .avatar {
        width: 43px;
        height: 43px;
      }
      .name {
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
  .aside {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  }
  .menuTransition:not(.el-menu--collapse) {
    // 初始宽度
    width: 160px;
  }
  .main {
    background-color: #e8e9ec;
  }
}
</style>