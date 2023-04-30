const mongoose = require('mongoose')

const medSchema = new mongoose.Schema({

    medicineAddress: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
    },
    rawMaterialAddress: {
        type: String,
        required: true
    },
    fromAddresses: [{
        type: String,
        required: true
    }],
    toAddresses: [{
        type: String,
        required: true
    }],
    hash:[{
        type: String,
        required: true
    }],
    previousHash:[{
        type: String,
        required: true
    }],
    geoPoints:[{
        type: {type: Number},

    }],
    timestamps:[{
        type: String,
        required: true
    }],
    timeAdded: {
         type : Date, 
         default: Date.now, 
         required: true,
    }
})

module.exports = mongoose.model('Med', medSchema)