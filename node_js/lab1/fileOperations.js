const { error } = require("console");
const fs = require("fs");
const { json } = require("stream/consumers");
const studentData = [
    {
        id: 1,
        name: "Alice Johnson",
        age: 20,
        course: "Computer Science",
        grades: {
            math: 90,
            programming: 95,
        },
    },
    {
        id: 2,
        name: "Bob Smith",
        age: 22,
        course: "Data Science",
        grades: {
            statistics: 88,
            machine_learning: 92,
        },
    },
    {
        id: 3,
        name: "Carol Williams",
        age: 21,
        course: "Web Development",
        grades: {
            html: 95,
            javascript: 89,
        },
    },
];

const fileName = "students.json"
const writeStudentsDataSync = () => {
    try {
        const dataString = JSON.stringify(studentData);
        fs.writeFileSync(fileName, dataString);
    } catch (error) {
        console.error("Error writing file:", error);
    }
}

const readStudentsDataSync = () => {
    try {
        const data = JSON.parse(fs.readFileSync(fileName, "utf8"));
        console.log(data);
    } catch (error) {
        console.error("Error reading file:", error);
    }

}


const writeStudentsData = async () => {
    try {
        const dataString = JSON.stringify(studentData);
        await fs.promises.writeFile(fileName, dataString);
    } catch (error) {
        console.error(`Error writing file: ${error}`);
        throw error;
    }
}
const readStudentsData = async () => {
    try {
        const dataString = await fs.promises.readFile(fileName, "utf8");
        const data = JSON.parse(dataString);
        console.log(data);
        return data;
    } catch (error) {
        console.error(`Error Reading File : ${error}`);
        throw error;
    }
}
const addStudent = (newStudentData) => {
    try {
        const data = JSON.parse(fs.readFileSync(fileName, "utf8"));
        data.push(newStudentData);
        fs.writeFileSync(fileName, JSON.stringify(data));
        return data;
    } catch (error) {
        console.error(`Error adding student : ${error}`);
        throw error;
    }
}
const updateStudent = (id, updatedStudentData) => {
    try {
        const data = JSON.parse(fs.readFileSync(fileName, "utf8"));
        const index = data.findIndex(student => student.id === id);
        if (index !== -1) {
            data[index] = updatedStudentData;
        }
        fs.writeFileSync(fileName, JSON.stringify(data));
        return data;
    }
    catch (error) {
        console.error(`Error updating student : ${error}`);
        throw error;
    }
}
const deleteStudent = (id) => {
    try {
        const data = JSON.parse(fs.readFileSync(fileName, "utf8"));
        const updatedData = data.filter(
            student => student.id !== id
        )
        fs.writeFileSync(fileName, JSON.stringify(updatedData));
        return data;
    } catch (error) {
        console.error(`Error deleting student : ${error}`);
        throw error;
    }
}
writeStudentsData()
    .then(() => readStudentsData())
    .then(() => addStudent({
        id: 4,
        name: "Mohamed Waleed",
        age: 22,
        course: "Data Science",
        grades: {
            statistics: 88,
            machine_learning: 92,
        },
    }))
    .then(() => readStudentsData())
    .then(() => updateStudent(
        4,
        {
            id: 4,
            name: "Mohamed Waleed",
            age: 22,
            course: "Artificial Intelligence",
            grades: {
                statistics: 88,
                machine_learning: 92,
            },
        }
    ))
    .then(() => readStudentsData())
    .then(() => deleteStudent(4))
    .then(() => readStudentsData())
    .catch(error => console.error(error))
    ;

// writeStudentsDataSync();
// readStudentsDataSync();
// addStudent({
//     id: 4,
//     name: "Mohamed Waleed",
//     age: 23,
//     course: "Artificial Intelligence",
//     grades: {
//         math: 90,
//         programming: 95,
//     }
// });
// readStudentsDataSync();


