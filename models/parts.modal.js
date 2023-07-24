const { mongoose } = require("mongoose");

const compatibilitySchema = mongoose.Schema({
  type: Object,
  properties: {
    brand: { type: String },
    model: { type: String },
    compatible_parts: {
      type: Array,
      items: { type: String },
    },
  },
  required: ["brand", "model"],
});

const knownIssuesRecallsSchema = mongoose.Schema({
  type: Array,
  items: {
    type: Object,
    properties: {
      issue: { type: String },
      description: { type: String },
      solution: { type: String },
    },
    required: ["issue", "description", "solution"],
  },
});

const partsSchema = mongoose.Schema(
  {
    part_id: { type: String, required: true },
    part_name: { type: String, required: true },
    specifications: { type: Object, required: true },
    compatibility: compatibilitySchema,
    known_issues_recalls: knownIssuesRecallsSchema,
    installation_instructions: { type: String, required: true },
    troubleshooting_instructions: { type: String, required: true },
  },
  { versionKey: false }
);

const PartsModel = mongoose.model("part", partsSchema);

module.exports = {
  PartsModel,
};
