const { render } = require('ejs');
const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

//express app
const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://paulwall:meester1234@cluster0.fnzel.mongodb.net/tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));
    

//register view engine
app.set('view engine', 'ejs');

//listen for requests

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
})

app.get('/', (req, res) => {
    res.redirect('/blogs');
});


app.get('/about', (req, res) =>{
    res.render('about', {title: 'About'});
});

//blog routes:
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1})
      .then((result) => {
        res.render('index', {title: 'All Blogs', blogs: result} )
      })
      .catch((err) => {
        console.log(err);
      })
})

app.post('/blogs', (req, res) => {
    //console.log(req.body);
    const blog = new Blog(req.body);
    blog.save()
      .then((result) => {
        res.redirect('/blogs');
      })
      .catch((err) => {
        console.log(err);
      })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a New Blog'});
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    //console.log(id);
    Blog.findById(id)
      .then(result => {
        res.render('details', {blog: result, title: 'Blog Details'});
      })
      .catch(err => {
        console.log(err);
      });
})

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)  //result is whatever is
      .then(result => {   //could also use "_" since result technically not used
        res.json({redirect: '/blogs'});
      })
      .catch(err => {
        console.log(err);
      });
})

//redirects:
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

//404 page:
//Will only reach "use" method if none of the "gets" above are fired

app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});