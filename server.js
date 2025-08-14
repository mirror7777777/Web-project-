const express = require('express')

const app = express();
const Port = 6700;

;
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const Newsletter = require('./models/Newsletter');
const Product = require('./models/Product');
const Service = require('./models/Service');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(Port, () => {
  console.log(`Port is open at: http://localhost:${Port}`);
});
app.use(express.static('public'));

const DB = "mongodb+srv://Richmond:9DgvyPBtzCLHEit4@cluster0.dbtm5bt.mongodb.net/"

// Seed database with 10 products and 10 services if empty
async function seedProductsAndServices() {
  const productCount = await Product.countDocuments();
  if (productCount < 10) {
    const products = [];
    for (let i = 1; i <= 10; i++) {
      products.push({
        name: `Product ${i}`,
        description: `Description for product ${i}`,
        price: Math.floor(Math.random() * 100) + 10,
        category: i % 2 === 0 ? 'Category A' : 'Category B',
        image: '',
      });
    }
    await Product.insertMany(products);
    console.log('Seeded 10 products');
  }

  const serviceCount = await Service.countDocuments();
  if (serviceCount < 10) {
    const services = [];
    for (let i = 1; i <= 10; i++) {
      services.push({
        name: `Service ${i}`,
        description: `Description for service ${i}`,
        price: Math.floor(Math.random() * 200) + 20,
        category: i % 2 === 0 ? 'Category X' : 'Category Y',
        image: '',
      });
    }
    await Service.insertMany(services);
    console.log('Seeded 10 services');
  }
}
//seedProductsAndServices();
// CRUD API for Service
// CREATE
app.post('/services', async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
app.get('/services', async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

// READ ONE
app.get('/services/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: 'Not found' });
    res.json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
app.put('/services/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) return res.status(404).json({ error: 'Not found' });
    res.json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
app.delete('/services/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


//Products
app.get('/products', (req , res)=>{
  Product.find().exec().then((data) => {
    
      res.render('products', {data})
      //console.log(data)
    
  }).catch(err=> {
    console.log(err)
  })
});

app.post('/addProduct', (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: Math.floor(Math.random() * 100) + 10,
    category: req.body.category,
    image: "",
  })

  product.save().then(() => {
    console.log("successfully created a new name")
    res.redirect("/products")
  })
  console.log(product)
})

//display update page 
app.get('/updProd', (req , res)=>{
  console.log(req.query.id)
  Product.findById(req.query.id).exec().then((data) => {
    console.log(data)
    res.render('updProd', {data})
  });
});

app.post("/updProduct", (req, res) => {
  //Update
  Product.updateOne({_id: req.query.id}, {
      $set : {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
      }
  }).exec().then(() => {
      console.log("successfully updated name: " + req.body._id)
      res.redirect("/products")
  })

})





// READ ONE
app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



// DELETE
app.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Newsletter subscription POST route
app.post('/newsletter', async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const subscription = new Newsletter({ firstName, lastName, email });
    await subscription.save();
    res.render('newsletter', { success: true, firstName });
  } catch (err) {
    let errorMsg = 'An error occurred. Please try again.';
    if (err.code === 11000) {
      errorMsg = 'This email is already subscribed!';
    }
    res.render('newsletter', { error: errorMsg });
  }
});

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

app.get('/services', async (req, res) => {
  try {
    const products = await Product.find();
    const services = await Service.find();
    res.render('services', { products, services });
  } catch (err) {
    res.status(500).send('Error loading products and services');
  }
});

app.get('/newsletter', (req , res)=>{
res.render('newsletter')
});



app.get('/service', (req , res)=>{
  res.render('services')
});

app.get('/lm_lms', (req , res)=>{
  res.render('lm_lms')
});

// MongoDB connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));
