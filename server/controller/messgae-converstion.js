const { catchAsync } = require("../helpers/request");
const Conversation = require("../model/conversation");


exports.newConversation = async (request, response) => {
    let senderId = request.body.senderId;
    let receiverId = request.body.receiverId;

    const exist = await Conversation.findOne({ members: { $all: [receiverId, senderId]  }})
    
    if(exist) {
        response.status(200).json('conversation already exists');
        return;
    }
    const newConversation = new Conversation({
        members: [senderId, receiverId],
        message: request.body.message
    });

    try {
        const savedConversation = await newConversation.save();
        response.status(200).json(savedConversation);
    } catch (error) {
        response.status(500).json(error);
    }

}

exports.getConversation = async (request, response) => {
    try {
        const conversation = await Conversation.findOne({ members: { $all: [ request.body.senderId, request.body.receiverId] }});
        console.log(conversation);
        response.status(200).json(conversation);
    } catch (error) {
        response.status(500).json(error);
    }

}

exports.msg = catchAsync( async(req, res, next) => {
    res.body = "hello world";
    res.json(res.body)

})