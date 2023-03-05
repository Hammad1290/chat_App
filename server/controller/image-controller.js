/* const grid = require ('gridfs-stream');
const mongoose = reqiore ('mongoose');

const url = 'http://localhost:8000';


let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});


exports.uploadImage = (request, response) => {
    if(!request.file) 
        return response.status(404).json("File not found");
    
    const imageUrl = `${url}/file/${request.file.filename}`;

    response.status(200).json(imageUrl);    
}

exports.getImage = async (request, response) => {
    try {   
        const file = await gfs.files.findOne({ filename: request.params.filename });
        // const readStream = gfs.createReadStream(file.filename);
        // readStream.pipe(response);
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
} */
const Message =require( "../model/Message.js");
const Conversation  = require  ("../model/Conversation.js");

exports.fileUpload = async (request, response) =>{
  
    const newMessage = new Message(request.body);
    try {
        await newMessage.save();
        console.log(request.body );
        await Conversation.findByIdAndUpdate({_id: request.body.conversationId}, { message: request.body.type  });
        response.status(200).json("Message has been sent successfully");
    } catch (error) {
        response.status(500).json(error);
    }

}

exports.getfiles = async(req, res) =>{
    const data = await Message.find({conversationId: req.body.id})
    console.log(data);
    const result = data.file
    return result
}