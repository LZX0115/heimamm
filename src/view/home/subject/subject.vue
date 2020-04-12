<template>
   <div class="subject" >
       <el-card>
           <el-form label-width="90px" :inline="true" :model="form">
               <el-form-item label="学科编号" >
                   <el-input class="setWidth" v-model="form.rid"> </el-input>
               </el-form-item>
               <el-form-item label="学科名称">
                   <el-input  class="setWidth" v-model="form.name"> </el-input>
               </el-form-item>
               <el-form-item label="创建者" >
                   <el-input class="setWidth" v-model="form.username"> </el-input>
               </el-form-item>
               <el-form-item label="状态" >
                  <el-select placeholder="请选择状态" class="setWidth" v-model="form.status"> 
                      <el-option label="启用" value ="1"></el-option>
                      <el-option label="禁用" value ="0"></el-option>
                  </el-select>
               </el-form-item>
                  <el-form-item>
                  <el-button type="primary">搜索</el-button>
                  <el-button >清除</el-button>
                  <el-button type="primary">+新增学科</el-button>
               </el-form-item>
           </el-form>
       </el-card>
       <el-card>
        <el-table :data="tableData">
        <el-table-column label="序号" width="50px">
          <template slot-scope="scope">{{scope.$index+1}}</template>
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
            <el-button>编辑</el-button>
            <el-button @click="setStatus(scope)">禁用</el-button>
            <el-button>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>
  </div>
       </el-card>
   </div>
</template>

<script>
import {getSubjectData} from '@/api/subject.js'
export default {
    data() {
        return {
            pagination:{
                pageSize:10,
                currentPage:1,
                  total: 40
            },
            form:{
                rid:"",  //学科编号 
                name:"", //学科名称 
                username:"",//创建者 
                status:"", //状态
                
            },
             tableData: [] //列表数据
        }
    },
    created() {
    getSubjectData().then(res =>{
        window.console.log(res);
        this.tableData =res.data.items;
    })
},
methods: {
     // 设置状态
    setStatus(scope) {
      window.console.log(scope);
    },
    // 页容量改变时
    handleSizeChange(size) {
      this.pagination.pageSize = size;
    },
    // 页码改变时
    handleCurrentChange(page) {
      this.pagination.currentPage = page;
    }
},
}

</script>

<style lang="less">
.subject {
    .setWidth{
        width: 140px;
    }
    .pagination{
        text-align: center;
    margin-top: 30px;
    }
    }
</style>