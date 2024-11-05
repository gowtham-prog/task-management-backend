const Joi = require("joi");

const taskSchema = Joi.object({
  status: Joi.string()
    .valid("todo", "inprogress", "done")
    .default("todo")
    .optional()
    .messages({
      "string.base": `"status" should be a type of 'text'`,
      "any.only": `"status" must be one of the following values: 'todo', 'inprogress', 'done'`,
    }),
});

const validateTaskStatus = async (req, res, next) => {
  try {
    await taskSchema.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).json({ error: err.details[0].message });
  }
};

module.exports = validateTaskStatus;
