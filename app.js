const express = require("express");//install  externally express 
const bodyParser = require("body-parser");//install externally using nmp i body-parser
const res = require("express/lib/response");

const date = require(__dirname + "/date.js");

// console.log(date());

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));//since ejs don't support 'css file directly', so put that css file inside 
//"public folder" & express.static allows accessing static files ,so now "ejs file " will pick "css file" from 
//public folder




const items = ["buy Food", "Cook food", "Eat Food"];
const workItems = [];//here in JS, const can add new items in ARRAY , but cannot Assign a NEW ARRAY to "workItems"

app.get("/", function(req,res){
   
     const day = date.getDay();
  
    res.render("list", {listTitle : day, newListItems: items}); //getting data from webserver to webpage
    //writing all "ejs" once b/c writing it more than once creates error
  });

  app.post("/",function(req,res){
      console.log(req.body);
    const item = req.body.newItem;

      if(req.body.list === "Work"){ //list type shown on console...if its "Home Route"  or "Work"
      workItems.push(item);//then push that newly entered item into "workItems Array"
      res.redirect("/work"); //this redirects to app.get("/work"0
      }else{
        items.push(item);

        res.redirect("/"); //this takes to app.get()
      }
     
     // console.log(item); //getting data from webpage to webserver

      
  });

  app.get("/work" ,function(req,res){
  res.render("list", {listTitle : "Work List", newListItems : workItems});
  });

  app.post("/work", function(req,res){
      const item = req.body.newItem;
      workItems.push(item);
      res.redirect("/work");
  });

  app.get("/about", function(req,res){
   res.render("about");
  });

  app.listen(3004, function(){
    console.log("Server is running on port 3004");
});