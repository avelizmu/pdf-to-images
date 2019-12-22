const express = require('express');
const logger = require('morgan');
const multer = require('multer');
const PDFImage = require('pdf-image').PDFImage;
const Joi = require('joi');
const fs = require('fs').promises;

const app = express();

app.use(logger('dev'));

const partUpload = multer({dest: './tmp'});

app.post('/', partUpload.single('pdf'), async function (req, res) {
    try {
        const pdf = new PDFImage(req.file.path);
        const paths = await pdf.convertFile();
        res.send({requestId: req.file.filename});
    } catch (err) {
        console.error(err);
        res.status(500).send({message: 'An error has occurred.'})
    }
});

app.get('/:id/:index', async function (req, res) {
    const schema = Joi.object({
        id: Joi.string()
            .length(32)
            .hex()
            .required(),
        index: Joi.number()
            .integer()
            .required()
    });
    try {
        const {id, index} = await schema.validate(req.params);
        await fs.open(`./tmp/${id}-${index}.png`, 'r');
        res.sendFile(`./tmp/${id}-${index}.png`, {
            root: '.'
        });

    } catch (err) {
        if (err.isJoi && err.name === 'ValidationError') {
            return res.status(400).send({message: err.message});
        }
        if (err.code === 'ENOENT') {
            return res.status(400).send({message: 'Incorrect ID or index'});
        }
        console.error(err);
        return res.status(500).send({message: 'An error occurred while retrieving the PDF.'});
    }
});

module.exports = app;
