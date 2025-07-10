# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a code review and assignment management platform built for educational use. The application uses a **React frontend** with a **Django REST API backend**.

### Frontend (React + Vite)
- **Location**: `team-grit/` directory
- **Framework**: React 19 with Vite for development and building
- **Routing**: React Router DOM for navigation between pages
- **State Management**: Local component state with props drilling for user context
- **Styling**: CSS modules and individual component stylesheets
- **Key Pages**: LoginPage, ClassListPage, AssignmentListPage, CodeViewPage, CreateClassPage, CreateAssignmentPage
- **Key Components**: LeftNav (user groups/files), CodeSection (file upload/display), CommentsSection (line-by-line comments)

### Backend (Django REST API)
- **Location**: `team-grit/backend/` directory
- **Framework**: Django 5.1 with Django REST Framework
- **Database**: SQLite (development), models include User, Class, Assignment, AssignmentGroup, AssignmentSubmission, AssignmentSubmissionFile, AssignmentSubmissionComment
- **API Structure**: RESTful endpoints under `/api/` prefix
- **Authentication**: Basic user model with teacher/student roles

## Common Development Commands

### Frontend Development
```bash
# Navigate to frontend directory
cd team-grit

# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Run tests
npm run test

# Preview production build
npm run preview
```

### Backend Development
```bash
# Navigate to backend directory
cd team-grit/backend

# Install Python dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Start development server (runs on http://127.0.0.1:8000)
python manage.py runserver

# Run tests
python manage.py test
```

## Testing

- **Frontend**: Uses Vitest with React Testing Library and jsdom environment
- **Backend**: Uses Django's built-in test framework
- **Test Files**: Frontend tests in `src/__tests__/`, backend tests in `api/tests.py`

## Key API Endpoints

- `/api/students/` - Student user management
- `/api/profs/` - Professor user management  
- `/api/classes/` - Class CRUD operations (supports teacher/student filtering)
- `/api/assignments/` - Assignment CRUD operations with nested routes for groups and submissions
- `/api/submit/` - Assignment submission management
- `/api/addfile/` - File upload for submissions

## Development Setup

1. **Frontend**: Expects backend running on `http://127.0.0.1:8000/`
2. **Backend**: Configured with CORS headers to allow frontend requests from `http://localhost:5173`
3. **Database**: SQLite file (`db.sqlite3`) created after running migrations

## Code Organization

- **Frontend Components**: Reusable UI components in `src/components/`
- **Frontend Pages**: Route-specific pages in `src/pages/`
- **Backend Models**: Database models in `api/models.py`
- **Backend API**: Serializers in `api/serializers.py`, views in `api/views.py`
- **Routing**: Frontend routes in `App.jsx`, backend URLs in `backend/urls.py`

## Data Flow

1. User authentication flows through LoginPage which fetches from `/api/students/` or `/api/profs/`
2. Class and assignment data flows from backend to frontend via REST API calls
3. File uploads and comments are submitted through dedicated API endpoints
4. State management is handled at the App level and passed down to components