const fs = require("fs");

// read / write -> synchronus , asynchronus

// synchronus
const data = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
// console.log(data);

// asynchronus
// fs.promises.readFile("./users.json", "utf-8").then((data) => console.log(JSON.parse(data)));

data.push({
    "name": "hamada2",
    "age": 25,
    "city": "mansoura",
    "job": "developer"
})

// fs.writeFileSync("./users.json", JSON.stringify(data));

fs.promises.writeFile("./users.json", JSON.stringify(data));