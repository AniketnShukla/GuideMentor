import mongoose from 'mongoose';

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

const CurrentHeadSpace = mongoose.model('CurrentHeadSpace', currentHeadSpaceSchema)
export default CurrentHeadSpace; 