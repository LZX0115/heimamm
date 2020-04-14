<template>
  <div class="subject">
    <el-card>
      <el-form label-width="90px" :inline="true" :model="form" ref="form">
        <el-form-item label="学科编号" prop="rid">
          <el-input class="setWidth" v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input class="setWidth" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="setWidth" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select placeholder="请选择状态" class="setWidth" v-model="form.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset" >清除</el-button>
          <el-button type="primary" @click="add">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="tableData">
        <el-table-column label="序号" width="50px">
          <template slot-scope="scope">{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="学科编号 " prop="rid"></el-table-column>
        <el-table-column label="学科名称 " prop="name"></el-table-column>
        <el-table-column label="简称" prop="short_name"></el-table-column>
        <el-table-column label="创建者 " prop="username"></el-table-column>
        <el-table-column label="创建日期 " prop="create_time"></el-table-column>
        <el-table-column label="状态" width="100px">
          <template slot-scope="scope">{{scope.row.status==1?'启用':'禁用'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="270px">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button @click="setStatus(scope.row.id)">{{scope.row.status==0?'启用':'禁用'}}</el-button>
            <el-button @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[2, 20, 30, 40]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 使用 -->
    <addSubject ref="addSubject" :mode="mode" @add="search"></addSubject>
  </div>
</template>

<script>
import { getSubjectData,getSubjectStatus, delSubjectData } from "@/api/subject.js";
// 导入
import addSubject  from './addSubject.vue'
export default {
  data() {
    return {
       mode:"add", //用于子组件区分当前是新增还是编辑  add新增 ，edit:编辑
      pagination: {
        pageSize: 2, //页面容量
        currentPage: 1, // 当前页
        total: 40 ,//总条数
       
      },
      form: {
        rid: "", //学科编号
        name: "", //学科名称
        username: "", //创建者
        status: "" //状态
      },
      tableData: [] //列表数据
    };
  },
  // 注册
  components:{ addSubject },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let _params = {
        page: this.pagination.currentPage, //页码
        limit: this.pagination.pageSize, //页容量
        ...this.form
      };
      getSubjectData(_params).then(res => {
        window.console.log(res);
        this.tableData = res.data.items;
        this.pagination.total = res.data.pagination.total;
      });
    },
    // 设置状态
    setStatus(id) {
      getSubjectStatus({id:id}).then(()=> {
        // 调用状态成功
        this.$message.success("设置状态成功")
        // 刷新数据
        this.search();
      })
    },
    // 页容量改变时
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.pagination.currentPage = 1;
      this.getData();
    },
    // 页码改变时
    handleCurrentChange(page) {
      this.pagination.currentPage = page;
      this.getData();
    },
    // 搜索点击
    search() {
      this.pagination.currentPage =1;
      this.getData();
    },
       // 清除功能
    reset() {
      // 调用表单的resetFields,
      // 1:它使用前提是参数都有相应的prop绑定
      //2:在form表单上定义一个ref=值   通过ref调用resetFields
      this.$refs.form.resetFields();
      // this.form = {
      //   rid: "", //学科编号
      //   name: "", //学科名称
      //   username: "", //创建者
      //   status: "" //状态
      // };
      //调用搜索
      this.search();
    },
    // 删除功能
      del(id) {
        this.$confirm('您确定要删除此条数据吗?', '友情提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           //点击确认的处理
          // 调用接口
          window.console.log(id);
         delSubjectData({id:id}).then(() =>{
            this.$message.success("删除成功");
            // 调用搜索刷新数据
            this.search();
         })
        }).catch(() => {
                   //点击 取消的处理
        });
      },
      // 新增功能
      add(){
          this.mode ="add";
          this.$refs.addSubject.form = {
             rid: "", //学科编号
        name: "", //学科名称
        short_name: "", //学科简称
        intro: "", //学科简介
        remark: "" //备注
          }
          
          this.$refs.addSubject.dialogFormVisible=true;
      },
      edit(row){
        window.console.log(row);
        this.mode = "edit";
          // 通过ref属性修改addSubject组件的form表单的值
          this.$refs.addSubject.form = JSON.parse(JSON.stringify(row));
        // 弹出对话框
         this.$refs.addSubject.dialogFormVisible=true;
      }
  }
}; 
</script>

<style lang="less">
.subject {
  .setWidth {
    width: 140px;
  }
  .pagination {
    text-align: center;
    margin-top: 30px;
  }
}
</style>