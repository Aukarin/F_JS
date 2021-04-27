<template>
  <div>
    <!-- Nav bar -->  
  


     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
       <router-link to="/Show" class="nav-link">Sneakers</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-text" id="navbarSupportedContent" >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <router-link to="/Man" class="nav-link">ผู้ชาย</router-link>
            </li>
            
            <li class="nav-item">
              <router-link to="/Girl" class="nav-link">ผู้หญิง</router-link>
            </li>
          
            <li class="nav-item">
             <router-link to="/Child" class="nav-link">เด็ก</router-link>
            </li>
            

 <div  v-for="(item) in items" :key="item._id"  >
             <li class="nav-item" >
              <div  v-if="items.length == 1 ">
        
            <router-link to="/My" class="nav-link">ที่ต้องได้รับ</router-link>
          </div>
            </li>

       

      </div>
        
            <li class="nav-item"   >



              

        <div  v-for="(item,i) in items" :key="item._id"  >
            <div v-if="item.Sta == 1 " >
            
                  <a @click="removeItem(item, i)"  class="nav-link">Log Out</a>

            </div>
             
       

      </div>
      <div  v-if="items.length == 0 ">

              <a href="/Login" class="nav-link">Log in</a>
             
            </div>
             
            </li>
            
          
            <li class="nav-item" >
              <div  v-if="items.length == 0 ">
        
            <router-link to="/Sing" class="nav-link">Sing up</router-link>
          </div>
            </li>
          
      



            </ul>





          


        </div>
      </div>
    </nav>

    <!-- Router view -->
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "App",
  data() {
   
    return {
        
         item_i:this.$route.params.ITEM,
      items: [],
      Address:"",
      User:"",
      Pass: "",
      Sta:"",
        
       user:"",
      pass: "",

    checkID:"Login",
      Price:"",
       Name: "",
      editedTYPE:"",
       editedNUM: "",
        editedPRICE:"",
     
      selected: {},
      
    };
  },
  
 
async  isSelected(item) {
      return item._id === this.selected._id;
    },
async select(item) {
    this.selected = item;
    this.editedNAME = item.Name;
    this.editedTYPE = item.Type;
    this.editedNUM = item.Num;
    this.editedPRICE = item.Price;
    },
  async mounted() {
   
    
    const response = await axios.get("http://backjs.app.ruk-com.cloud/api/statuss/");
  
    this.items = response.data;
   
    
  
   
  },
  methods: {
   async check(checkID){
     this.checkID =("Username or Password worng")
        return (checkID)

    },
     async onGoClicks(item) {
       
 this.$router.push({ name: "Buy",params:{ITEM:item} });
     
     
      
      
      
     
        
      
      },
    async addItem() {
      

      this.Sta ="1"
      const response = await axios.post("http://backjs.app.ruk-com.cloud/api/statuss/", {
     
        User: this.user,
        
        Pass: this.pass,
        Sta: this.Sta,
       
      });
      this.items.push(response.data);
      this.User = "";
     
      this.Pass = "";
       this.Sta = "";
       this.$router.push({ path:"/Show" });
    },
    async removeItem(item, i) {
      await axios.delete("http://backjs.app.ruk-com.cloud/api/statuss/" + item._id);
      this.items.splice(i, 1);
       this.$router.push({ path:"/Login" });
    },
    select(item) {
      this.selected = item;
      this.editedNAME = item.Name;
       this.editedTYPE = item.Type;
         this.editedNUM = item.Num;
       this.editedPRICE = item.Price;
    },
    isSelected(item) {
      return item._id === this.selected._id;
    },
    unselect() {
      this.selected = {};
      this.editedNAME = "";
      this.editedTYPE = "";
      this.editedNUM = "";
      this.editedPRICE = "";
      
    },
    async updateItemA(item, i,editedNUM) {
      {{this.editedNUM = item.Num-editedNUM }}
      
      const response = await axios.put("http://backjs.app.ruk-com.cloud/api/bucketListItems/" + item._id , {
    
        Num: this.editedNUM,
      });
      this.items[i] = response.data; 
      this.$router.push({ name: "Buy",params:{ITEM:item} });
      
      
    },
    async updateItem(item, i) {
      this.Sta ='0'
      const response = await axios.put("http://backjs.app.ruk-com.cloud/api/users/" + item._id, {
   
      
        Sta:this.Sta,
      });
      this.items[i] = response.data;
      this.unselect();
    },
  }
};
</script>
