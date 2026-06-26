import os
import pymysql
from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

def get_conn():
    return pymysql.connect(
        host=os.getenv("DB_HOST", "db"),
        port=int(os.getenv("DB_PORT", 3306)),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        cursorclass=pymysql.cursors.DictCursor,
    )


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/db-check")
def db_check():
    conn = get_conn()
    with conn:
        with conn.cursor() as cur:
            cur.execute("SHOW TABLES")
            tables = [list(row.values())[0] for row in cur.fetchall()]

            cur.execute("SELECT plan_name, monthly_price, api_limit FROM plans")
            plans = cur.fetchall()

            cur.execute("SELECT login_id, role FROM users")
            users = cur.fetchall()

            cur.execute("SELECT captcha_type, target_label FROM captchas")
            captchas = cur.fetchall()

    return {
        "tables": tables,
        "plans": plans,
        "users": users,
        "captchas": captchas,
    }
