const createtask_logic = require("../accessors/createTask_logic");

const createTask = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Authorization token is missing or invalid" });
    }

    const data = await createtask_logic(token, req.body);

    res.status(201).send(data);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).send({ message: err.message || "Internal server error" });
  }
};


module.exports = createTask;
