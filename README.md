# Student Management System (React + JSON Server + Tailwind CSS)

Simple CRUD app. All passwords are stored encrypted (AES). After registering a user can login — only logged-in users can see the list and perform CRUD on any record (create/edit/delete). After logout only register/login are visible.

## Features
- Register with fields: Full Name, Email, Phone Number, Date of Birth, Gender, Address, Course Enrolled, Password
- Login using Email + Password (password decrypted on client to verify)
- List of all users visible only after login
- Create new user (same fields) after login
- Edit any user's details (form shows decrypted password; re-encrypted on save)
- Delete any user
- No roles — any logged-in user can CRUD any user
- Data stored in `db.json` — password stored encrypted

## Setup
1. npm create vite@latest task-react-typescript and selected typescript 
2. `npm install`
3. Start JSON Server: `npm start`
4. Start React app: `npm run dev`
- React app: http://localhost:5173
- JSON server: http://localhost:5000/students

## Encryption
Using `crypto-js` AES:
- `encryptData(password)` before saving record
- `decryptData(storedPassword)` for login & pre-filling edit form



## Tech stack
- React + TypeScript
- Tailwind CSS
- React Router 
- Axios
- JSON Server (mock API)
- CryptoJS (AES)


