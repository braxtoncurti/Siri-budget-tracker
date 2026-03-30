function doPost(e) {
  var data = {};
if (e.parameter && e.parameter.voice) {
  data.voice = e.parameter.voice;
} else {
  data = JSON.parse(e.postData.contents);
}
  
  // If raw voice text is sent, parse it with Gemini first
  if (data.voice) {
    var geminiKey = "YOUR_API_KEY";
    var url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + geminiKey;
    
    var payload = {
      "systemInstruction": {
        "parts": [{"text": "You parse spoken transaction descriptions into JSON. Valid buckets: Emergency Fund, College Fund, Investing, Rent/Mortgage, Electricity, Water, Trash, Phone/Mobile, Internet, Netflix, Groceries, Household, Car Gas, Car Payment, Gym, Auto Insurance, Spending Money, Apple Music/Storage, Xbox Game Pass, Dinner/Takeout. Return ONLY a JSON object with keys: bucket, amount (number only, no $), description."}]
      },
      "contents": [{"role": "user", "parts": [{"text": data.voice}]}],
      "generationConfig": {"responseMimeType": "application/json"}
    };
    
    var options = {
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify(payload)
    };
    
    var response = UrlFetchApp.fetch(url, options);
    var geminiResult = JSON.parse(response.getContentText());
    data = JSON.parse(geminiResult.candidates[0].content.parts[0].text);
  }
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("Transactions");
  
  var colB = sheet.getRange("B4:B").getValues();
var newRow = 4;
for (var i = 0; i < colB.length; i++) {
  if (colB[i][0] === "" || colB[i][0] === null) {
    newRow = i + 4;
    break;
  }
}
  
  sheet.getRange(newRow, 1).setValue(newRow - 3);
  sheet.getRange(newRow, 2).setValue(new Date());
  sheet.getRange(newRow, 3).setValue(data.bucket);
  sheet.getRange(newRow, 4).setValue(parseFloat(data.amount));
  sheet.getRange(newRow, 5).setValue(data.description || "");
  sheet.getRange(newRow, 2).setNumberFormat("MM/dd/yyyy");
  sheet.getRange(newRow, 4).setNumberFormat("$#,##0.00");
  
  return ContentService
    .createTextOutput(JSON.stringify({
      "status": "success",
      "bucket": data.bucket,
      "amount": data.amount
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
function authorize() {
  UrlFetchApp.fetch("https://www.google.com");
}

