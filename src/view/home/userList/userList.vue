<template>
   <div>
       用户列表
       
   </div>
   
</template>

<script>
export default {
    created() {
        document.title= this.$route.meta.title
        console.log(this.$route);
    },
   
}
//  this.$router.meta.title
</script>

<style>

</style>