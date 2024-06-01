# CyberProject
Cyber Security Project - 3 Credit

Note: This is a prototypical Model

Notes of the Author :

Background can be changed, but for now its set as fixed.

Login Page is looking simple and good (Certain logins take the user to specific pages)
Can add more fields like “Name”, “email” etc. (if needed)

Enquiry Dashboard - Manually Typing out the report and submitting
The submitted report gets stored in the json file 
(Would be better if the json file has a new attribute which says ‘Decision: null’ and must be only filled by the Decision Committee Dashboard)

Also, the history must be visible in a different component, where the report fields slowly change to the ‘View History’ tab and back to the ‘Make a Report tab’

The Reports Tab, show all the reports made by the enquiry committee, right now it only shows
But we need to make it in such a way that each report contains the “Decision Field” and based on the decision, mails must be sent to the proctor and the parents. Once the report is decided and the verdict is final, it must send a mail to the enquiry committee as well and it must change the “Decision: null” to “Decision: *verdict*” and the reports which are decided on must go and hide itself in the “History” tab of the “Decision Committee” Dashboard page.

Technology Used :

HTML
CSS
JS
Node.js
AJAX
Json (file storing)
