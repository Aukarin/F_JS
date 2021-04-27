<template>
<div id="app">
    <div class="container">
        <div v-if="!image">
        <input type="file" class="form-control" @change="onFilechange">
        </div>
         <div v-else>
        <img :src="image" width="260"  class="img-fluid">
        <br>
        <button class="btn btn-danger" @click="removeImage">Remove</button>
        </div>
    </div>


</div>
</template>

<script>
export default {
   name:'App',
   data(){
       return{
           image:""
       }
   },
   methods:{
       onFilechange:function(e){
           var files=e.target.files
           if(!files.length)
             return
           this.createImage(files[0]);
            
       },
       createImage(files){
           var reader=new FileReader();
           reader.onload=(e)=>{

           this.image=e.target.result;                
            }
            reader.readAsDataURL(files)
   },
   removeImage(){
       this.image="";
   }
}

}
</script>
