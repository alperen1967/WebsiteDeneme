const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const usersFilePath = 'users.txt';

// Create the file if it doesn't exist
if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, '');
}

app.get('/users', (req, res) => {
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading users file');
        }
        res.send(data);
    });
});

app.post('/register', (req, res) => {
    const { fullname, email, password } = req.body;
    const newUser = `${email}:${password}:${fullname}\n`;

    fs.appendFile(usersFilePath, newUser, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving user');
        }
        res.send('User registered successfully');
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});