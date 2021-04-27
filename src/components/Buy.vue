<template>

  <div id="app">
    
    

    
    
    <center>
    <h1 class="subtitle has-text-centered">รายการสั่งซื้อ</h1>
      </center>
      
    <div v-for="(item) in items" :key="item._id" >
       
        <input class="column input" type="hidden" v-if="isSelected(item)" v-model="editedNUM" />
       
   <div class="about-container"  >
      
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
           
          {{ item.Name }}
          <br>
            ประเภท : {{ item.Type}}
           <br>
             จำนวน : {{ item.Num }} คู่
          <br>
        
           ราคา : {{ item.Price }} บาท
<br><br>

            ราคารวม : {{ item.Num  * item.Price }} บาท
      
        
         <div   >
          <span
            
            @click="isSelected(item) ?  unselect() : onGoClick( item._id)"
          >     
        <a class="btn btn-secondary btn-lg btn-block" @click="isSelected(item)" >ชำระเงิน</a>
        
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
      itema: [],
      
      Name: "",
      Type:"",
      Num: "",
     
      Price:"",
       editedNAME: "",
      editedTYPE:"",
       editedCOLOR:"",
        editedPRICE:"",
     
      selected: {},
      
    };
  },
  async mounted() {
    const response = await axios.get("api/buys/");
    this.items = response.data;
  },
  methods: {
     async onGoClick(item) {
     
      
        
       
        this.$router.push({ name: "Pay",params:{ITEM:item} });
      },
    async addItem() {
      const response = await axios.post("api/bucketListItems/", {
     
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
      await axios.delete("api/bucketListItems/" + item._id);
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
      
      const response = await axios.put("api/bucketListItems/" + item._id, {
    
        Num: this.editedNUM,
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
.about-container{
    width:98%;
    height:400px;
    background-color:  #ffeaea;
    border-radius:20px;
    box-shadow:2px 2px 12px rgba(0,0,0,0.2);
    display:flex;
    margin:-7% auto 20px auto;
    position:relative;
    justify-content:space-evenly;
    align-items:center;
}
.about-text{
    width:550px;
}
.about-text p:nth-child(1){
    color:#707070;
    font-family: sans-serif;
    font-weight:bold;
    font-size:28px;
    line-height:0px;
    letter-spacing:4px;
}
* { box-sizing:border-box; }
/* basic stylings ------------------------------------------ */
body 				 { background:url(https://scotch.io/wp-content/uploads/2014/07/61.jpg); }
.container 		{ 
  font-family:'Roboto';
  width:600px; 
 
  margin:30px auto 0; 
  display:block; 
  background:#FFF;
  padding:10px 50px 50px;
}
h2 		 { 
  text-align:center; 
  margin-bottom:50px; 
}
h2 small { 
  font-weight:normal; 
  color:#888; 
  display:block; 
}
.footer 	{ text-align:center; }
.footer a  { color:#53B2C8; }
/* form starting stylings ------------------------------- */
.group 			  { 
  position:relative; 
  margin-bottom:45px; 
}
input 				{
  font-size:18px;
  padding:10px 10px 10px 5px;
  display:block;
  width:80px;
  border:none;
  border-bottom:1px solid #757575;
}
input:focus 		{ outline:none; }
/* LABEL ======================================= */
label 				 {
  color:#999; 
  font-size:18px;
  font-weight:normal;
  position:absolute;
  pointer-events:none;
  left:130px;
  top:10px;
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}
/* active state */
input:focus ~ label, input:valid ~ label 		{
  top:-20px;
  font-size:14px;
  color:#5264AE;
}
/* BOTTOM BARS ================================= */
.bar 	{ position:relative; display:block; width:300px; }
.bar:before, .bar:after 	{
  content:'';
  height:2px; 
  width:0;
  bottom:1px; 
  position:absolute;
  background:#5264AE; 
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}
.bar:before {
  left:50%;
}
.bar:after {
  right:50%; 
}
/* active state */
input:focus ~ .bar:before, input:focus ~ .bar:after {
  width:50%;
}
/* HIGHLIGHTER ================================== */
.highlight {
  position:absolute;
  height:60%; 
  width:100px; 
  top:25%; 
  left:0;
  pointer-events:none;
  opacity:0.5;
}
/* active state */
input:focus ~ .highlight {
  -webkit-animation:inputHighlighter 0.3s ease;
  -moz-animation:inputHighlighter 0.3s ease;
  animation:inputHighlighter 0.3s ease;
}
/* ANIMATIONS ================ */
@-webkit-keyframes inputHighlighter {
	from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}
@-moz-keyframes inputHighlighter {
	from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}
@keyframes inputHighlighter {
	from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}
</style>