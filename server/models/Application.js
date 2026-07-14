const mongoose = require('mongoose');


const jobApplicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    company: {
        type: String,
        required: true  
    },
    position: {
        type: String,
        required: true 
    },
    status: {
        type: String,
        enum: [
        
        'Interview',
        'Rejected',
        'Offered',
        'Pending'
    ],
    default: 'Pending'
    },
   
    notes: {
        type: String
    },
    salary: {
        type: Number
    },
     
        
    
});
module.exports = mongoose.model('JobApplication', jobApplicationSchema);