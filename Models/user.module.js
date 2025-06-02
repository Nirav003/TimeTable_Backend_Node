const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const { hash } = require("bcrypt");

const schema = new Schema(
  {
    name: {
      type: String,
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
    division: {
        type: String,
        enum: ["A", "B"],
        default: null,
    },
    phone: {
      type: Number,
      required: true,
    },
    designation: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["student", "admin", "staff", "management"],
      default:"student"
    }
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