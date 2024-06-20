const express = require('express');

const app = express();

app.use(express.json());

const PORT = 4000;

const user = [
    { id: 1, name: "Alex " },
    { id: 2, name: "James" }
];

// app.get('/', (req, res) => {
//     res.send("Successfully Reached to the route of / ");
// });

app.get('/getall', (req, res) => {
    res.json(user);
});

app.post('/addnew', (req, res) => {

    const newUser = { id: user.length + 1, name: req.body.name };

    user.push(newUser);

    // res.status(201).send("Successfully added new User");
    res.status(201).json(newUser);
});

app.put('/updateuser', (req, res) => {

    const UpdatingUser = user.find(el => el.id == req.body.id);

    if (!UpdatingUser) {
        return res.status(401).send("User not found with this id");
    }

    UpdatingUser.name = req.body.name;

    res.status(202).json(user);
});

app.delete('/delete/:id', (req, res) => {
    const deletingUserID = user.find(u => u.id == req.params.id);

    if (!deletingUserID) {
        return res.status(400).send("User not found with this id");
    }

    const deletedUser = user.splice(deletingUserID, 1);

    res.status(200).json(deletedUser);
});

//http://127.0.0.1:4000/
//http://localhost:4000/
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})