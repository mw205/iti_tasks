const http = require("http");
const fs = require("fs").promises;

const server = http.createServer(async (req, res) => {
    try {
        if (req.url === "/students") {
            const studentsData = await fs.readFile("students.json", "utf8");
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(studentsData)
        } else if (req.url === "/stats") {
            const dataString = await fs.readFile("students.json", "utf8");
            const studentsData = JSON.parse(dataString);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                students_total: studentsData.length
            }))
        } else if (req.url === "/courses") {
            const dataString = await fs.readFile("students.json", "utf8");
            const studentsData = JSON.parse(dataString);
            const courses = [...new Set(studentsData.map(student => student.course))]

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(courses))
        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Not Found");
        }
    } catch (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error" );
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});