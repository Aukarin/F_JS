<template>

  <div id="app">
    
   <div v-if="items.length < 1" >
     <br>
      <br> <br> <br><br> <br> <br> <br> <br>  <br>  <br>
        <h1> ยังไม่มีสินค้าที่ต้องได้รับ </h1>
    </div>
    <div  v-for="(item) in items" :key="item._id"  >
   
        <div  v-for="(use) in users" :key="use._id" >
  
        
      
<div v-if="item.NameUser==use.Names" class="about-container p-3 my-3">
      <div class="product-image" v-if="item.Name=='adidas'" >
                            <img src= '../assets/adidas.jpg'  width="290" >
             </div>
             
              <div class="product-image" v-if="item.ItemUser=='nike'" >
                            <img src= '../assets/nike.jpg'  width="290" >
             </div>
             <div class="product-image" v-if="item.ItemUser=='Adidas 360i'" >
                            <img src= '../assets/Adidas 360i.jpg'  width="290" >
             </div>
             <div class="product-image" v-if="item.ItemUser=='FY8936'" >
                            <img src= '../assets/FY8936.jpg'  width="290" >
             </div>
             <div class="product-image" v-if="item.ItemUser=='Galaxy5'" >
                            <img src= '../assets/Galaxy5.jpg'  width="290" >
             </div>
             <div class="product-image" v-if="item.ItemUser=='Stan smith'" >
                            <img src= '../assets/Stan smith.jpg'  width="290" >
             </div>
             <div class="product-image" v-if="item.ItemUser=='Stan white'" >
                            <img src= '../assets/Stan white.jpg'  width="290" >
             </div>
              <div class="product-image" v-if="item.ItemUser=='Ultraboost 21'" >
                            <img src= '../assets/Ultraboost 21.jpg'  width="290" >
             </div>

         
            ผู้รับ     {{ item.NameUser }}
          <br>
            ที่อยู่ : {{ item.AddressUser}}
           <br>
             สินค้า : {{ item.ItemUser }} 
          <br>
        
            ประเภท : {{ item.TypeUser }} 
            <br>
            จำนวน : {{ item.NumUser }} คู่
        
 <br><br><br>
         กำลังจัดส่ง..
 <br>





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
      users: [],
      Id:"",
      NameUser: "",
      AddressUser:"",
      ItemUser:"",
       TypeUser: "",
      NumUser:"",
        Names:"",
     product: 'Socks',
        brand: 'Vue Mastery',
        selectedVariant: 0,
        details: ['50% cotton', '30% wool', '20% polyester'],
        variants: [
          { id: "adidas", color: 'green', image: '../assets/adidas.jpg', quantity: 50 },
          { id: "nike", color: 'blue', image: '../assets/nike.jpg', quantity: 0 },
        ],
      selected: {}
    };
  },
  async mounted() {
    const response = await axios.get("http://backjs.app.ruk-com.cloud/api/historys/");
    this.items = response.data;
    const responses = await axios.get("http://backjs.app.ruk-com.cloud/api/statuss/");
  
    this.users = responses.data;
  },
  methods: {
   async onGoClick() {
     
      
        
       
        this.$router.push({ path: "/Admin" } );
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
      await axios.delete("http://backjs.app.ruk-com.cloud/api/historys/" + item._id);
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
    },
    addToCart() {
          this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
      },
      updateVariant(index) {
          this.selectedVariant = index
      }
  },  computed: {
      title() {
          return this.brand + ' ' + this.product
      },
      image() {
          return this.variants[this.selectedVariant].image
      },
      inStock() {
          return this.variants[this.selectedVariant].quantity
      },
      shipping() {
        if (this.premium) {
          return 'Free'
        }
        return 2.99
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