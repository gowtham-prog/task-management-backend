const createtask_logic = require("../accessors/createTask_logic");

const createTask = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = await createtask_logic(token, req.body);
    res.status(500).send(data);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = createTask;
