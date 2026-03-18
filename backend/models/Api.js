const mongoose = require("mongoose");

const apiSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    name: {
      type: String,
      required: true
    },

    endpoint: {
      type: String,
      required: true
    },

    method: {
      type: String,
      default: "GET"
    },

    response: {
      type: Object,
      default: {}
    },

    statusCode: {
      type: Number,
      default: 200
    },

    delay: {
      type: Number,
      default: 100
    },

    // Random delay range (optional)
    randomDelayMin: {
      type: Number,
      default: 0
    },

    randomDelayMax: {
      type: Number,
      default: 0
    },

    // Failure probability percentage (0-100)
    failureRate: {
      type: Number,
      default: 0
    },

    isError: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Api", apiSchema);