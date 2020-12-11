const  mongoose  = require('mongoose');
const postMessage = require('../models/postMessage');

const getPosts = async (req, res) => {
    
    try {
        const postMessages = await postMessage.find();
       //console.log(postMessage);

        //if evrything work ret

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
};
//module.exports = getPosts;
module.exports.getPosts = getPosts;



const createPost =async (req, res) => {
    const post = req.body;
    const newPost = new postMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
};
//module.module.exports = createPost;
module.exports.createPost = createPost;



const updatePost = async (req, res) => {
    
    const { id} = req.params;
    const post = req.body;
    const { title, message, creator, selectedFile, tags } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await postMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost);

}
module.exports.updatePost = updatePost;



const deletePost = async (req, res) => {
    
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id`);

    await postMessage.findByIdAndRemove(_id);
    res.json({message:'Post deleted successfully!'});

}
module.exports.deletePost = deletePost;



const likePost = async (req, res) => {
    
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id`);    

    const post = await postMessage.findById(id);
    const updatedPost = await postMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedPost);
}
module.exports.likePost = likePost;