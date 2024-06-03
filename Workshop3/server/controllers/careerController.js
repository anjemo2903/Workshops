const Career = require("../models/careerModel");

const careerPost = (req, res) => {
  let career = new Career();
  career.name = req.body.name;
  career.code = req.body.code;
  career.description = req.body.description;
  career
    .save()
    .then(() => {
      res.status(201); // CREATED
      res.header({
        location: `/api/career/?id=${career.id}`,
      });
      res.json(career);
    })
    .catch((err) => {
      res.status(422);
      console.log("error while saving the career", err);
      res.json({
        error: "There was an error saving the career",
      });
    });
};

const careerGet = (req, res) => {
  if (req.query && req.query.id) {
    Career.findById(req.query.id)
      .then((career) => {
        res.json(career);
      })
      .catch((err) => {
        res.status(404);
        console.log("error while queryting the career", err);
        res.json({ error: "Career does not exist" });
      });
  } else {
    Career.find()
      .then((career) => {
        res.json(career);
      })
      .catch((err) => {
        res.status(433);
        res.json({ error: err });
      });
  }
};

const careerPut = async (req, res) => {
  if (req.query && req.query.id) {
    const careerId = req.query.id;

    try {
        const updatedCareer = await Career.findByIdAndUpdate(
            careerId,
            {
                $set: {
                    name: req.body.name,
                    code: req.body.code,
                    description: req.body.description
                }
            },
            { new: true, runValidators: true } 
        );

        if (!updatedCareer) {
            return res.status(404).json({ error: "Career doesn't exist" });
        }

        return res.status(200).json(updatedCareer);
    } catch (err) {
        console.error('Error while updating the career:', err);
        return res.status(500).json({ error: 'There was an error updating the career' });
    }
  }
};

async function careerDelete(req, res) {
  if (req.query && req.query.id) {
    await Career.findById(req.query.id)
      .then((career) => {
        res.json(career);
      })
      .catch((err) => {
        res.status(404);
        console.log("error while queryting the career", err);
        res.json({ error: "Career does not exist" });
      });
    try {
      await Career.deleteOne({ _id: req.query.id });
      return res.status(204).json({});
    } catch (err) {
      console.error("Error while deleting the career:", err);
      return res
        .status(500)
        .json({ error: "There was an error deleting the career" });
    }
  }
}

module.exports = {
  careerPost,
  careerGet,
  careerPut,
  careerDelete,
};
