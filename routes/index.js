var express = require('express');
var router = express.Router();
const Dummy = require('../models/dummy');
const logger = require('../config/logger');
const crypto = require("crypto");

const CACHE_MISS = 'Cache miss!';
const CACHE_HIT = 'Cache hit!';
const NOT_FOUND = 'Not found!';

/**
 * @param len
 * @returns {string} Random string
 */
function getRandomString(len = 10) {
    return crypto.randomBytes(len).toString('hex');
}

/**
 *  Return all data.
 *
 */
router.get('/', async (req, res) => {
    const all = await Dummy.find({});
    const count = all.length;
    res.send({count, result: all}).status(200);
});

/**
 *  Delete all data.
 *
 */
router.delete('/', async (req, res) => {
    res.send({title: 'delete all', createdAt: new Date()}).status(200);
});

/**
 * Return entity by key.
 */
router.get('/:key', async (req, res) => {
    const key = req.params.key;
    let data = await Dummy.findOne({key});
    if (!data) {
        const randomStr = getRandomString();
        const newDummy = new Dummy({
            key: randomStr,
        });
        logger.info(CACHE_MISS);
        data = await newDummy.save();
        return res.send(data);
    }
    logger.info(CACHE_HIT);
    return res.send(data);
});

/**
 * Remove entity.
 */
router.delete('/:key', async (req, res) => {
    const key = req.params.key;
    const deletedDummy = await Dummy.findOneAndRemove({key});
    if(!deletedDummy) {
        res.send(NOT_FOUND).status(404);
    }
    res.send(deletedDummy).status(200);
});

/**
 * Update entity by key.
 */
router.put('/:key', async (req, res) => {
    const key = req.params.key;
    const data = {
        id: req.params.key,
        text: 'hello',
    };
    const foundDummy = Dummy.findOne({key});
    const dummy = new Dummy(data);
    await dummy.save();
    res.send({title: 'update entity', key: req.params.key, body: req.body, createdAt: new Date()}).status(200);
});

module.exports = router;
