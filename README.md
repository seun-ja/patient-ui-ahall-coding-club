# Patient Health Management System UI

>A modern web application for patients to manage appointments and health records, built with Next.js, React, and Tailwind CSS.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [License](#license)

---

## Overview

This UI is part of a Health Management System, enabling patients to:
- Book and view appointments
- Manage their health records
- Securely authenticate and access their data

The application is designed for a seamless, responsive experience with a focus on usability and security.

## Features
- **User Authentication**: Secure login with JWT-based session management
- **Appointment Booking**: Schedule and view upcoming appointments
- **Profile Management**: View and update user profile (UI ready)
- **Responsive Design**: Mobile-first, accessible, and visually appealing
- **Modern UI**: Built with Tailwind CSS and Framer Motion for smooth animations

## Tech Stack
- [Next.js](https://nextjs.org/) (v16)
- [React](https://react.dev/) (v19)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Axios](https://axios-http.com/) (API requests)
- [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
1. Clone the repository:
	```bash
	git clone <repo-url>
	cd patient_ui
	```
2. Install dependencies:
	```bash
	npm install
	# or
	yarn install
	```
3. Create a `.env.local` file in the root directory and set the following:
	```env
	NEXT_PUBLIC_API_URL=<your-backend-api-url>
	```
4. Run the development server:
	```bash
	npm run dev
	# or
	yarn dev
	```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm start` — Start the production server
- `npm run lint` — Run ESLint

## Custom localhost

Install `portless`. Learn more [here](https://port1355.dev/)

```bash
`npm install -g portless`
```

Enable HTTPS (one-time setup, auto-generates certs)
```bash
`portless proxy start --https`
```

Start the development server

```bash
`portless patient next dev`
```

## Environment Variables

Create a `.env.local` file in the root directory with:

```
NEXT_PUBLIC_API_URL=<your-backend-api-url>
```
