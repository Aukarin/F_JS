<template>

  <div id="app">
    
    
    
    <div   v-for="(item) in items" :key="item._id" >
       <div v-if="item.Type=='ผู้หญิง'" class="about-container  p-3 my-3"  >
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
             {{ item.Name }}
          <br>
            ประเภท : {{ item.Type}}
           <br>
             จำนวน : {{ item.Num }} คู่
          <br>
        
           ราคา : {{ item.Price }} บาท
       

        
        <div >
          <span
           
            @click="isSelected(item) ?  unselect() : onGoClick( item._id)"
          >
          
                
     <i class="btn btn-secondary btn-lg btn-block" width=180 >{{isSelected(item) ? 'close': 'รายละเอียด'}}</i>
        
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
      items: [],
      Id:"",
      Name: "",
      Type:"",
  
      Price:"",
       editedNAME: "",
      editedTYPE:"",
     
        editedPRICE:"",
     
      selected: {}
    };
  },
  async mounted() {
    const response = await axios.get("http://backjs.app.ruk-com.cloud/api/bucketListItems/");
    this.items = response.data;
   
    
  },
  methods: {
   async onGoClick(item) {
      
        
       
        this.$router.push({ name: "Detail",params:{ITEM:item} });
      },

    async addItem() {
      const response = await axios.post("http://backjs.app.ruk-com.cloud/api/bucketListItems/", {
     
        Name: this.Name,
        
        Type: this.Type,
        Price: this.Price
      });
      this.items.push(response.data);
      this.Name = "";
      this.Type = "";
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
       this.editedPRICE = item.Price;
    },
    isSelected(item) {
      return item._id === this.selected._id;
      
    },
    unselect() {
      this.selected = {};
      this.editedNAME = "";
      this.editedTYPE = "";
      this.editedPRICE = "";
      
    },
    async updateItem(item, i) {
      const response = await axios.put("http://backjs.app.ruk-com.cloud/api/bucketListItems/" + item._id, {
    
        Name: this.editedNAME,
        Type:this.editedTYPE ,
        Price:this.editedPRICE 
      });
      this.items[i] = response.data;
      this.unselect();
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
