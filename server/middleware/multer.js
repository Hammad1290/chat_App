const cloudinary = require("cloudinary").v2;
const path = require("path");
const fileUpload = require('express-fileupload')
const express=require('express')
const multer = require('multer');
const app=express()

cloudinary.config({
    cloud_name: 'divscx3hc',
    api_key: '521783356674715',
    api_secret: 'EqkZ38Ju18PMZyIWoqSvdf-1yR8',
})
app.use(fileUpload ({
    useTempFiles: true,
}))



/* 
 const imageMiddleWare = () => {
    var storage = multer.diskStorage({
      destination: (req, file, cb) => {
  
        cb(null, path.join(__dirname, "../../tmp", upload));
      },
      filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
      },
    });
    var upload = multer({ storage: storage , limits: { fileSize: 1024 * 1024 * 1024 * 1024}});
    return upload;
  };
  
  const uploadToCloudinaryMiddleware = (req, res, next) => {
    const multerMiddleware = imageMiddleWare();
  
    multerMiddleware.single("file")(req, res, (err) => {
      if (err) {
        console.error("Failed to upload image:", err);
        res.status(500).json({ error: "Failed to upload image"});
        return;
      }
  
      if (!req.file) {
        next();
        return;
      } 
  
      cloudinary.uploader.upload(req.file.path, (error, result) => {
        if (error) {
          console.error("Failed to upload image to Cloudinary:", error);
          res.status(500).json({ error: "Failed to upload image to Cloudinary" });
          return;
        }
  
        // req.body.imageURL = result.secure_url 
        console.log(result, error);
        req.body.file = result.secure_url
        const a = req.body.imageURL
       console.log(a);
  
        next();
      });
    });
  };
  
  
  module.exports = uploadToCloudinaryMiddleware;  */
 /*  const fileMiddleware = () => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        console.log(file);
         const uploadDir = "";

        if (file.mimetype.startsWith("image")) {
         
          uploadDir ="images";
          console.log(uploadDir);
        } else if (file.mimetype.startsWith("video")) {
          uploadDir = "videos";
        } else {
          uploadDir = "documents";
        }
   
        cb(null, path.join(__dirname, "../../tmp", `${uploadDir}`));
      //  console.log( uploadDir);
      },
      filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
      },
    });
  
    const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 1024 * 1024}  });
 // console.log(upload);
    return upload;
  };
  
  const uploadToCloudinaryMiddleware = (req, res, next) => {
    
    const multerMiddleware = fileMiddleware();
  //console.log(multerMiddleware.file);
    multerMiddleware.single((req) => {
      console.log(req.file.mimetype);
      if (req.file.mimetype.startsWith("image")) {
        return "image";
      } else if (req.file.mimetype.startsWith("video")) {
        return "video";
      } else {
        return "file";
      }
    })(req, res, (err) => {
      if (err) {
        console.error("Failed to upload file:", err);
        res.status(500).json({ error: "Failed to upload file" });
        return;
      }
  
      if (!req.file) {
        next();
        return;
      }
  
      cloudinary.uploader.upload(req.file.path, (error, result) => {
        if (error) {
          console.error("Failed to upload file to Cloudinary:", error);
          res.status(500).json({ error: "Failed to upload file to Cloudinary" });
          return;
        }
  
        req.body.file = result.secure_url;
  
        next();
      });
    });
  };
  
  module.exports = uploadToCloudinaryMiddleware;  */
  const uploadMiddleware = (req, res, next) => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../tmp"));
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      }
    });
  
    const fileFilter = (req, file, cb) => {
      if (file.mimetype.startsWith("image") || file.mimetype.startsWith("video")  || file.mimetype.startsWith("audio") || file.mimetype.startsWith("application/pdf") || file.mimetype.startsWith("text") || file.mimetype.startsWith("application/zip") || file.mimetype.startsWith("application/vnd.ms-excel") || file.mimetype.startsWith("application/vnd.ms-powerpoint") || file.mimetype.startsWith("application/msword") || file.mimetype.startsWith("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
        cb(null, true);
      } else {
        cb(new Error("File type not supported"), false);
      }
    };
  
    const upload = multer({
      storage: storage,
      limits: {
        fileSize: 1024 * 1024 * 1024 * 1024 
      },
      fileFilter: fileFilter
    });
  
    upload.single("file")(req, res, (err) => {
      if (err) {
        console.error("Failed to upload file:", err);
        res.status(500).json({ error: "Failed to upload file" });
        return;
      }
  
      if (!req.file) {
        next();
        return;
      }
 // console.log(req.file);
      cloudinary.uploader.upload(req.file.path,  {resource_type: "auto" }  ,(error, result) => {
        if (error) {
          console.error("Failed to upload file to Cloudinary:", error);
          res.status(500).json({ error: "Failed to upload file to Cloudinary" });
          return;
        }

const payload = {
  conversationId: req.params.id,
  file :  result.secure_url,
  type:  result.resource_type
}
        req.body = payload
        next();
      });
    });
  };
  
  module.exports = uploadMiddleware; 