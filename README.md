# HJ-Survey
### Objective
The objective is to set up a simple HTML/CSS multi-step survey pop-up which sends responses back to a database and updates a survey responses admin page.

Technologies used to do this:

- Pure JavaScript - survey widget
- AngularJS - admin
- Any backend language (preferably Python)
- Any database (preferably Postgres or MySQL)

### User story

>As a user, I want to be able to add a survey to my website that collects answers and displays them inside my admin area.

### Acceptance Criteria

1. A multi-step survey which can be added to a website using JS. The code will load a pop-up (a simple div layer) containing the survey. Requirements:
  - The survey pop-up should load 2 seconds after the page has loaded.
  - The survey should contain multiple steps and have NEXT and PREVIOUS buttons on pages which need them.
  - The survey should contain the following steps:
    1. Step 1: Personal Details:
      - Name (input)
      - Email (input)
      - Type (select - the options are “Business” or “Individual”)
    2. Step 2: Business Details:
      - Business Name (input)
      - Size of Business (select - the options are 1-10 employees, 11-25 etc.)
    3. Step 3: Location Details:
      - Address (input)
      - Residing in the EU? (input[radio])
    4 Step 4: Hobbies:
      - Favourite Book (input)
      - Favourite Colors (input[checkbox])

  - All fields on the first step are required.
  - Step 2 should ONLY load IF the user selects “Business” as the type in step 1. Otherwise, step 2 should be skipped.
  - Once all steps have been completed, the pop-up should be closed.
  - If the browser is closed and re-opened, the script should re-open the survey on the right step if the browser tab was closed before the survey was submitted. Otherwise, the survey should not re-open if it was already submitted.

2. An admin page which displays a list of survey responses. This page should contain a simple table which contains the survey responses. Requirements:
  - The table column headers should contain the field names - 8 in total since the survey contains a total of 8 fields (2 fields per step).

### Requirements

NodeJS >=6

### Getting started
```
git clone https://github.com/xavifuefer/hj-survey.git
cd hj-survey
npm install
