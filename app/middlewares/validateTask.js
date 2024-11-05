const Joi = require("joi");

// Define the Joi schema for task validation
const taskSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be an empty field`,
    "string.min": `"name" should have a minimum length of {#limit}`,
    "any.required": `"name" is a required field`,
  }),
  description: Joi.string().min(5).required().messages({
    "string.base": `"description" should be a type of 'text'`,
    "string.empty": `"description" cannot be an empty field`,
    "string.min": `"description" should have a minimum length of {#limit}`,
    "any.required": `"description" is a required field`,
  }),
  details: Joi.string().optional(),
  dueDate: Joi.date().iso().optional().messages({
    "date.base": `"dueDate" should be a valid date`,
    "date.iso": `"dueDate" should be in ISO 8601 format (YYYY-MM-DD)`,
  }),
  status: Joi.string()
    .valid("todo", "inprogress", "done")
    .default("todo")
    .optional()
    .messages({
      "string.base": `"status" should be a type of 'text'`,
      "any.only": `"status" must be one of the following values: 'todo', 'inprogress', 'done'`,
    }),
});

const validateTask = async (req, res, next) => {
  try {
    // Validate the request body against the Joi schema
    await taskSchema.validateAsync(req.body);
    next(); // If validation is successful, proceed to the next middleware or route handler
  } catch (err) {
    // If validation fails, send a 400 response with the error details
    res.status(400).json({ error: err.details[0].message });
  }
};

module.exports = validateTask;
