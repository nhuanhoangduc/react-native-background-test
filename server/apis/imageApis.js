const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const ImageModel = require('@server/database/mongo/ImageModel');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
})
const upload = multer({
    storage: storage,
});
const router = express.Router();


router.get('/', (req, res) => {
    res.json({
        ok: true,
    });
});

router.post('/', upload.single('image'), async (req, res, next) => {
    const file = req.file;
    const fileHash = req.body.hash;
    const user = req.user;

    try {
        const existedImage = await ImageModel.findOne({
            userId: user._id,
            hash: fileHash,
        });

        if (existedImage) {
            throw new Error('Dupplicated image');
        }

        const newImage = await ImageModel.create({
            userId: user._id,
            hash: fileHash,
            imageUrl: `/files/${file.filename}`,
        });

        res.json(newImage);
    } catch (error) {
        await fs.unlink(path.join(__dirname, '..', 'uploads', file.filename));
        next(error);
    }
});


module.exports = router;
