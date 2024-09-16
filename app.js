const express = require('express');
const app = express();
const bodPars = require('body-parser');


app.set('view engine', 'ejs');
app.use(bodPars.urlencoded({ extended: true }));
app.use(express.static('public'));

let posts = [];

//new post
app.post('/', (req, res) => 
    {
        const post = 
        {
            title: req.body.title,
            message: req.body.message,
            author: req.body.author,
            createdAt: new Date().toLocaleString(),
        };
        posts.push(post);
        res.redirect('/');
    });
    
    

app.get('/', (req, res) => 
{
    res.render('index', { posts: posts });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});


//edit
app.get('/edit/:id', (req, res) => 
{

    const postId = req.params.id;
    const post= posts[postId];
    res.render('edit', { post: post, postId: postId });

});

//post update from edit
app.post('/edit/:id', (req, res) => 
{

    const postId= req.params.id;
    posts[postId]= 

    {

        title: req.body.title,
        message: req.body.message,
        author: req.body.author,
        createdAt: posts[postId].createdAt,

    };
    res.redirect('/');

});

// delete
app.post('/delete/:id', (req, res) => 
{

    const postId = req.params.id;
    posts.splice(postId, 1);

    res.redirect('/');
    
});

