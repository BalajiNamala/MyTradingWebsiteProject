const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trades = new Schema({
    _id: {type:mongoose.ObjectId, required:[true,'The trade requires an id']},
    cardname     : {type:String, required: [true,'name of the card is required']},
    category : {type:String, required: [true,'categoey of card is required']},
    details  :{type:String, required:[true, 'description of card is required'],
                minlength:[10,'the details should have atleast 10 characters']},
    condition: {type:String, required:[true,'Condition of card is required']},
    purchasedYear:{type:Number, required:[true,'The year in which cards are purchased is required'],max:[2022,'Invalid year of purchase']},
    image : {type:String, required:[true,'Select an image to display for trade']}    
},
{timestamp: true}
);

module.exports = mongoose.model('CardTrade',trades);