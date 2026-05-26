// VoiceDesk Lead Capture — Google Apps Script
//
// HOW TO DEPLOY:
// 1. Open your Google Sheet
// 2. Extensions → Apps Script
// 3. Delete any existing code, paste this entire file
// 4. Click "Save" (floppy disk icon)
// 5. Click "Deploy" → "New deployment"
// 6. Type: Web app
// 7. Execute as: Me
// 8. Who has access: Anyone
// 9. Click "Deploy" → copy the web app URL
// 10. Paste that URL into DemoSection.tsx where it says APPS_SCRIPT_URL

const NOTIFY_EMAIL = "harshwardhansingh02@gmail.com";
const SHEET_NAME   = "Leads"; // rename your sheet tab to "Leads", or change this

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Append to sheet
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();

    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Company / Restaurant", "Phone / WhatsApp", "Email"]);
      sheet.getRange(1, 1, 1, 5).setFontWeight("bold");
    }

    sheet.appendRow([
      new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.name    || "",
      data.company || "",
      data.phone   || "",
      data.email   || "",
    ]);

    // Email notification
    const subject = `New VoiceDesk demo request — ${data.name} (${data.company})`;
    const body    = `
New lead from the VoiceDesk website:

Name:    ${data.name}
Company: ${data.company}
Phone:   ${data.phone}
Email:   ${data.email}

Submitted at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
    `.trim();

    MailApp.sendEmail(NOTIFY_EMAIL, subject, body);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET handler — lets you test the URL is reachable in a browser
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "VoiceDesk lead capture is live" }))
    .setMimeType(ContentService.MimeType.JSON);
}
