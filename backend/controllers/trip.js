const { Trip, Country } = require("../models");
const joi = require("@hapi/joi");

exports.createTrip = async (req, res) => {
  try {
    const schema = joi.object({
      title: joi.string().min(3).required(),
      countryId: joi.required(),
      accomodation: joi.string().required(),
      transportation: joi.string().required(),
      eat: joi.string().required(),
      day: joi.number().required(),
      night: joi.number().required(),
      dateTrip: joi.required(),
      price: joi.number().required(),
      quota: joi.number().required(),
      description: joi.string().min(10).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    const { tripImage } = req.files;
    const imageTripName = tripImage.name;
    await tripImage.mv(`./images/${imageTripName}`);

    const trip = await Trip.create({
      ...req.body,
      image: imageTripName,
    });

    if (trip) {
      const tripResult = await Trip.findOne({
        where: {
          id: trip.id,
        },
        include: {
          model: Country,
          as: "country",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "countryId"],
        },
      });

      return res.status(200).send({
        data: tripResult,
      });
    } else {
      return res.status(400).send({
        error: {
          message: "Try again",
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      errors: err,
    });
  }
};

exports.getTrips = async (req, res) => {
  try {
    const trip = await Trip.findAll({
      include: {
        model: Country,
        as: "country",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: { exclude: ["createdAt", "updatedAt", "countryId"] },
    });

    if (trip) {
      return res.status(200).send({
        data: {
          trip,
        },
      });
    } else {
      return res.status(400).send({
        message: "Trip not found",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getTripById = async (req, res) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findOne({
      where: {
        id,
      },
      include: {
        model: Country,
        as: "country",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: { exclude: ["createdAt", "updatedAt", "countryId"] },
    });

    if (trip) {
      return res.status(200).send({
        data: trip,
      });
    } else {
      return res.status(400).send({
        message: "Trip not found!",
      });
    }
  } catch (err) {
    return res.send(400).send({
      errors: err,
    });
  }
};

exports.updateTrip = async (req, res) => {
  try {
    const { id } = req.params;

    const trip = await Trip.update(
      {
        ...req.body,
      },
      {
        where: {
          id,
        },
      }
    );

    if (trip) {
      const tripResult = await Trip.findOne({
        where: {
          id,
        },
        include: {
          model: Country,
          as: "country",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          attributes: { exclude: ["createdAt", "updatedAt", "countryId"] },
        },
      });
      return res.status(200).send({
        data: tripResult,
      });
    } else {
      return res.status(400).send({
        message: "Film not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      errors: err,
    });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;

    const destroy = await Trip.findOne({
      where: {
        id,
      },
    });

    if (destroy) {
      await Trip.destroy({
        where: {
          id,
        },
      });

      return res.status(200).send({ data: { id } });
    } else {
      return res.status(400).send({ message: "Trip not found" });
    }
  } catch (err) {
    res.status(400).send({
      errors: err,
    });
  }
};
