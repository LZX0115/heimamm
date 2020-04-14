<template>
  <el-dialog :visible.sync="dialogFormVisible" class="addSubject" >
      <div slot="title" class="title">{{mode=='add'?'新增学科':"编辑学科"}}</div>
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
          <el-form-item label="学科编号" prop="rid">
              <el-input v-model="form.rid"></el-input>
          </el-form-item>
          <el-form-item label="学科名称" prop="name">
              <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="学科简称" prop ="short_name">
              <el-input v-model="form.short_name"></el-input>
          </el-form-item>
          <el-form-item label="学科简介" prop ="intro">
              <el-input v-model="form.intro"></el-input>
          </el-form-item>
          <el-form-item label="学科备注" prop="remark">
              <el-input v-model="form.remark"></el-input>
          </el-form-item>
      </el-form>
  <div slot="footer" >
          <!-- 加入校验
    1:el-form   :rules="rules"  
       data里面定义相关的rules:{}
    2:el-form-item把需要校验的项绑定prop

    3:加入全局校验  el-form组件里面的方法 validate
       1：在el-form上定义一个ref属性
       2：this.$refs.值.validate((result)=>{
           //验证后的处理
       })
    
    -->
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitClick" >确 定</el-button>
  </div>
  </el-dialog>
</template>

<script>
import {addSubjectData,editSubjectData} from '@/api/subject.js'
export default {
        props:{
            mode:{
                type:String,
                default:"add"
            }
        },
       data() {
    return {
      dialogFormVisible: false,//设置弹框显示与消失
      form: {
        rid: "", //学科编号
        name: "", //学科名称
        short_name: "", //学科简称
        intro: "", //学科简介
        remark: "" //备注
      },
      rules:{
          rid:[{required:true,message:"请输入学科编号！",trigger:"blur"}],
          name:[{required:true,message:"请输入学科名称！",trigger:"blur"}],
      }
    }
    },

    watch: {
    dialogFormVisible(newVal) {
      if (newVal == false) {
        // 清空表单  注意，需要清空的项一定要在el-form-item上加上prop绑定相应字段
        this.$refs.form.resetFields();
      }
    },
    mode(){
        // 异步请求  取消校验红色提示
        this.$nextTick(() =>{
            this.$refs.form.clearValidate();
        })
    }
  },
    methods: {
        // 点击确定
        submitClick() {
            // 全局验证  反选rules里面的校验
      this.$refs.form.validate(result =>{
          window.console.log(result);
          if(result) {
              if (this.mode == "add") {
                      addSubjectData(this.form).then(() =>{
                  this.$message.success("新增成功");
                //   关闭对话框
                  this.dialogFormVisible=false;
                      //   重新搜索刷新数据
                //   this.$parent.search();
                this.$emit("add");
              })
              }else {
                 editSubjectData(this.form).then(() =>{
                     this.$message.success("编辑成功");
                //   关闭对话框
                  this.dialogFormVisible=false;
                //   this.$parent.search();
                 // 使用emit实现
              //1：在父组件使用该组件身上绑定相应方法  @方法名="search"
              //2在该组件身上触发方法  this.$emit("方法名")
            //   重新搜索刷新数据
             this.$emit("add");
                 }) ;
              }
          
          }
      });
    }
    },
}
</script>

<style lang="less">
.addSubject{
    .title{
        text-align: center;
        color: #fff;
        background-color: rgb(14,159,249);
        height: 53px;
        line-height: 53px;
    }
    .el-dialog__header{
        padding: 0;
    }
   .el-dialog__headerbtn .el-dialog__close {
    color:#fff;
}
    .footer{
        text-align: center;
    }
}
</style>