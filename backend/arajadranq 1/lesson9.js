const { add, subtract, multiply, divide } = require("./math");

console.log(add(8, 2));
console.log(subtract(8, 2));
console.log(multiply(8, 2));
console.log(divide(8, 2));

const fs = require("fs");
fs.mkdirSync("students", { recursive: true });
const students = [
  { name: "Anna", age: 18 },
  { name: "David", age: 20 },
  { name: "Mariam", age: 19 },
  { name: "Arman", age: 21 },
  { name: "Narek", age: 22 },
];
fs.writeFileSync("students/list.json", JSON.stringify(students, null, 2));
const data = fs.readFileSync("students/list.json", "utf8");
const studentList = JSON.parse(data);
studentList.forEach((student) => {
  console.log(student.name);
});

const http = require('http');
http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (req.method === 'GET' && req.url === '/') return res.end(JSON.stringify({ message: "Welcome!" }));
    if (req.method === 'GET' && req.url === '/time') return res.end(JSON.stringify({ time: new Date().toLocaleTimeString() }));
    if (req.method === 'GET' && req.url === '/info') return res.end(JSON.stringify({ platform: process.platform, node_version: process.version, uptime: process.uptime() }));
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "404 Not Found" }));
}).listen(3000);