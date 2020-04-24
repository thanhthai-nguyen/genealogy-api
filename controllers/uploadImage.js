const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

const User = require('../models/user');


 //UpLoad Profile picture
 var storage = new GridFsStorage({
    url: process.env.MONGO_LOCAL_CONN_URL,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      const match = ["image/png", "image/jpeg"];

      if (match.indexOf(file.mimetype) === -1) {
        const filename = `user-${Date.now()}-${file.originalname}`;
        return filename;
      }

      return {
        bucketName: "photos",
        filename: `user-${Date.now()}-${file.originalname}`
      };
    }
  });

exports.uploadFile = multer({ storage: storage }).single("file");
//var uploadFilesMiddleware = util.promisify(uploadFile);



 
