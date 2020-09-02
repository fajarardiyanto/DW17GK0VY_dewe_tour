const { Transaction, Trip, Country, User } = require("../models");
const joi = require("@hapi/joi");

exports.createTransaction = async (req, res) => {
  try {
    const schema = joi.object({
      counterQty: joi.number().required(),
      total: joi.required(),
      status: joi.string().required(),
      attachment: joi.string().required(),
      tripId: joi.number().required(),
      userId: joi.number().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    const transaction = await Transaction.create({
      ...req.body,
    });

    if (transaction) {
      const transactionResult = await Transaction.findOne({
        where: {
          id: transaction.id,
        },
        include: {
          model: Trip,
          as: "trip",
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
        },
        attributes: { exclude: ["createdAt", "updatedAt", "tripId"] },
      });

      return res.status(200).send({
        data: transactionResult,
      });
    } else {
      return res.status(400).send({
        message: "Try again",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      errors: err,
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transaction = await Transaction.findAll({
      include: [
        {
          model: Trip,
          as: "trip",
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
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "tripId"] },
    });

    if (transaction) {
      return res.status(200).send({
        data: transaction,
      });
    } else {
      return res.status(400).send({
        message: "Transaction not found",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Trip,
          as: "trip",
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
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "tripId"] },
    });

    if (transaction) {
      return res.status(200).send({
        data: { transaction },
      });
    } else {
      return res.status(400).send({
        message: "Trip not found",
      });
    }
  } catch (err) {
    return res.send(400).send({
      errors: err,
    });
  }
};

exports.getTransactionByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findAll({
      where: {
        userId: id,
      },
      include: {
        model: Trip,
        as: "trip",
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
      },
      attributes: { exclude: ["createdAt", "updatedAt", "tripId"] },
    });

    if (transaction) {
      return res.status(200).send({
        data: { transaction },
      });
    } else {
      return res.status(400).send({
        message: "Trip not found",
      });
    }
  } catch (err) {
    return res.send(400).send({
      errors: err,
    });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    // const schema = joi.object({
    //   counterQty: joi.number().required(),
    //   total: joi.number().required(),
    //   status: joi.string().required(),
    //   attachment: joi.string().required(),
    //   tripId: joi.number().required(),
    // });

    // const { error } = schema.validate(req.body);
    // if (error) {
    //   return res.send(400).send({
    //     error: {
    //       message: error.details[0].message,
    //     },
    //   });
    // }

    const { id } = req.params;

    const transaction = await Transaction.update(
      {
        ...req.body,
      },
      {
        where: {
          id,
        },
      }
    );

    if (transaction) {
      const transactionResult = await Transaction.findOne({
        where: {
          id,
        },
        include: {
          model: Trip,
          as: "trip",
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
        },
        attributes: { exclude: ["createdAt", "updatedAt", "tripId"] },
      });
      return res.status(200).send({
        data: transactionResult,
      });
    } else {
      return res.status(400).send({
        message: "Transaction not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      errors: err,
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const destroy = await Transaction.findOne({
      where: {
        id,
      },
    });

    if (destroy) {
      await Transaction.destroy({
        where: {
          id,
        },
      });

      return res.status(200).send({ data: { id } });
    } else {
      return res.status(400).send({ message: "Transaction not found" });
    }
  } catch (err) {
    res.status(400).send({
      errors: err,
    });
  }
};
