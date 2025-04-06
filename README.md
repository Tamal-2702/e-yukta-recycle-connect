
# E-Yukta - Waste Management Solution

**URL**: https://e-yukta-recycle-connect.lovable.app/welcome

## Firebase Deployment Instructions

Follow these steps to deploy the application to Firebase Hosting:

```sh
# Step 1: Install Firebase CLI if you haven't already
npm install -g firebase-tools

# Step 2: Login to Firebase
firebase login

# Step 3: Build the project
npm run build

# Step 4: Deploy to Firebase Hosting
firebase deploy
```

## GitHub Repository Setup

To push this project to GitHub:

```sh
# Step 1: Create a new repository on GitHub

# Step 2: Initialize git repository (if not already done)
git init

# Step 3: Add all files to git
git add .

# Step 4: Commit the files
git commit -m "Initial commit"

# Step 5: Add your GitHub repository as remote
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>

# Step 6: Push to GitHub
git push -u origin main
```

## Important Firebase Authentication Note

When deploying to Firebase Hosting, make sure to add the Firebase Hosting domain to your Firebase Authentication authorized domains list:

1. Go to Firebase Console > Authentication > Settings
2. Add your Firebase Hosting domain (e.g., e-yukta.web.app) to the authorized domains list

## Project info

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Firebase Authentication and Hosting

## Local Development

```sh
# Install dependencies
npm i

# Start the development server
npm run dev
```
