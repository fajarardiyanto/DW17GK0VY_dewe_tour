const { Country } = require("../models");
const joi = require("@hapi/joi");

exports.createCountry = async (req, res) => {
  try {
    const storeData = await Country.create(req.body);

    res.status(201).send({
      data: {
        Country: storeData,
      },
    });
  } catch (err) {
    res.status(400).send({
      errors: err,
    });
  }
};

exports.getCountry = async (req, res) => {
  try {
    const countrys = await Country.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      message: "response success",
      data: {
        countrys,
      },
    });
  } catch (err) {
    res.status(400).send({
      errors: err,
    });
  }
};

exports.getCountryById = async (req, res) => {
  try {
    const { id } = req.params;

    const countryById = await Country.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!countryById) {
      return res.status(404).send({
        message: `Country with ${id} not found`,
      });
    }

    res.status(200).send({
      message: "Found Country",
      countryById,
    });
  } catch (err) {
    console.log(err),
      res.status(400).send({
        errors: err,
      });
  }
};

exports.updateCountry = async (req, res) => {
  try {
    const { id } = req.params;

    const updateCountry = await Country.update(req.body, {
      where: {
        id,
      },
    });

    if (updateCountry) {
      const resultCountry = await Country.findOne({
        where: {
          id: id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      return res.status(200).send({ data: resultCountry });
    } else {
      return res.status(400).send({ message: "Country not found" });
    }
  } catch (err) {
    res.status(400).send({
      errors: err,
    });
  }
};

exports.deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const destroy = await Country.findOne({
      where: {
        id,
      },
    });

    if (destroy) {
      await Country.destroy({
        where: {
          id,
        },
      });

      return res.status(200).send({ data: { id } });
    } else {
      return res.status(400).send({ message: "Country not found" });
    }
  } catch (err) {
    res.status(400).send({
      errors: err,
    });
  }
};
