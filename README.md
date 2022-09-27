Task Management Web Application
= 
A flask web app to help me keep track of tasks.
You can see this app in action [here](https://jtwolf1113.pythonanywhere.com/).

## Overview

There are two ways to keep track of tasks, with basic notes(formatting to come soon), or visually using boards with categories and tasks within each category. This is meant to follow the model of other websites like Jira. 

## Purpose

I built this site with the intention of creating an app that I would actually use, on mobile and my pc. It also enabled me to practice full-stack web development via the use of Flask. I chose this framework because of its relative ease of use and my primary proficiency in Python.

## Getting Started  

To use this application, visit the above link. Account creation via email is necessary. Email is currently limited to ensure uniqueness of each profile. In the future it will be used for account recovery. 

To run the application locally follow these steps:
1. Clone this repository 
2. Run pip install -r requirements.txt to install dependencies
3. Run main.py to launch the server and navigate to the link given in the command line. 


## Upcoming Features
- Account Recovery via email in case of forgotten password
- Markdown text styling for note, as well as task and subtask descriptions 
- Improved Customization for focus timer styling on task pages
- Drag and Drop functionality to rearrange category, task, subtask and note orders
- Reductions to the number of page refreshes that occur after create, update and delete operations

## Known Bugs
- Many inputs implicitly require length limits and update operations don't uphold these
