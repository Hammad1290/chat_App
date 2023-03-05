var express = require('express');
var router = express.Router();
const multer = require('../middleware/multer')
//const controller = require('../controller/messgae-converstion')
/* const { newConversation, getConversation } = require ('../controller/messgae-converstion') */
const { newConversation, getConversation } = require ('../controller/conversation-controller.js');
const { addUser, getUser } = require ('../controller/user-controller.js');
const { newMessage, getMessage} = require ('../controller/message-controller.js');
const { fileUpload, getfiles } = require ('../controller/image-controller.js')
/* const { uploadImage, getImage } = require ('../controller/image-controller.js'); */

/* import upload from '../utils/upload.js'; */


//router.get('/msg', controller.msg)

/* router.post('/conversation/add', newConversation);

router.post('/conversation/get', getConversation);
router.post('/api/message') */

router.post('/add', addUser);
router.get('/users', getUser);

router.post('/conversation/add', newConversation);
router.post('/conversation/get', getConversation);

router.post('/message/add', newMessage);
router.get('/message/get/:id', getMessage);

router.post('/fileupload/:id', multer, fileUpload);
router.get('/file/:id', getfiles)
/* router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage); */


/* /* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

export default route; */
 

module.exports = router;
