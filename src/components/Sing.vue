<template>
<div id="sing">
  <center>
           <div class = "pa">Sign up</div>
           <br><br>
    <div class = "corona">
      <div class = "about-text">
       
        
        <br>
        <table align=center width="560" height ="140"  >
          
          <tr >
            <td align = "center">
              <div class="group">      
                <input  v-model="User" type="text" required  value=""/>  
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Username</label>
              </div>
            </td>
          </tr>
          <tr >
            <td align = "center">
              <div class="group">      
                <input v-model="Pass" type="password" required  value=""/> 
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>password</label>
              </div>
            </td>
          </tr>
           <tr >
            <td align = "center">
              <div class="group">      
                <input  v-model="Name" type="text" required  value=""/>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Name</label>
              </div>
            </td>
          </tr>
          <tr >
            <td align = "center">
              <div class="group">      
                <input v-model="Address" type="email" required  value="" />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Address</label>
              </div>
            </td>
          </tr>
          <tr >
            <td align = "center">
              <div class="group">      
                <input v-model="Tel" type="text" required  value=""/>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Tel</label>
              </div>
            </td>
          </tr>
          <tr >
            <td align = "center">
              <div class="group">      
                <input v-model="Email" type="text"  required  value=""/>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Email</label>
              </div>
            </td>
          </tr>
          <tr>
            <td align = "center" >
              <center>
        <a align = "center" class="button is-info" @click="addItem" style="background-color:#B8860B;">Submit</a>
      </center>
            </td>
          </tr>
        </table >
        
      </div>
      
      
    </div>
  </center>
  

        


    </div>

  
  
</template>

<script>
import axios from "axios";
export default {
  name: "singss",
  data() {
   
    return {
      items: [],
      User: "",
       Pass: "",
      Name: "",
      Address:"",
      Sta:"",
      Tel:"",
      Email:"",
       editedNAME: "",
      editedADD:"",
       editedTEL:"",
        editedMAIL:"",
     
      selected: {}
    };
  },
  async mounted() {
    const response = await axios.get("api/users/");
    this.items = response.data;
  },
  methods: {
   
    async addItem() {
       this.Sta = '0'
      const response = await axios.post("api/users/", {
      User: this.User,
       Pass: this.Pass,
        Name: this.Name,
        Sta: this.Sta,
        
        Address: this.Address,
        Tel: this.Tel,
        Email: this.Email
      });
      this.items.push(response.data);
 this.User = "";
  this.Pass = "";
      this.Name = "";
      this.Address = "";
      this.Tel = "";
      this.Sta= "";
      this.Email = "";
             
 this.$router.push({ path : "/Login" }); 
    },
    async removeItem(item, i) {
      await axios.delete("api/users/" + item._id);
      this.items.splice(i, 1);
    },
    select(item) {
      this.selected = item;
      this.editedNAME = item.Name;
       this.editedADD = item.Address;
       this.editedTEL = item.Tel;
       this.editedMAIL = item.Email;
    },
    isSelected(item) {
      return item._id === this.selected._id;
    },
    unselect() {
      this.selected = {};
      this.editedNAME = "";
      this.editedADD = "";
      this.editedTEL = "";
      this.editedMAIL = "";
      
    },
    async updateItem(item, i) {
      const response = await axios.put("api/users/" + item._id, {
    
        Name: this.editedNAME,
        Address:this.editedADD ,
        Tel:this.editedTEL ,
        Email:this.editedMAIL 
      });
      this.items[i] = response.data;
      this.unselect();
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
.corona{
  background-image:url("../assets/shoe-06.jpg");
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 0%,rgba(255, 255, 255, 0.6) 100%), url("../assets/shoe-06.jpg");
    background-size: cover;
  width: 600px;
  height: 650px;
  border-radius:20px;
    box-shadow:2px 2px 12px rgba(0,0,0,0.2);
  
 
}
.pa{
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
input {
  font-size:18px;
  padding:10px 10px 10px 5px;
  display:block;
  width:300px;
  border:none;
  border-bottom:1px solid #757575;
  background-color: rgba(255, 255, 255, 0);
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