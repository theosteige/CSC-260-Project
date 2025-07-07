# Frontend Overview

The frontend is built with React using [Vite](https://vitejs.dev/) for development and bundling.
It communicates with the Django backend via REST calls.

## Getting Started

1. Install Node.js (version 18+ recommended).
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The app will be served at `http://localhost:5173/` by default and expects the backend to be running on `http://127.0.0.1:8000/`.

## Project Layout

```
src/
├── components/  # Reusable UI components
├── pages/       # Top‑level pages used by the router
├── assets/      # Static assets (images, etc.)
├── App.jsx      # Main router and layout
└── main.jsx     # Entry point
```

Other notable files:

- `index.html` – HTML template used by Vite.
- `vite.config.js` – Vite configuration.
- `eslint.config.js` – ESLint configuration for linting.

## Key Concepts

- **Routing:** React Router is used to navigate between pages (`/login`, `/classes`, `/assignments/:classId`, etc.).
- **State Management:** Components maintain local state using React hooks. Example: `App.jsx` stores the current user and passes it down to pages.
- **API Integration:** Pages fetch data from the Django API using `fetch()` calls. For example, `LoginPage.jsx` retrieves users from `/api/students/` and `/api/profs/`.
- **Components:**
  - `LeftNav` – Displays user groups and submission files.
  - `CodeSection` – Uploads and displays code files.
  - `CommentsSection` – Displays and creates comments on code lines.

## Building for Production

Run:

```bash
npm run build
```

The optimized build output will be placed in the `dist/` directory.
Use `npm run preview` to locally preview a production build.

## Contributing

- Follow existing code style (see `.eslintrc` in `eslint.config.js`).
- New components should live in `src/components/`.
- New pages should be placed in `src/pages/` and registered in `App.jsx` routes.
- When making API requests, keep URLs relative (`http://127.0.0.1:8000/api/...`) or move them to a configuration file if needed.

## Troubleshooting

If you encounter lint warnings, run:

```bash
npm run lint
```

Make sure the backend server is running so API requests succeed during development.
