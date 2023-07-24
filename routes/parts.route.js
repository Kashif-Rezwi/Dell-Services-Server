const express = require("express");
const { PartsModel } = require("../models/parts.modal");

const partsRouter = express.Router();

// Get request
partsRouter.get("/", async (req, res) => {
  const Query = req.query;
  const { q, limit, page } = Query;
  const pageNumber = page || 1;
  const pageLimit = limit || 20;
  const pagination = pageNumber * pageLimit - pageLimit || 0;

  if (q) {
    try {
      let query = {};
      if (q) {
        // If "q" query parameter is provided, create a case-insensitive regular expression
        // to match the "part_name" field in the database.
        query.part_name = { $regex: new RegExp(q, "i") };
      }

      const parts = await PartsModel.find(query)
        .limit(pageLimit)
        .skip(pagination)
        .exec();

      res.send(parts);
      console.log({ msg: "parts get request has been made successfully." });
    } catch (err) {
      res.status(500).send({ msg: err.message });
      console.log({ msg: err.message });
    }
  } else {
    try {
      const part = await PartsModel.find(Query)
        .skip(pagination)
        .limit(pageLimit);
      res.send(part);
      console.log({ msg: "parts get request has been made succesfully." });
    } catch (err) {
      res.send({ msg: err.message });
      console.log({ msg: err.message });
    }
  }
});

// Get request by only _id
partsRouter.get("/:part_id", async (req, res) => {
  const ID = req.params.part_id;
  //   console.log(ID);
  try {
    const part = await PartsModel.find({ part_id: ID });
    res.send(part);
    console.log({
      msg: "parts get request by only _id has been made succesfully.",
    });
  } catch (err) {
    res.send({ msg: err.message });
    console.log({ msg: err.message });
  }
});

// Post request
partsRouter.post("/addParts", async (req, res) => {
  try {
    const part = new PartsModel(req.body);
    await part.save();

    // Parts Get request after post request
    const parts = await PartsModel.find();
    console.log({ msg: "parts post request has been made succesfully." });
    res.send(parts);
  } catch (err) {
    res.send({ msg: err.message });
    console.log({ msg: err.message });
  }
});

// Patch/Update request
partsRouter.patch("/update/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  //   console.log(id);
  try {
    await PartsModel.findByIdAndUpdate({ _id: ID }, payload);
    console.log({ msg: "parts patch request has been made succesfully." });

    // Parts Get request after post request
    const parts = await PartsModel.find({ _id: ID });
    res.send(parts);
  } catch (err) {
    res.send({ msg: err.message });
    console.log({ msg: err.message });
  }
});

// Delete request
partsRouter.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await PartsModel.findByIdAndDelete({ _id: ID });
    console.log({ msg: "parts delete request has been made succesfully." });

    // Parts Get request after post request
    const parts = await PartsModel.find();
    res.send(parts);
  } catch (err) {
    res.send({ msg: err.message });
    console.log({ msg: err.message });
  }
});

module.exports = { partsRouter };
