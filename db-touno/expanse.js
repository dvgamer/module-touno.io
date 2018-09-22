
const mongoose = require('mongoose')
const { Mixed } = mongoose.Schema.Types

module.exports = [
  {
    id: 'Expense',
    name: 'db-expense',
    schema: mongoose.Schema({
      enabled: Boolean,
      account: String,
      group: String,
      name: String,
      type: String,
      duedate: Date,
      end: Date,
      pay: Mixed,
      receive: Number,
      currency: String
    })
  },
  {
    id: 'ExpenseAccount',
    name: 'db-expense-account',
    schema: mongoose.Schema({
      name: {
        type: String,
        index: true,
        unique: true
      },
      type: Object, // cash { name }, saving { name }, creditcard { name, paydate, billdate }, laon { name, interest_percent, paydate, billdate }
      group: String,
      amount: Number,
      currency: String,
      visible: Boolean
    })
  },
  {
    id: 'ExpenseExchange',
    name: 'db-expense-exchange',
    schema: mongoose.Schema({
      base: String,
      currency: {
        type: String,
        index: true,
        unique: true
      },
      rate: Number,
      created: Date
    })
  },
  {
    id: 'ExpenseTransaction',
    name: 'db-expense-transaction',
    schema: mongoose.Schema({
      account_id: {
        type: String,
        index: true
      }, // to_account_id
      transfer_id: {
        type: String,
        index: true
      }, // `${from_id}|${timestamp}|${to_id}` || null
      amount: Number, // - expense, + income
      category: String,
      date: Date,
      created: Date
    })
  },
  {
    id: 'ExpenseCategory',
    name: 'db-expense-category',
    schema: mongoose.Schema({
      group: {
        type: String,
        index: true
      },
      category: {
        type: String,
        index: true,
        unique: true
      },
      created: Date,
      visible: Boolean
    })
  }
]