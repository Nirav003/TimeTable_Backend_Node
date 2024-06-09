const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const { hash } = require("bcrypt");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    batch: {
      type: String,
      required: true,
    },
    year: {
        type: String,
        required: true,    
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await hash(this.password, 10);
});

const User = mongoose.models.User || model("User", schema);

module.exports = {
  User
}