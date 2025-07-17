const express = require('express')
const path = require ('path')
const app = express();
const Port = 6700;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(Port , ()=>{
    console.log(`Port is open at: http://localhost:${Port}`)
})
app.use(express.static('public'))
//middleware to set the current path
app.use((req,res,next)=>{
  res.locals.currentPath = req.path;
  next();
})

app.get('/', (req , res)=>{
  res.render('home')
});

app.get('/about', (req , res)=>{
  const des = {
    description: 'The webpage was created for assignment 1'
  }
res.render('about' ,{Description: des})
});

app.get('/contact', (req , res)=>{
  const contac = {
    phone : '123456789',
    email :'assignment@gmail.com',
    X:'agggre' ,
    facebook : 'myfacebookpage'
    

  }
  res.render('contact' ,{ data : contac})
});

app.get('/profile', (req , res)=>{
  const profile = {
    firstName : 'Jhon',
    lastName :'Benson',
    phone:'123456789' ,
    email : 'jhonben@gmail.com'
    

  }
  res.render('profile' ,{ data : profile})
});

app.get('/datapage', (req , res)=>{
  const {firstName, lastName, email} = req.query;
  res.render('datapage' , {firstName, lastName, email});
})
app.post('/datapage', (req, res)=>{
  const item = req.body;
  const {firstName, lastName, email} = item;
  res.render('datapage' , {firstName, lastName, email});
});

app.get('/services', (req , res)=>{
res.render('services')
});

app.get('/newsletter', (req , res)=>{
res.render('newsletter')
});

app.get('/products', (req , res)=>{
  res.render('products')
});

app.get('/service', (req , res)=>{
  res.render('services')
});

app.get('/lm_lms', (req , res)=>{
  res.render('lm_lms')
});

