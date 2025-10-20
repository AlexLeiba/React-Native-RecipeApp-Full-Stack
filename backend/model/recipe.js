const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  link: {
    linkUrl: {
      type: String,
    },
    linkName: {
      type: String,
    },
  },
  details: {
    timeToCook: {
      type: Number,
    },
    servings: {
      type: Number,
    },
    calories: {
      type: Number,
    },
    temperature: {
      type: Number,
    },
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
  },
});

const RecipeModel = mongoose.model("Recipe", RecipeSchema);

module.exports = RecipeModel;
