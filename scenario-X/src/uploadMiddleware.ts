import multer from 'multer';

const uploadsStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const uploadsMiddleware = multer({
    storage: uploadsStorage
}).single("item_file");

export default uploadsMiddleware;