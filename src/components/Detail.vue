<template>

  <div id="app">
    
    

    
    
      
    <div  v-for="(item,i) in items" :key="item._id">
      
        <input class="column input" type="hidden" v-if="isSelected(item)" v-model="editedNAME" />
        <input class="column input" type="hidden" v-if="isSelected(item)" v-model="editedTYPE" />
        <input class="column input" type="hidden" v-if="isSelected(item)" v-model="editedPRICE" />
       
   <div v-if=" item_i == item._id" class="about-container">
      
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
              <div >
          <br>
          {{ item.Name }}
          <br>
            ประเภท : {{ item.Type}}
           <br>
             จำนวน : {{ item.Num }} คู่
          <br>
         
           ราคา : {{ item.Price }} บาท
         </div >
        
        <div >
          
         <div v-if="isSelected(item)">
          
           <div  v-if =" item.Type == 'ผู้ชาย'">
           เลือกไซส์ <select class="control is-expanded"  placeholder="Size"   >
        <option selected> 40 </option>
        <option >41</option>
        <option >42</option>
    </select>
          </div>
           <div  v-if =" item.Type == 'ผู้หญิง'">
           เลือกไซส์ <select class="control is-expanded"  placeholder="Size"   >
        <option selected> 37 </option>
        <option >38</option>
        <option >49</option>
    </select>
          </div>
           <div  v-if =" item.Type == 'เด็ก'">
           เลือกไซส์ <select class="control is-expanded"  placeholder="Size"   >
        <option selected> 20 </option>
        <option >21</option>
        <option >22</option>
    </select>
          </div>
          
       จำนวน <input  type="number" min= 1  v-model="editedNUM" /> คู่
              
      
       
        </div>

         
    </div>
      
         
        <div class="column is-narrow" v-if="item.Num > 0  ">

                <div v-if=" users.length > 0  " >
          <span
            class="icon has-text-primary"
            @click="isSelected(item) ?  unselect() : select(item)"
          >
            <i class="material-icons">{{isSelected(item) ? '': 'ซื้อ'}}</i>
          </span>
          
          </div>
          
                <div v-if=" users.length < 1  " >
          <span
            class="icon has-text-primary"
            @click="isSelected(item) ?  unselect() : onGoLog()"
          >
            <i class="material-icons">{{isSelected(item) ? '': 'ซื้อ'}}</i>
          </span>
          
          </div>
          
          </div>

          


        

           <div class="column is-narrow" v-if="item.Num < 1 ">
          <span
            class="icon has-text-danger"  
          >
            <i class="material-icons">{{isSelected(item) ? '': 'สินค้าหมด'}}</i>
          </span></div>
          


<div class="column is-narrow">
          <span
            class="icon has-text-info"
            @click="isSelected(item) ? updateItem(item, i,editedNUM) : select(item)"
          >
            <i class="material-icons">{{isSelected(item) ? 'ตกลง': ''}}</i>
          </span>
        </div>
     

      </div>




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
      users: [],
      Numitem:"",
      Name: "",
      Type:"",
      Num: "",
    
      Price:"",
       editedNAME: "",
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
    
    
    const response = await axios.get("api/bucketListItems/");
  
    this.items = response.data;
   
    
    const responses = await axios.get("api/statuss/");
  
    this.users = responses.data;
    
  
   
  },
  methods: {
     async onGoClicks(item) {
       
 this.$router.push({ name: "Buy",params:{ITEM:item} });
     
     
      
      
      
     
        
      
      },
        async onGoLog() {
       
 this.$router.push({ path: "/Login" });
     
     
      
      
      
     
        
      
      },
    async addItem() {
      const response = await axios.post("api/buys/", {
     
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
      await axios.delete("api/buys/" + item._id);
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
    async updateItemA(item, i,editedNUM) {
      {{this.editedNUM = item.Num-editedNUM }}
      
      const response = await axios.put("api/bucketListItems/" + item._id , {
    
        Num: this.editedNUM,
      });
      this.items[i] = response.data; 
      this.$router.push({ name: "Buy",params:{ITEM:item} });
      
      
    },
    async updateItem(item, i,editedNUM) {
      const response = await axios.post("api/buys/" , {
    
        Name: this.editedNAME,
        Type:this.editedTYPE ,
        Num: this.editedNUM,
        Price:this.editedPRICE 
      });
      this.items[i] = response.data;
      
      this.updateItemA(item, i,editedNUM);
      
    }
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