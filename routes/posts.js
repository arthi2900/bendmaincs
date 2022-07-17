const router=require("express").Router();
const User=require("../models/User");
const Post=require("../models/Post");
//create post
router.post("/",async(req,res)=>{
  const newPost=new Post(req.body);
  try{
    const savedPost=await newPost.save();
    res.status(200).json(savedPost);
  }
 catch(err){
    res.status(500).json(err);
 }
 })
 //update post
 router.put("/:id",async(req,res)=>{
    const post=await Post.findById(req.params.id);
    try{
if(post.username=== req.body.username){
    try{
        const updatePost=await Post.findByIdAndUpdate(req.params.id,{
$set:req.body
        },{new:true});
        res.status(200).json(updatePost);
    }
catch(err){
    res.status(404).json("not found ");
}
}
else{
    res.status(401).json("you can update only your post");
}
    }
    catch(err){
        res.status(500).json(err);
    }
 })
//delete

router.delete("/:id",async(req,res)=>{
    
    try{
        const post=await Post.findById(req.params.id);
if(post.username=== req.body.username){
    try{
        await post.delete();
            res.status(200).json("post has been deleted ...");
    }
catch(err){
    res.status(404).json("not found ");
}}
else{
    res.status(401).json("you can delete only your post");
}    }
    catch(err){
        res.status(500).json(err);
    }
 })


 //get all post
 //http://localhost:5000/posts/?user=gayathri3
 router.get("/",async(req,res)=>{
    const username=req.query.user;
    try{
        let posts;
       if(username){
        posts=await Post.find({username});
       }
       else{
        posts=await Post.find();
       }
       res.status(200).json(posts);
    }
 catch(err){
    res.status(500).json(err);
 }
})
 //get post
 router.get("/:id",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
                res.status(200).json(post);
    }
 catch(err){
    res.status(500).json(err);
 }
 })
 

module.exports=router;