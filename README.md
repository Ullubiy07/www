# How to use?
#### 
You need to create `.env` files in `www/backend` and `www/frontend` directories

## www/backend

```env
DB_USER = 'your_name'
DB_PASSWORD = 'your_password'
DB_NAME = 'postgres'
DB_SERVER = 'db'

FRONTEND_URL = 'http://localhost:3000'
```

## www/frontend

```env
API_URL = 'http://localhost:8000'
```

## Start

```bash
make up
```
