# Backend Overview

This folder contains a Django 5.1 project that exposes a REST API used by the React frontend.

## Getting Started

1. Install Python 3 and `pip`.
2. Install dependencies:

```bash
pip install -r backend/requirements.txt
```

3. Apply migrations and run the development server:

```bash
cd backend
python manage.py migrate
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/`.

## Project Layout

```
backend/
├── api/              # Django app with models, serializers, and views
├── backend/          # Project settings and URL configuration
├── db.sqlite3        # SQLite database (created after migrations)
├── manage.py         # Django management script
└── requirements.txt  # Python dependencies
```

### Important Files

- `api/models.py` – database models for users, classes, assignments, submissions, files and comments.
- `api/serializers.py` – serializers used by the REST API.
- `api/views.py` – viewsets that expose API endpoints.
- `backend/urls.py` – URL routes for the API.
- `tests.py` – example Django tests.

## API Endpoints

All endpoints are prefixed with `/api/`.

- `/api/students/` – list or create student users.
- `/api/profs/` – list or create professor users.
- `/api/classes/` – CRUD operations on classes. Query parameters `teacher` and `student` can be used to filter classes.
- `/api/assignments/` – CRUD operations on assignments. Each assignment exposes nested routes:
  - `/assignments/<id>/groups/` – groups of users for the assignment.
  - `/assignments/<id>/submissions/` – submissions for the assignment. Optional query parameters `student` and `current` filter results.
- `/api/submit/` – assignment submission objects.
- `/api/addfile/` – uploaded files associated with submissions.

## Running Tests

From `team-grit/backend` run:

```bash
python manage.py test
```

The provided test suite currently covers the class list API.

## Notes

- The project uses `django-cors-headers` to allow requests from the frontend development server (`http://localhost:5173`).
- The default database is SQLite. For production use, update `DATABASES` in `backend/settings.py`.
