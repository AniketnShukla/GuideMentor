const mongoose = require('mongoose')

const currentHeadSpaceSchema = new mongoose.Schema({

    rage:[{
        type: String,
    }],
    restless:[{
        type: String,
    }],
    lost:[{
        type: String,
    }],
    distracted:[{
        type: String,
    }],
    lust:[{
        type: String,
    }],
    sad:[{
        type: String,
    }],
})

module.exports = mongoose.model('CurrentHeadSpace', currentHeadSpaceSchema)