# Applifting Blog Frontend Developer Exercise

## Introduction

This exercise involves implementing a simple single-user blogging engine frontend in React.

## Technologies used

- typescript
- vite
- vitest
- material-tailwind
- zustand
- axios
- react-router-dom
- react-md-editor

# Run Locally

Clone the project

`git clone https://github.com/toho36/exercise.git`

Install and start

```json
    cd exercise
    npm install
    npm run dev
```

## how to use application

- first have to login, for now there are no requirements can put anything to log in

### admin perspective

- create new article
  - title and content is required, image is not required
- in my-articles user can delete or edit created article
- edit articles user can change values delete or add image
- deleting article will ask user if really wants to delete article

### user / admin perspective

- recent-articles will be rendered newly created articles with option to open details to the article
- detailed article has static comments, with related articles on the side

## tests

to run tests

`npm test`

make sure that the front-end is running locally before running tests

# future updates

- dynamic comments (had issue with posting comments 500 internal errors)
- error handling (snackbar)
- translating ( https://react.i18next.com/ ), https://locize.com/
- tanstack (query for data fetching)
