<template>

  <div id="app">
    
    

   


 <center>
    <h1>รายละเอียด</h1>
      </center>

 <div  v-for="(use) in users" :key="use._id" class="about-container  p-3 my-3">
       <table align=center   >
           
             
             
            <tr>
               <td align=center>
                    
               </td>
                <td align=center >
                   <img   src="../assets/g.png"  width="140">
               </td>
               
            </tr>
             <tr>
               <td align=center>
                    ชื่อ-นามสกุล
               </td>
                <td>
                   {{use.Names}}
               </td>
               
            </tr>
             <tr>
               <td align=center>
                    ที่อยู่
               </td>
                <td>
                   {{use.Addresss}}
               </td>
               
            </tr>
            <tr>
               <td align=center>
                    ชื่อบนบัตร
               </td>
                <td>
                   <input type="text"  min="2" value=""/>
               </td>
               
            </tr>
              <tr>
               <td align=center>
                    หมายเลขบัตรเครดิต/เดบิต
               </td>
                <td>
                   <input type="text"  min="13" value=""/>
               </td>
               
            </tr>
             <tr>
               <td align=center>
                    วันหมดอายุ
               </td>
                <td>
                   <input type="text" min="3" value="" placeholder="ดด/ปป"/>
               </td>
               
            </tr>
             <tr>
               <td align=center>
                    รหัส cvc/cvv
               </td>
                <td>
                   <input type="text" min="3" value="" placeholder="***"/>
               </td>
               
            </tr>




        </table >
 </div>
      <br>
    <div  v-for="(item) in items" :key="item._id"  class="about-container  p-3 my-3">
      
      
       
   <div >
        <table  align=center   width="359" >
       <tr>
               <td align=center>
                    {{ item.Name }}
                </td>
               
    </tr>
    <tr>
               <td align=center>
            ประเภท : {{ item.Type}}
            </td>
               
    </tr>
         <tr>
               <td align=center>
             จำนวน : {{ item.Num }} คู่
             </td>
               
    </tr>
       
 <tr>
               <td align=center>

            ราคารวม : {{ item.Num  * item.Price }} บาท
            </td>
               
    </tr>
     
        </table>
        



        

     
        
        
         <div align=center>
           <br><br>
          <span
           
            @click="isSelected(item) ?  unselect() : onGoClick(item)"
          >     
        <a class="btn btn-secondary btn-lg btn-block" @click="isSelected(item)" >ดำเนินการสั่งซื้อ</a>
        
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
       Names: "",
      Type:"",
      Num: "",
      User:"",
      Address:"",
      Addresss:"",
      Price:"",
       editedNAME: "",
      editedTYPE:"",
       editedNUM: "",
       editedCOLOR:"",
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
    this.editedCOLOR = item.Color;
    this.editedPRICE = item.Price;
    },
  async mounted() {
    
    
    const response = await axios.get("api/buys/");
  
    this.items = response.data;
   
    
  
    const responses = await axios.get("api/statuss/");
  
    this.users = responses.data;
   
   
  },
  

    
  
  methods: {
     async onGoClick(item) {
        await this.removeItem(item)
       
 this.$router.push({ path: "Show" });
     
     
      
      
      
     
        
      
      },
    async addItem() {
      const response = await axios.post("api/buys/", {
     
        Name: this.Name,
        
        Type: this.Type,
        Num: this.Num,
        Color: this.Color,
        Price: this.Price
      });
      this.items.push(response.data);
      this.Name = "";
     
      this.Type = "";
       this.Num = "";
      this.Color = "";
      this.Price = "";
    },
    async removeItem(item) {
      await axios.delete("api/buys/" + item._id);
   
    },
    select(item) {
      this.selected = item;
      this.editedNAME = item.Name;
       this.editedTYPE = item.Type;
         this.editedNUM = item.Num;
       this.editedCOLOR = item.Color;
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
      this.editedCOLOR = "";
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
        Color:this.editedCOLOR ,
        Price:this.editedPRICE 
      });
      this.items[i] = response.data;
      
      this.updateItemA(item, i,editedNUM);
      
    }
  }
};
</script>


<style>
#singss {
  margin: auto;
  margin-top: 1rem;
  max-width: 700px;
}
.icon {
  cursor: pointer;
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
h1 		 { 
  text-align:center; 
  margin-bottom:50px; 
  color:#888; 
}
h1 small { 
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
  width:300px;
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