# Deploying CivicConnect on Vercel

This project is configured for Vercel's Python runtime.

## 1. Push the project to GitHub

Do not commit `venv/`, `db.sqlite3`, `media/`, `staticfiles/`, or `.env`.
The included `.gitignore` excludes those local-only files.

## 2. Import the repository in Vercel

Create a new Vercel project from the GitHub repository.
Vercel will use:

- `.python-version` for Python 3.13
- `requirements.txt` for Python packages
- `vercel.json` for routing and the build command
- `api/index.py` as the Django WSGI entrypoint

## 3. Add environment variables in Vercel

Set these in Vercel Project Settings > Environment Variables:

```text
SECRET_KEY=replace-with-a-long-random-secret
DEBUG=False
ALLOWED_HOSTS=.vercel.app,your-custom-domain.com
CSRF_TRUSTED_ORIGINS=https://your-custom-domain.com,https://your-project.vercel.app
DATABASE_URL=your-postgres-database-url
```

`DATABASE_URL` is strongly recommended. Vercel serverless functions do not provide a persistent local SQLite database.

## 4. Database and uploads

Use a hosted PostgreSQL database for users and complaints. Vercel Marketplace storage, Neon, Supabase, or Railway Postgres will work.

Uploaded complaint photos also need external storage for production. The current local `media/` folder is fine for development, but uploads will not persist reliably on Vercel.

## 5. Run migrations

After setting `DATABASE_URL`, run migrations against the production database from your machine:

```powershell
$env:DATABASE_URL="your-postgres-database-url"
$env:SECRET_KEY="replace-with-a-long-random-secret"
$env:DEBUG="False"
python manage.py migrate
python manage.py createsuperuser
```

Then redeploy in Vercel.

