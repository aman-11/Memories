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
exports.getPosts = getPosts;


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
//module.exports = createPost;
exports.createPost = createPost;


const updatePost = async (req, res) => {
    
    const { id: _id } = req.params;
    const post = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id`);


    const updatedPost = await postMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);

}
exports.updatePost = updatePost;


const deletePost = async (req, res) => {
    
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id`);

    await postMessage.findByIdAndRemove(_id);
    res.json({message:'Post deleted successfully!'});

}
exports.deletePost = deletePost;

const likePost = async (req, res) => {
    
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id`);    

    const post = await postMessage.findById(id);
    const updatedPost = await postMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedPost);
}
exports.likePost = likePost;