const express = require('express');
const app = express();

const PORT = 4000;

// Models
const conn = require('./conn/connection')
const User = require('./models/User');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
require('dotenv').config()

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

conn();

app.get("/",(req,res)=>{
    res.render("login")
})

app.post("/",async (req,res)=>{
    const {uname, password} = req.body;
    console.log(uname, password);
    const user = await User.findOne({name : uname});
    if(user){
        return res.json(user)
    }
    const newUser = new User({
        name: uname,
        password: password,
      });
      newUser.save();
    res.render("earn");

})

app.get('/admin',async(req,res)=>{
        res.render("admin-login");
})

app.post('/admin',async(req,res)=>{
    const {uname,password} = req.body;
    if(uname === "unsxcred" && password === "ux-gta-unsxcred808"){
        const user = await User.find();
        res.render("admin",{users:user});
    }else{
        res.redirect('/admin');
    }
})

app.get('/admin/:id/update',async(req,res)=>{
    const userId = req.params.id;
    try {
        // Find the user by ID
        const user = await User.findById(userId);
    
        res.render('edit', { user });
      } catch (error) {
        console.error('Error finding user:', error);
        res.status(500).send('Error finding user');
      }
})

app.post('/admin/:id',async(req,res)=>{
    const userId = req.params.id;
    const money = req.body.money;
  
    try {
      const user = await User.findById(userId);
  
      user.money = money;
  
      await user.save();
  
      res.redirect('/');
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Error updating user');
    }

  
})

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
});
