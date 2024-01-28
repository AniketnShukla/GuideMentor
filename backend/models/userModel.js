import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({

    quote: {
        type: String,
        required: true
    },
    emotion: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
})
const emotionSchema = new mongoose.Schema({

    emotions:{
        type: [String],
    },
})


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    quoteData: [{
        type: quoteSchema,
        required: true
    }],
    
    emotionData: [{
        type: String,
        required: true
    }],
    timeUpdated: {
        type : Date, 
        default: Date.now, 
        required: true,
    },
    googleId: {
        type: String,
        required: false
    }
    // roles: [{
    //     type: String,
    //     default: "Employee"
    // }],
    // active: {
    //     type: Boolean,
    //     default:true
    // }
    
    //Updated or added?
})

userSchema.pre('save', async function (next) {
    if(!this.isModified('password') && !this.googleId) {
        next();
    }
    if(this.password){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
});

userSchema.methods.matchPassword = async function ( enteredPassword ) {
    if(this.googleId) {
        return true;
    }
    // console.log("matching passwords: ", enteredPassword);
    // const salt = await bcrypt.genSalt(10);
    // const val = await bcrypt.hash("12345", salt);
    // console.log(val);
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('user', userSchema);

export default User;