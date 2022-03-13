const Post = require('../models/Post');
const fs = require('fs');
    // add Post
    exports.createPost = (req, res, next) => {
    delete req.body._id;
    const post = new Post({
      ...req.body,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    post.save()
      .then(() => res.status(201).json({ message: 'post created'}))
      .catch(error => res.status(400).json({ error }));      
    };

    // list all posts
    exports.getPosts = (req, res, next) => {
        Post.find()
        .then(posts=>res.status(200).json(posts))
        .catch(error => res.status(400).json({error}))
      };
      
    // get post       
      exports.getOnePosts = (req, res, next) => {
        Post.findOne({_id : req.params.id})
        .then(post=>res.status(200).json(post))
        .catch(error => res.status(400).json({error}))
      }
    
    // update post 
      exports.updatePost = (req, res, next) => {
        const postObject = req.file ?
        {
          ...JSON.parse(req.body.post),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    
        Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'post updated !'}))
        .catch(error => res.status(400).json({ error }));
    
      }
     
     // delete post  
      exports.deletePost = (req, res, next) => {
    
        Post.findOne({_id : req.params.id})
        .then(posts=>{
          if(!posts){
            return res.status(404).json({error : new Error('object not found')})
          }
          if(posts.userId !== req.auth.userId){
            return res.status(401).json({error : new Error('requete non autorisé')})
          }
    
          const filename = post.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Post.deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json({ message: 'post deleted !'}))
              .catch(error => res.status(400).json({ error }));
    
    
          });
        })
        .catch(error => res.status(400).json({error}))
    
      };