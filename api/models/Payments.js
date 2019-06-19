const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
  key:String,
  terms:Array,
  termCost:String,
  taxCut:String,
  cummision:String,
});

const Payment = module.exports = mongoose.model('Payment',PaymentSchema);