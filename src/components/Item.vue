<template>

  <div id="app">
    
    

    
    <h1 class="subtitle has-text-centered">Admin</h1>
    <hr />

    <table >
      <tr>
        <td>

        </td>
          </tr>
      

<tr>
        <td>
           <div class="control">
        <a class="button is-info" @click="onGoSell"  >รายการ</a>
      </div>
    <div class="field has-addons">
       
      <div class="control is-expanded">
        <input class="input" v-model="Name" type="text" placeholder="Name" />
        
      </div>

     
    <select class="control is-expanded"  placeholder="Type" v-model="Type" >
        <option selected> ผู้ชาย </option>
        <option >ผู้หญิง</option>
        <option >เด็ก</option>
    </select>

    
       <div class="control is-expanded">
        <input class="input" v-model="Num" min=0 type="number" placeholder="Num" />
      </div>




       <div class="control is-expanded">
        <input class="input" v-model="Price"  min=0 type="number" placeholder="Price" />
      </div>
       <div class="control">
        <a class="button is-info" @click="addItem" :disabled="!Name || !Type  || !Price " >Add</a>
      </div>
        </div>
         </td>
          </tr>
      

<tr>
        <td>
    <div class="notification" v-for="(item, i) in items" :key="item._id">
      <div class="columns">
        <input class="column input" v-if="isSelected(item)" v-model="editedNAME" />
        <input class="column input" v-if="isSelected(item)" v-model="editedTYPE" />
        <input class="column input" v-if="isSelected(item)"  min=0 type="number" v-model="editedNUM" />
        <input class="column input" v-if="isSelected(item)"  min=0 type="number" v-model="editedPRICE" />


        <div v-else class="column">


            <div class="product-image" v-if="item.Name=='adidas'" >
                            <img src= '../assets/adidas.jpg'  width="290" >
             </div>
             
              <div class="product-image" v-if="item.Name=='nike'" >
                            <img src= '../assets/nike.jpg'  width="290" >
             </div>
             <div class="product-image" v-if="item.Name=='Adidas 360i'" >
                            <img src= '../assets/Adidas 360i.jpg'  width="290" >
             </div>
             <div class="product-image" v-if="item.Name=='FY8936'" >
                            <img src= '../assets/FY8936.jpg'  width="290" >
             </div>
             <div class="product-image" v-if="item.Name=='Galaxy5'" >
                            <img src= '../assets/Galaxy5.jpg'  width="290" >
             </div>
             <div class="product-image" v-if="item.Name=='Stan smith'" >
                            <img src= '../assets/Stan smith.jpg'  width="290" >
             </div>
             <div class="product-image" v-if="item.Name=='Stan white'" >
                            <img src= '../assets/Stan white.jpg'  width="290" >
             </div>
              <div class="product-image" v-if="item.Name=='Ultraboost 21'" >
                            <img src= '../assets/Ultraboost 21.jpg'  width="290" >
             </div>
          <br> 
          {{ item.Name}}
          <br>
         ประเภท : {{ item.Type}}
           <br>
         จำนวน : {{ item.Num }} คู่
           <br>
      
          ราคา : {{ item.Price }} บาท











        </div>

        









        <div class="column is-narrow">
          <span
            class="icon has-text-primary"
            @click="isSelected(item) ?  unselect() : select(item)"
          >
            <i class="material-icons">{{isSelected(item) ? 'close': 'edit'}}</i>
          </span>

          <span
            class="icon has-text-info"
            @click="isSelected(item) ? updateItem(item, i) : removeItem(item, i)"
          >
            <i class="material-icons">{{isSelected(item) ? 'save': 'delete'}}</i>
          </span>
        </div>
      </div>
    </div>
     </td>
          </tr>
      
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
   
    return {
      items: [],
      Name: "",
         image:"",
      Type:"",
      Num: "",
    
      Price:"",
       editedNAME: "",
      editedTYPE:"",
      editedNUM:"",
        editedPRICE:"",
        editedimage:"",
         selectedVariant: 0,
       
      
     
      selected: {}
    };
  },
  async mounted() {
    const response = await axios.get("http://backjs.app.ruk-com.cloud/api/bucketListItems/");
    this.items = response.data;
  },
  methods: {
     async onGoSell() {
       
 this.$router.push({ path: "/Sell" });
     
    
      
      },
    async addItem() {

      const response = await axios.post("http://backjs.app.ruk-com.cloud/api/bucketListItems/", {
        
     image: this.image,
        Name: this.Name,
        
        Type: this.Type,
        Num: this.Num,
       
        Price: this.Price
      });
      this.items.push(response.data);
   
      this.Name = "";
      this.Type = "";
       this.Num = "";
     
      this.Price = "";
    },
    async removeItem(item, i) {
      await axios.delete("http://backjs.app.ruk-com.cloud/api/bucketListItems/" + item._id);
      this.items.splice(i, 1);
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
    async updateItem(item, i) {
      const response = await axios.put("http://backjs.app.ruk-com.cloud/api/bucketListItems/" + item._id, {
   
        Name: this.editedNAME,
        Type:this.editedTYPE ,
        Num: this.editedNUM,
      
        Price:this.editedPRICE 
      });
      this.items[i] = response.data;
      this.unselect();
    },
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
   },
   
  }
};
</script>

<style>
#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}
.icon {
  cursor: pointer;
}
</style>