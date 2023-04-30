const mongoose = require('mongoose')

const orderPlaced = new mongoose.Schema({
    medicineAddress: String, 
    quantity: Number,
    timeOrderPlaced: {
        type : Date, 
        default: Date.now, 
        required: true,
   }
})

const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    //should be medicineAddresses
    ordersPlaced: [{
        type: orderPlaced
    }],
    
    // roles: [{
    //     type: String,
    //     default: "Employee"
    // }],
    // active: {
    //     type: Boolean,
    //     default:true
    // }

    //Updated or added?
    timeUpdated: {
        type : Date, 
        default: Date.now, 
        required: true,
   }
})

module.exports = mongoose.model('customer', customerSchema)