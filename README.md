# Interview Scheduler

### Description

#### Interview Scheduler is a React app developed for and by Lighthouse Labs to keep track of scheduled interviews. It utilizes a PostgeSQL database, React components including Storybook, as well as the React and Jest testing libraries. The aim of this project was to teach me how to make full use of the components of the aforementioned tech stack to full advantage and apply that knowledge to future projects.  

### Screenshots

#### Interview Scheduler features a menu that displays available days to schedule and dynamically renders interviews when a new day is clicked

![Interview Scheduler features a menu that displays available days to schedule and dynamically renders interviews when a new day is clicked](/docs/scheduler-menu.gif)

#### Clicking in an empty interview slot instantly brings up a form to submit a new interview

![Clicking in an empty interview slot instantly brings up a form to submit a new interview](/docs/scheduler-new-interview.gif)

#### Clicking on the edit button of an already booked interview allows you to edit it, with the form fields being dynamically populated from the database

![Clicking on the edit button of an already booked interview allows you to edit it, with the form fields being dynamically populated from the database](/docs/scheduler-edit-interview.gif)

#### Clicking on the delete button of an already booked interview allows you to delete it, but first it will ask you for confirmation to ensure it was not by mistake!

![Clicking on the delete button of an already booked interview allows you to delete it, but first it will ask you for confirmation to ensure it was not by mistake!](/docs/scheduler-delete-interview.gif)

#### Trying to submit a form will trigger input validation to ensure required fields are filled in

![Trying to submit a form will trigger input validation to ensure required fields are filled in](/docs/scheduler-input-validation.gif)

#### In the event that errors occur during the create, edit, or delete interview process, the user will be presented with an appropriate error message

![In the event that errors occur during the create, or edit interview process, the user will be presented with an appropriate error message](/docs/scheduler-create-error.gif)

![In the event that errors occur during the delete interview process, the user will be presented with an appropriate error message](/docs/scheduler-delete-error.gif)

## Scheduler API server required

Please also clone the API server found here: https://github.com/ShaunaTheDead86/scheduler-api
You must be running the API server in a separate terminal for the Scheduler app to be able to access the database

## Dependencies

The following dependencies are used in the Scheduler project: Axios, React, Cypress, Babel, Storybook, Jest, React, and Sass

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
