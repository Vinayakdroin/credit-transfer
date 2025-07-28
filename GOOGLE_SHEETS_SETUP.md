# Google Sheets Integration Setup Guide

This guide will help you connect all application forms on your PIMT website to your Google Sheets for automatic data collection.

## Step 1: Prepare Your Google Sheet

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1Cm2_BMMtIhHlLLKPmYtltgnqhI-1FtkzrlV0ckbepN4/edit?gid=0#gid=0

2. Create a new sheet tab called "Form Submissions" (or rename the existing sheet)

3. Add these column headers in Row 1:
   - A1: Timestamp
   - B1: Form Type
   - C1: First Name
   - D1: Last Name
   - E1: Email
   - F1: Phone
   - G1: State
   - H1: Course Interest
   - I1: Current Qualification
   - J1: Work Experience
   - K1: Message
   - L1: Source
   - M1: IP Address

## Step 2: Create Google Apps Script

1. Go to https://script.google.com/
2. Click "New Project"
3. Delete the default code
4. Copy and paste the entire content from `google-apps-script.js` file
5. Update the SPREADSHEET_ID on line 12:
   ```javascript
   const SPREADSHEET_ID = '1Cm2_BMMtIhHlLLKPmYtltgnqhI-1FtkzrlV0ckbepN4';
   ```
6. Save the project (Ctrl+S) and give it a name like "PIMT Form Handler"

## Step 3: Deploy the Script

1. Click "Deploy" → "New deployment"
2. Click the gear icon next to "Type" and select "Web app"
3. Set these options:
   - Description: "PIMT Website Form Handler"
   - Execute as: "Me"
   - Who has access: "Anyone"
4. Click "Deploy"
5. Review permissions and click "Authorize access"
6. Copy the web app URL (it will look like: https://script.google.com/macros/s/AKfycby.../exec)

## Step 4: Update Website Code

1. Open the file `assets/js/main.js`
2. Find line 333 where it says:
   ```javascript
   const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE' with your actual web app URL from Step 3

## Step 5: Test the Integration

1. Visit your website contact form
2. Fill out and submit the form
3. Check your Google Sheet - you should see a new row with the submission data
4. You should also receive an email notification at admissions@principleinstitute.org

## What Forms Are Connected

All these forms on your website will now send data to Google Sheets:

1. **Contact Page**: Main course inquiry form
2. **All "Apply Now" buttons**: Link to the contact form
3. **Future forms**: Any new forms you add will use the same system

## Data That Gets Collected

For each form submission, you'll receive:
- Student's full name and contact information
- Course interest and current qualification
- Work experience and additional messages
- Timestamp and source tracking
- Form type identification

## Email Notifications

You'll receive an email notification for each form submission at:
- admissions@principleinstitute.org

To change the notification email, edit line 85 in the Google Apps Script:
```javascript
const emailAddress = 'your-new-email@domain.com';
```

## Troubleshooting

### Form Not Submitting
- Check that the Google Apps Script URL is correctly set in main.js
- Verify the script is deployed and accessible to "Anyone"

### No Data in Sheet
- Check the sheet name is "Form Submissions"
- Verify the spreadsheet ID in the script matches your sheet

### No Email Notifications
- Check the email address in the script
- Look in spam/junk folder
- Verify email permissions in Google Apps Script

## Security Notes

- The website remains completely static
- No sensitive data is exposed in the frontend code
- Google Apps Script handles all data processing securely
- Form submissions work even if Google Sheets is temporarily unavailable

## Adding More Forms

To add more application forms to other pages:

1. Copy the form HTML structure from contact.html
2. Update the form fields as needed
3. Change the form type in the JavaScript:
   ```javascript
   data.formType = 'AEDP Application'; // or other form type
   ```

The system is now ready to collect all application data automatically!