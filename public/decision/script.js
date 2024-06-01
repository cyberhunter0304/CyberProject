// Function to toggle report visibility
function toggleReport(reportId) {
    const reportContent = document.getElementById(reportId);
    reportContent.style.display = reportContent.style.display === 'none' ? 'block' : 'none';
    const reportHeader = document.querySelector(`#${reportId}-header`);
    reportHeader.classList.toggle('collapsed');
}

// Make an AJAX request to fetch the reports
fetch('/report-history')
    .then(response => response.json())
    .then(reports => {
        const reportsContainer = document.getElementById('reports-container');
        reports.forEach((report, index) => {
            // Create report container
            const reportContainer = document.createElement('div');
            reportContainer.classList.add('report-container');

            // Create report header
            const reportHeader = document.createElement('div');
            reportHeader.id = `report-content-${index}-header`;
            reportHeader.classList.add('report-header');
            reportHeader.innerHTML = `
                <span>Report ${index + 1}</span>
                <img class="arrow-icon" src="arrow-down.png" alt="Toggle" height="15px" width="auto" />
            `;
            reportHeader.addEventListener('click', () => toggleReport(`report-content-${index}`));

            // Create report content
            const reportContent = document.createElement('div');
            reportContent.id = `report-content-${index}`;
            reportContent.classList.add('report-content');
            reportContent.innerHTML = `
                <p><strong>Student Name:</strong> ${report.studentName}</p>
                <p><strong>Register Number:</strong> ${report.registerNumber}</p>
                <p><strong>Proctor Email:</strong> ${report.proctorEmail}</p>
                <p><strong>Parent Email:</strong> ${report.parentEmail}</p>
                <p><strong>Activity Type:</strong> ${report.activityType}</p>
                <p><strong>Report:</strong> ${report.report}</p>
            `;

            // Append header and content to container
            reportContainer.appendChild(reportHeader);
            reportContainer.appendChild(reportContent);

            // Append report container to reports container
            reportsContainer.appendChild(reportContainer);
        });
    })
    .catch(error => {
        console.error('Error fetching reports:', error);
    });