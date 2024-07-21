const { z } = require("zod");

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
    });

    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstErrorMessage = error.errors[0]?.message || "Validation error";
      return res.status(400).json({ msg: firstErrorMessage });
    }
    return res
      .status(500)
      .json({ msg: "Internal Server Error", msg: error.message });
  }
};

module.exports = validate;
