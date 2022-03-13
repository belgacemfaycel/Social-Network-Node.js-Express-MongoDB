const Post = require('../models/Post');

exports.createPost = (req, res, next) => {
    delete req.body._id;
    const post = new Post({
      ...req.body
    });
    post.save()
      .then(() => res.status(201).json({ message: 'post created'}))
      .catch(error => res.status(400).json({ error }));      
    };

