const Joi = require("joi");
module.exports = {
  validateBody: (req, res, next) => {
    const { name, email, phone } = req.body;
    const schema = Joi.object({
      name: Joi.string().min(1).max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
    });
    const validation = schema.validate({ name, email, phone });
    if (validation.error) {
      return res.status(400).json({
        message: "request body is invalid",
        status: validation.error,
      });
    }

    next();
  },
};
