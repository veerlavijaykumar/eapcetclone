const mongoose=require('mongoose');
const Schema=mongoose.Schema;
//Schema is defined
const blogSchema=new Schema({title:{type:String,required:true},snippet:{type:String,required:true},body:{type:String,required:true}},{timestamps:true});
//model is defined
const Blog=mongoose.model('Blog',blogSchema);
module.exports=Blog;