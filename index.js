const express = require('express');

const db = require('./models');
const { User } = require('./models');

const app = express();

app.use(express.json());

app.get("/get", async (req, res) => {
    try {
        const allUsers = await User.findAll();
        res.send(allUsers);
    } catch (error) {
        res.send(error.message);
    }
});

app.post("/post", async (req, res) => {
    try {
        const { firstName, age } = req.body;
        const newUser = await User.create({ firstName, age });

        res.send(newUser);
    } catch (error) {
        res.send(error.message);
    }
});

app.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const singleUser = await User.findByPk(id);
        if (singleUser) {
            res.send(singleUser);
        } else {
            res.send("User Not Found");
        }
    } catch (error) {
        res.send(error.message);
    }
});



db.sequelize.sync().then((res) => {
    app.listen(5000, () => {
        console.log("listening on port 5000");
    });
})

