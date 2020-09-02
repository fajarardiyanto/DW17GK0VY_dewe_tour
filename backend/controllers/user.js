const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const joi = require("@hapi/joi");

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, phone, address } = req.body;

    const schema = joi.object({
      fullName: joi.string().min(3).required(),
      email: joi.string().email().min(7).required(),
      password: joi.string().min(3).required(),
      phone: joi.string().required(),
      address: joi.string().min(5).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    const checkEmailExist = await User.findOne({
      where: {
        email,
      },
    });
    if (checkEmailExist) {
      return res.status(400).send({
        error: {
          message: `Email ${email} alrady exist`,
        },
      });
    }

    const user = await User.create({
      ...req.body,
      role: "User",
      imgProfil: "imgProfile.jpg",
      password: bcrypt.hashSync(password, 8),
    });

    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);

    res.status(200).send({
      data: {
        id: user.id,
        fullName,
        phone,
        address,
        email,
        role: user.role,
        token,
        imgProfil: user.imgProfil,
      },
    });
  } catch (err) {
    res.status(500).send({
      error: {
        message: err,
      },
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = joi.object({
      email: joi.string().email().min(10).required(),
      password: joi.string().min(3).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).send({
        error: {
          message: "User or password is invalid",
        },
      });
    }

    var passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        error: {
          message: "Invalid Password!",
        },
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
    return res.status(200).send({
      data: {
        id: user.id,
        fullName: user.fullName,
        phone: user.phone,
        address: user.address,
        email,
        role: user.role,
        token,
        imgProfil: user.imgProfil,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: err,
      },
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(500).send({
      errors: err,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const usersById = await User.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!usersById) {
      return res.status(400).send({
        message: `User with ${id} not found`,
      });
    }

    res.status(200).send({
      usersById,
    });
  } catch (err) {
    res.status(500).send({
      errors: err,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const destroy = await User.findOne({
      where: {
        id,
      },
    });

    if (destroy) {
      await User.destroy({
        where: {
          id,
        },
      });

      return res.status(200).send({ data: { id } });
    } else {
      return res.status(400).send({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).send({
      errors: err,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { profilImage } = req.files;
    const imageProfilName = profilImage.name;
    await profilImage.mv(`./images/${imageProfilName}`);

    const user = await User.update(
      {
        imgProfil: imageProfilName,
      },
      {
        where: {
          id,
        },
      }
    );

    if (user) {
      const userResult = await User.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      return res.status(200).send({
        data: userResult,
      });
    }
  } catch (err) {
    res.status(500).send({
      error: {
        message: err.message,
      },
    });
  }
};
