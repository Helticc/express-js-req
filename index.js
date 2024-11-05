const express = require("express");
const app = express();
const jwt = require("jsonwebtoken"); 
app.use(express.json());

const PORT = 3001;

const users = [{
    id: 1,
    name: "outlet",
    age: 25,
},
{
    id: 2,
    name: "tv",
    age: 10,
},
{
    id: 3,
    name: "light",
    age: 60,
},
]

app.get("/users", (req, res) => {
    const token = req.headers.authorization;
    console.log(token);
    jwt.verify(token, "secret", (err) => {
        if(err) {
            res.send("not authenticated");
        }
    });
    if(token) {
        res.send(users);
    } else {
        res.send("user not found");
    };
        
});

app.post("/login", (req, res) => {
    const body = req.body;
    const token = jwt.sign(body, "secret");
    console.log(token);
    console.log(body);
    res.send(token);
})

app.listen(PORT, () => console.log(`this server is running on ${PORT}`));