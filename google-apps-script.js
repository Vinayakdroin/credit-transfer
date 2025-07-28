/**
 * Google Apps Script for PIMT Website Form Submissions
 * This script connects forms from the PIMT website to Google Sheets
 * 
 * Setup Instructions:
 * 1. Go to script.google.com
 * 2. Create a new project
 * 3. Paste this code
 * 4. Deploy as web app
 * 5. Copy the web app URL and update the scriptURL in main.js
 */

// Configuration
const SPREADSHEET_ID = '1Cm2_BMMtIhHlLLKPmYtltgnqhI-1FtkzrlV0ckbepN4'; // Your Google Sheets ID
const SHEET_NAME = 'Form Submissions'; // Sheet name for form data

/**
 * Handle POST requests from website forms
 */
function doPost(e) {
  try {
    // Get the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Get or create the sheet
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      
      // Add headers if this is a new sheet
      const headers = [
        'Timestamp',
        'Form Type',
        'First Name',
        'Last Name',
        'Email',
        'Phone',
        'State',
        'Course Interest',
        'Current Qualification',
        'Work Experience',
        'Message',
        'Source',
        'IP Address'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#2563eb');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
    }
    
    // Parse form data
    const formData = parseFormData(e);
    
    // Prepare row data
    const rowData = [
      formData.timestamp || new Date().toLocaleString(),
      formData.formType || 'Course Inquiry',
      formData.firstName || '',
      formData.lastName || '',
      formData.email || '',
      formData.phone || '',
      formData.state || '',
      formData.course || '',
      formData.qualification || '',
      formData.experience || '',
      formData.message || '',
      formData.source || 'Website',
      getUserIP()
    ];
    
    // Add data to sheet
    sheet.appendRow(rowData);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, rowData.length);
    
    // Send email notification (optional)
    sendEmailNotification(formData);
    
    // Return success response
    return ContentService
      .createTextOutput('Success')
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    // Return error response
    return ContentService
      .createTextOutput('Error: ' + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput('PIMT Form Handler is running. Use POST to submit form data.')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Parse form data from POST request
 */
function parseFormData(e) {
  const formData = {};
  
  if (e.parameter) {
    // Extract all form parameters
    Object.keys(e.parameter).forEach(key => {
      formData[key] = e.parameter[key];
    });
  }
  
  return formData;
}

/**
 * Get user's IP address
 */
function getUserIP() {
  try {
    // This is a basic implementation - in a real scenario, 
    // you might want to parse this from request headers
    return 'N/A';
  } catch (error) {
    return 'Unknown';
  }
}

/**
 * Send email notification for new form submissions
 */
function sendEmailNotification(formData) {
  try {
    const emailAddress = 'admissions@principleinstitute.org'; // Your notification email
    const subject = `New ${formData.formType || 'Course Inquiry'} from ${formData.firstName} ${formData.lastName}`;
    
    const emailBody = `
New form submission received from PIMT website:

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
State: ${formData.state}
Course Interest: ${formData.course}
Current Qualification: ${formData.qualification}
Work Experience: ${formData.experience}
Message: ${formData.message}

Submitted: ${formData.timestamp}
Source: ${formData.source}

Please follow up with this inquiry within 24 hours.
    `;
    
    MailApp.sendEmail(emailAddress, subject, emailBody);
    
  } catch (error) {
    console.error('Error sending email notification:', error);
    // Don't throw error here, as form submission should still succeed
  }
}

/**
 * Test function - run this to verify setup
 */
function testSetup() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('Spreadsheet found:', spreadsheet.getName());
    
    // Test data
    const testData = {
      timestamp: new Date().toLocaleString(),
      formType: 'Test Submission',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '1234567890',
      state: 'Test State',
      course: 'Test Course',
      qualification: 'Test Qualification',
      experience: 'Test Experience',
      message: 'This is a test submission',
      source: 'Test'
    };
    
    // Simulate form submission
    const mockEvent = {
      parameter: testData
    };
    
    const result = doPost(mockEvent);
    console.log('Test result:', result.getContent());
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}