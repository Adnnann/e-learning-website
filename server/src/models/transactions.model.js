import moongose from "mongoose";

const TransactionsSchema = new moongose.Schema({
  userId: {
    type: String,
  },
  title: {
    type: String,
    trim: true,
    unique: "Title must be unique",
    required: "Transaction title is required",
    match: [
      /^[a-zA-Z0-9 ]*$/g,
      "Only letters and number are allowed for title",
    ],
  },
  amountInEUR: {
    type: Number,
    default: 0,
  },
  amountInUSD: {
    type: Number,
    default: 0,
  },
  amountInBAM: {
    type: Number,
    default: 0,
  },
  currency: {
    required: "Currency is required",
    type: String,
  },
  type: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  day: {
    type: String,
  },
  week: {
    type: String,
  },
  month: {
    type: String,
  },
  year: {
    type: String,
  },
  updated: Date,
});

TransactionsSchema.path("title").validate(async (title) => {
  const transaction = await this.constructor.findOne({ title });
  if (transaction) {
    if (this.id === transaction.id) {
      return true;
    }
    return false;
  }
  return true;
}, "Transaction title must be unique!");

export default moongose.model("Transactions", TransactionsSchema);
