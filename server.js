const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const app = express();
const port = 3000;

const reportsFilePath = path.join(__dirname, 'reports.json');

// Use body-parser middleware
app.use(bodyParser.json());

// Use express-session middleware
app.use(session({
    secret: 'your_secret_key', // Replace with a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using https
}));

// Read users from users.json
let users = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json')));

// Load existing reports from a file
let reports = [];
try {
    reports = JSON.parse(fs.readFileSync(reportsFilePath));
} catch (error) {
    console.error('Failed to read reports.json:', error);
    reports = [];
}

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if user exists and password matches
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        // Set user info in session
        req.session.user = { username: user.username, role: user.role };

        // Set redirect URL based on user role
        let redirectUrl = '/';
        if (user.role === 'enquiry') {
            redirectUrl = '/enquiry/dashboard.html';
        } else if (user.role === 'decision') {
            redirectUrl = '/decision/dashboard.html';
        }
        return res.status(200).json({ message: 'Login successful', redirectUrl });
    } else {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
});

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get the logged-in user's information
app.get('/user-info', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

// Endpoint to submit a report
app.post('/submit-report', (req, res) => {
    const { studentName, registerNumber, proctorEmail, parentEmail, activityType, report } = req.body;
    const newReport = { studentName, registerNumber, proctorEmail, parentEmail, activityType, report };

    reports.push(newReport);

    // Write to reports.json
    fs.writeFile(reportsFilePath, JSON.stringify(reports, null, 2), (err) => {
        if (err) {
            console.error('Failed to write reports.json:', err);
            return res.status(500).json({ success: false, message: 'Failed to store report' });
        }
        console.log('Report stored successfully');
        res.json({ success: true });
    });
});

// Endpoint to get report history
app.get('/report-history', (req, res) => {
    res.json(reports);
});

// Endpoint to submit a decision for a report
app.post('/submit-decision', (req, res) => {
    const { reportIndex, decision } = req.body;
    if (reportIndex >= 0 && reportIndex < reports.length) {
        reports[reportIndex].decision = decision;
        // Write to reports.json
        fs.writeFile(reportsFilePath, JSON.stringify(reports, null, 2), (err) => {
            if (err) {
                console.error('Failed to write reports.json:', err);
                return res.status(500).json({ success: false, message: 'Failed to store decision' });
            }
            console.log('Decision stored successfully');
            res.json({ success: true });
        });
    } else {
        res.status(400).json({ success: false, message: 'Invalid report index' });
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
