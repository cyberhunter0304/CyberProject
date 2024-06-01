document.addEventListener('DOMContentLoaded', () => {
    // Fetch user info from the server
    fetch('/user-info')
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                document.getElementById('username').innerText = `Logged in as: ${data.username}`;
            } else {
                window.location.href = '/'; // Redirect to login if not authenticated
            }
        });

    // Handle form submission
    document.getElementById('enquiryForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const studentName = document.getElementById('studentName').value;
        const registerNumber = document.getElementById('registerNumber').value;
        const proctorEmail = document.getElementById('proctorEmail').value;
        const parentEmail = document.getElementById('parentEmail').value;
        const activityType = document.getElementById('activityType').value;
        const report = document.getElementById('report').value;

        fetch('/submit-report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ studentName, registerNumber, proctorEmail, parentEmail, activityType, report })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadHistory();
            }
        });
    });
// Function to toggle between form and history
function toggleHistory() {
    const history = document.querySelector('.history');
    const viewHistoryButton = document.getElementById('viewHistoryButton');

    if (history.style.display === 'none' || !history.style.display) {
        history.style.display = 'block';
        viewHistoryButton.textContent = 'Cancel'; // Changed button text
    } else {
        history.style.display = 'none';
        viewHistoryButton.textContent = 'View History'; // Changed button text
    }
}

    // Load history
    function loadHistory() {
        fetch('/report-history')
            .then(response => response.json())
            .then(data => {
                const reportHistory = document.getElementById('reportHistory');
                reportHistory.innerHTML = '';
                data.forEach(report => {
                    const reportDiv = document.createElement('div');
                    reportDiv.className = 'report';
                    reportDiv.innerHTML = `
                        <strong>Student Name:</strong> ${report.studentName}<br>
                        <strong>Register Number:</strong> ${report.registerNumber}<br>
                        <strong>Proctor Email:</strong> ${report.proctorEmail}<br>
                        <strong>Parent Email:</strong> ${report.parentEmail}<br>
                        <strong>Type of Activity:</strong> ${report.activityType}<br>
                        <strong>Report:</strong> ${report.report}
                    `;
                    reportHistory.appendChild(reportDiv);
                });
            });
    }

    // Load history on page load
    loadHistory();

    // Toggle history display
    window.toggleHistory = function() {
        const historySection = document.querySelector('.history');
        if (historySection.style.display === 'none' || !historySection.style.display) {
            historySection.style.display = 'block';
        } else {
            historySection.style.display = 'none';
        }
    };
});