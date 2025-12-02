<img width="924" height="554" alt="image" src="https://github.com/user-attachments/assets/ff798501-6a58-465e-96bd-cbaa1acf5921" />



# ArtCollab

ArtCollab is an online platform where artists can showcase their work, collaborate on projects, and share feedback in a supportive community. It functions as a digital gallery for paintings, photography, digital art, design, illustration, and storytelling, encouraging cross‑disciplinary creativity.

---

## Goal & MVP Scope

**Goal:** Deliver a working MVP (Minimum Viable Product) of ArtCollab.

For this first version:

- The focus is on **images and written content** (drawings, painting, photography, visual design, stories).
- Audio and video can be added in future iterations.
- Files and user data are stored in **MongoDB**.
- Users can:
  - Sign up / log in
  - Request a **password reset** (via Mailtrap in development)
  - Browse the marketing site (Home, About)
  - Use a basic contact form (frontend only, no backend send yet)

## Software Development Approach
- Agile (Scrum) - This is best for us (students) as it allows iterative learning and course correction.
    - 2-week sprints (7 total = 14 weeks)
    - Each sprint has planning -> development -> review -> retrospective

---

## Tech Stack

### Frontend

- **Languages:** HTML, CSS, JavaScript
- **Wireframes:** WebFlow
- **Framework:** React + Vite, Redus, Axios, Lucide Icons
- **Routing:** React Router
- **Styling:** Plain CSS modules per page + shared global styles
  - `src/styles/global.css` (layout shell, navbar spacing, base resets)
  - `src/pages/*.css` and `src/components/*.css` for page‑specific styling
- **HTTP Client:** `fetch` or `axios` via `src/api/client.js`
- **Notifications:** `react-hot-toast` (wired in `main.jsx`)

### Backend

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB (local or Atlas) via Mongoose
- **Auth:**
  - JWT (access token returned on login/register)
  - Password hashing using `bcryptjs`
- **Email (dev):** Nodemailer + **Mailtrap SMTP sandbox**
  - Used to send **Forgot Password** emails
- **Security & Middleware:**
  - Basic auth middleware (`middleware/auth.js`)
  - Centralized email sender (`utils/sendEmail.js`)
 
## Tools & Collaboration Setup
- Dev Environment: Visual Studio Code + GitHub
- Deployment: Render
- Collaboration: Notion for Project Info + Sprint Process, WhatsApp for communication
- Version Control

---

## High-Level Architecture

The project is split into a **frontend** and a **backend** (two apps that talk over HTTP):

```text
artcollab-frontend/   → React + Vite SPA
artcollab-backend/    → Express + MongoDB API
```

You can run them separately in development:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5001` (configurable)

The frontend calls the backend using `/api/...` endpoints (e.g. `/api/auth/login`, `/api/auth/forgot-password`, etc.).

---

## Frontend Overview

**Key files:**

- `src/main.jsx` – React entry point, mounts `<App />`, global styles, toaster.
- `src/App.jsx` – Loads the router shell.
- `src/routes/routes.jsx` – Defines SPA routes and wraps them in the app shell (Navbar + Footer).
- `src/styles/global.css` – Global layout (app shell, navbar height, scroll behavior).
- `src/api/client.js` – Configured HTTP client to call the backend API.
- `src/components/navbar.jsx` / `navbar.css` – Top navigation bar (Explore mega menu, logo, auth buttons).
- `src/components/footer.jsx` / `footer.css` – Site footer.
- `src/pages/homepage.jsx` / `homepage.css` – Hero, category cards, slideshow, quote typing animation, contact form.
- `src/pages/about.jsx` / `about.css` – “Our Vision” and “Our Mission” sections.
- `src/pages/login.jsx` / `login.css` – Login form, calls `/api/auth/login`.
- `src/pages/SignUp.jsx` / `signup.css` – Sign up form, calls `/api/auth/register`.
- `src/pages/forgotPassword.jsx` / `forgotPassword.css` – Forgot password form, calls `/api/auth/forgot-password`.
- `src/pages/resetPassword.jsx` / `resetPassword.css` – Reset password form, consumes the token from the URL and calls `/api/auth/reset-password`.

---

## Backend Overview

**Key backend files:**

- `app.js` – Express app entry point (loads routes, middleware, DB config).
- `config/database.js` – MongoDB connection.
- `models/User.js` – User schema (auth fields, reset token fields, helpers).
- `controllers/authController.js` – Register, login, `getMe`, `forgotPassword`, `resetPassword`.
- `routes/auth.js` – `/api/auth/...` routes.
- `middleware/auth.js` – JWT protection middleware.
- `utils/sendEmail.js` – Reusable email sender using Nodemailer + Mailtrap.

Additional resources exist for future features (`Project`, `Media`, `Feedback` controllers/models/routes), but the core auth and password reset flow are already functional.

---

## Running the Backend Locally

### 1. Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- A running MongoDB instance:
  - Local: `mongodb://127.0.0.1:27017/artcollab`, or
  - MongoDB Atlas connection string

### 2. Install dependencies

From the backend folder:

```bash
cd backend
npm install
```

### 3. Environment variables (`.env`)

Create a `.env` file in the backend root with values similar to:

```env
NODE_ENV=development
PORT=5001

MONGO_URI=mongodb://127.0.0.1:27017/artcollab

JWT_SECRET=replace_with_a_long_random_string
JWT_EXPIRE=7d

BCRYPT_ROUNDS=12

# URL where the frontend runs in development
FRONTEND_URL=http://localhost:5173

# Mailtrap SMTP (dev only)
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=YOUR_MAILTRAP_USERNAME
MAIL_PASS=YOUR_MAILTRAP_PASSWORD
MAIL_FROM="ArtCollab <no-reply@artcollab.test>"
```

> 🔐 **Important:**  
> - Do **not** commit the `.env` file to Git.  
> - Replace `YOUR_MAILTRAP_USERNAME` and `YOUR_MAILTRAP_PASSWORD` with the SMTP credentials from your Mailtrap “Email Testing” inbox.

### 4. Start the backend

Depending on your `package.json` scripts, something like:

```bash
npm run dev   # if using nodemon
# or
npm start     # if dev/start are set differently
```

The API should now be available at:

```text
http://localhost:5001/api
```

---

## Running the Frontend Locally

### 1. Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### 2. Install dependencies

From the frontend folder:

```bash
cd frontend
npm install
```

### 3. Configure API base URL (if needed)

In `src/api/client.js` you typically configure the base URL to point to the backend:

```js
// Example client.js (simplified)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";
```

Then in a `.env` file for the frontend (e.g. `.env.development.local`):

```env
VITE_API_BASE_URL=http://localhost:5001/api
```

### 4. Start the dev server

```bash
npm run dev
```

The frontend should now be available at:

```text
http://localhost:5173
```

---

## Password Reset Flow (Mailtrap Integration)

The app implements a **realistic password reset flow** using Mailtrap in development. This allows you to test emails without sending anything to real inboxes.

### Backend flow

1. **Forgot Password (request link)**  
   - Endpoint: `POST /api/auth/forgot-password`  
   - Body: `{ "email": "user@example.com" }`
   - Steps:
     - Look up the user by email.
     - Generate a secure random token and store:
       - `resetPasswordToken`
       - `resetPasswordExpire` (e.g. 1 hour from now)
     - Build a URL pointing to the frontend, e.g.  
       `http://localhost:5173/reset-password?token=<RESET_TOKEN>`
     - Send an email using `utils/sendEmail.js` and the Mailtrap SMTP credentials.

2. **Reset Password (actually change it)**  
   - Endpoint: `POST /api/auth/reset-password`  
   - Body: `{ "token": "<RESET_TOKEN>", "password": "newPassword123" }`
   - Steps:
     - Validate token and expiry.
     - Hash the new password and save it on the user.
     - Clear `resetPasswordToken` and `resetPasswordExpire`.
     - Optionally, respond with a success message so the user can log in again.

### Frontend flow

- **ForgotPassword page (`/forgot-password`)**
  - Simple form that sends `email` to `POST /api/auth/forgot-password`.
  - On success, shows a message like:  
    _“If this email is registered, a password reset link has been sent.”_

- **ResetPassword page (`/reset-password`)**
  - Reads the `token` from the URL query string.
  - Shows a form to enter the new password (and confirmation, if desired).
  - Calls `POST /api/auth/reset-password` with `{ token, password }`.
  - On success, shows a success message and optionally redirects to `/login`.

### Using Mailtrap in development

1. Create a free Mailtrap account.
2. Go to **Email Testing → Inboxes → SMTP Settings**.
3. Copy the SMTP credentials (host, port, username, password).
4. Paste them into your backend `.env` as:

   ```env
   MAIL_HOST=sandbox.smtp.mailtrap.io
   MAIL_PORT=2525
   MAIL_USER=xxxxxxxxxxxxxx
   MAIL_PASS=xxxxxxxxxxxxxx
   MAIL_FROM="ArtCollab <no-reply@artcollab.test>"
   ```

5. Trigger a password reset from the frontend.
6. Open your Mailtrap inbox:
   - You should see the **reset password email**.
   - Click the link in the email → it will open your local frontend `/reset-password` page with the token already attached.

This approach is safe for local development and behaves very similarly to a production email flow.

---

## Current Frontend Pages

- `/` or `/homepage` – **Homepage**: hero, category cards, slideshow, quote, contact form.
- `/about` – **About**: “Our Vision” + three mission cards.
- `/login` – **Login** (email + password).
- `/signup` – **Sign Up** (username, email, password, optional profile fields).
- `/forgot-password` – Request reset link.
- `/reset-password` – Set new password using token from email.

The **Navbar** and **Footer** are shared across pages using the `app-shell` layout:

- Navbar fixed at the top via `--navbar-height` CSS variable.
- Main content wrapped in `.app-content` with padding to avoid being hidden behind the navbar.
- Footer sticks to the bottom when content is short.

---

## Roadmap Ideas

Future improvements and iterations might include:

- Artist profile pages with portfolios.
- Project boards for collaborative work.
- Richer feedback system (critiques, ratings, threaded comments).
- Support for audio and video uploads.
- Production‑grade email provider (SendGrid, SES, etc.) replacing Mailtrap.

---

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/my-new-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add my new feature"
   ```
4. Push the branch and open a Pull Request.

---

If you are setting this up for the first time, the quickest way to see it running is:

1. Start **MongoDB**.
2. Configure `.env` in the backend (including Mailtrap).
3. Run the backend (`npm run dev`).
4. Run the frontend (`npm run dev`).
5. Open `http://localhost:5173` and try:
   - Sign up
   - Log in
   - Forgot password → check Mailtrap → reset password.

Enjoy building with ArtCollab ✨

