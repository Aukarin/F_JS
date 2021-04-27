<template>
  <div id="app">
    <br><br><br>
    <div class="about-container">

    <img src = "../assets/shoe-06.jpg" style = "width:300px; height: 405px; border-radius:20px; margin:-50px;">
      <div class = "about-text">
        <center>
           <p>Login</p>
        </center>
        <br>
        <table align=center width="560" height ="140"  >
          <tr >
            <td align = "center">

              <div class="group">      
                <input type="text" v-model="user" required  value=""/>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Username</label>
              </div>

              
              
            </td>
          </tr>
          <tr>
           
            <td align = "center">

              <div class="group">      
                <input type="password" v-model="pass" required  value=""/>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>password</label>
              </div>

              
            </td>
          </tr>
        </table >


<div >
      
      <div> 
        <div  v-for="(item) in items" :key="item._id"  >
          <div v-if="user == item.User && pass == item.Pass " >
              <center>
                <a>{{ I() ? '' : ''}}</a>
                <div v-if="user == 'Admin' && pass == '1234' " >
                  <a class="button is-info"    @click="onGoClicks()" >Log in </a>
                </div>
                <div v-else >
                  <a class="button is-info"    @click="addItem(item)" >Log in </a>
                </div>
              </center>
          </div>
        </div>
        <center>
          <div v-if=" i == 5 ">
            <a class="button is-info" >Log in </a>
          </div>
        </center>
      </div>
    </div>


      </div>
    </div>
    
    <br>
      
    



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
      Sta:"Login",
        
       user:"",
      pass: "",
    i : 5,
      Price:"",
      Names:"",
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
    
    
    const response = await axios.get("api/users/");
  
    this.items = response.data;
   
    
  
   
  },
  methods: {
   async Check(Sta){
     this.Sta =("username or password wrong")
      return (Sta)
  },
   async I() {
       
        return (this.i = 6)
      
      },
    
     async onGoClicks() {
       
        this.$router.push({ path: "/Item"  });
      
      },
      
    async addItem(item) {
      
this.Sta='1'
      
      const response = await axios.post("api/statuss/", {
        User: this.user,
        Pass: this.pass,
        Names: item.Name ,
       Addresss: item.Address,
        Sta: this.Sta,
       
      });
      this.items.push(response.data);
      this.User = " ";
      this.Pass = " ";
      this.Sta = " ";
       this.$router.push({ path:"/Show" });
    
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
.about-container{
    width:80%;
    height:330px;
    background-color:#ffffff;
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