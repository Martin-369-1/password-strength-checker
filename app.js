//configure app
const express=require('express');
const app=express();

//body parser configure
const bodyParser=require('body-parser');
const urlencoderParser=bodyParser.urlencoded({extended:true});
app.use(urlencoderParser);

//confingure view engine
app.set('view engine','ejs');

//declare inital password and password strength
let password;
let passwordstrength;

//configure server
app.listen(3000,()=>console.log("Server is runnig >>>>>>"));

//home page
app.get('/',(req,res)=>{
    res.render('home')
    
})

//giting password
app.post('/check',(req,res)=>{
    password=req.body.password;
    passwordstrength=checkPasswordStrength(password);
    //result page
    res.render('result',{passwordstrength});

})


//404 page
app.use((req,res)=>{
    res.render('404')
})


//functon to check the strength of the password entered
function checkPasswordStrength(password) {
    
    let strength = 0;
    if (password.length < 6) {
        return "Very Weak";
    }
    if (password.length >= 6) {
        strength++;
    }
    if (password.length >= 8) {
        strength++;
    }
    if (password.match(/[a-z]+/)) {
        strength++;
    }
    if (password.match(/[A-Z]+/)) {
        strength++;
    }
    if (password.match(/[0-9]+/)) {
        strength++;
    }
    if (password.match(/[$@#&!]+/)) {
        strength++;
    }

    if (strength < 3) {
        return "Weak";
    } else if (strength < 5) {
        return "Medium";
    } else if (strength < 6) {
        return "Strong";
    } else {
        return "Very Strong";
    }
}