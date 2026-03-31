# Siri Budget Tracker

A completely free, voice-powered budget tracker that logs expenses to Google Sheets using a Siri Shortcut, Google Apps Script, and the Gemini API. Just say **"Hey Siri, log transaction"** and your expense gets categorized and recorded automatically.

📺 **Full tutorial:** [Watch on YouTube](https://youtu.be/LzV5x9hDbgo)

---

## How It Works

```
iPhone (Siri) → Shortcut sends text → Google Apps Script → Gemini AI parses it → Google Sheets
```

1. You trigger the Siri Shortcut and speak your expense naturally (e.g., *"Spent 45 dollars on groceries at Publix"*).
2. The Shortcut captures your speech as text and sends it as a POST request to a Google Apps Script web app.
3. The script passes your text to Gemini 2.5 Flash, which returns a structured JSON object with the **bucket**, **amount**, and **description**.
4. The script writes that data as a new row in your Google Sheet.

Three actions on your phone. All the intelligence runs server-side.

---

## Setup

### Prerequisites

- An iPhone with Siri
- A Google account
- A free Gemini API key → [Get one here](https://aistudio.google.com/apikey)

### Step 1: Create the Google Sheet

1. Make a copy of the **[Sheet template]([(https://docs.google.com/spreadsheets/d/1MNPYJF7CGTEuzbc3RO4yaymPNt5vtXQOLNRWnndFUiU/copy)])** or create a new spreadsheet.
2. Rename the first tab to **Transactions** (exact spelling, capital T).
3. In **Row 3**, add these headers: `#` | `Date` | `Bucket` | `Amount` | `Description`

### Step 2: Add the Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**.
2. Delete any existing code and paste the contents of [`Code.gs`](Code.gs) from this repo.
3. Replace `YOUR_API_KEY_HERE` with your Gemini API key.
4. Click **Deploy → New deployment → Web app**.
5. Set "Execute as" to **Me** and "Who has access" to **Anyone**.
6. Click **Deploy** and copy the web app URL.

### Step 3: Create the Siri Shortcut

1. Open the **Shortcuts** app on your iPhone.
2. Create a new shortcut with three actions:
   - **Dictate Text** — captures your voice as text
   - **Get Contents of URL** — sends a POST request to your Apps Script web app URL with the dictated text
   - **Show Result** — displays a confirmation
3. Name the shortcut **"Log Transaction"** (or whatever you want to say after "Hey Siri").

That's it. Say **"Hey Siri, log transaction"** and speak your expense.

---

## Customizing Expense Categories

The spending categories (buckets) are defined in the Gemini system prompt inside `Code.gs`. To add, remove, or rename categories, edit the `systemInstruction` text block in the script and redeploy. You never need to touch the Siri Shortcut — all the intelligence lives server-side.

### Default Buckets

| Bucket | Example Phrase |
|---|---|
| Emergency Fund | "Put 200 in emergency fund" |
| College Fund | "100 toward college fund" |
| Investing | "300 for investing" |
| Rent/Mortgage | "1200 for rent" |
| Electricity | "Paid 170 electric bill" |
| Water | "45 for the water bill" |
| Trash | "30 for trash pickup" |
| Phone/Mobile | "Spent 80 on phone bill" |
| Internet | "60 for internet" |
| Netflix | "Netflix subscription this month" |
| Groceries | "45 dollars groceries at Walmart" |
| Household | "25 for cleaning supplies" |
| Car Gas | "Put 50 toward gas" |
| Car Payment | "515 for the car payment" |
| Gym | "32 for Planet Fitness" |
| Auto Insurance | "Paid 150 car insurance" |
| Spending Money | "400 spending money for me" |
| Apple Music/Storage | "Apple Music subscription" |
| Xbox Game Pass | "Game Pass renewal" |
| Dinner/Takeout | "Spent 35 on dinner" |

---

## Important Notes

- **Do not share your Gemini API key.** Generate your own free key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey).
- Gemini 2.5 Flash is free-tier eligible, so this costs nothing to run.
- The Apps Script looks for a tab named exactly **Transactions** — if it's misspelled, the script will fail silently.
- Headers must be in **Row 3**, not Row 1.

---

## Built By

**Braxton Curti** — AI, automation, and tech tutorials.

📺 [YouTube][(https://www.youtube.com/@braxtoncurti)]
