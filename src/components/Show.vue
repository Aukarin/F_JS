<template>

  <div id="app">
    
    
     
    <div  v-for="(item) in items" :key="item._id"  >
    
     
      <div  class="about-container p-3 my-3">
      

             <div  >

             

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
       

            


      
          </div>

         
  {{ item.Name }}
          <br>
            ประเภท : {{ item.Type}}
           <br>
             จำนวน : {{ item.Num }} คู่
          <br>
        
           ราคา : {{ item.Price }} บาท
        
 <div  align = center>
         <br>
             <br>
          <span
            @click="isSelected(item) ?  unselect() : onGoClick( item._id)"
          >     
        <a class="btn btn-secondary btn-lg btn-block" @click="isSelected(item)" width=180 > รายละเอียด </a>
        
          </span>

        </div>
            
 <br>





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
    const response = await axios.get("api/bucketListItems/");
    this.items = response.data;
  },
  methods: {
   async onGoClick(item) {
     
      
        
       
        this.$router.push({ name: "Detail",params:{ITEM:item} });
      },

    async addItem() {
      const response = await axios.post("api/bucketListItems/", {
     
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
      await axios.delete("api/bucketListItems/" + item._id);
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
      const response = await axios.put("api/bucketListItems/" + item._id, {
    
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