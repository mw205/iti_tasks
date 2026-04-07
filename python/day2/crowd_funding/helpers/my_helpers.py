import datetime as date
import hashlib

from helpers.json_helpers import read_json


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def last_inserted_id(data: list) -> int:
    if len(data) == 0:
        return -1
    return data[-1]["id"]


def email_exists(email: str) -> bool:
    users_data = read_json("users.json")
    for user in users_data:
        if user["email"] == email:
            return True
    return False


def is_a_next_date(entered_date: str) -> bool:
    entered_date_formatted = date.datetime.strptime(entered_date, "%d-%m-%Y")
    return entered_date_formatted > date.datetime.now()


def validate_end_date(start_date: str, end_date: str) -> bool:
    start_date_formatted = date.datetime.strptime(start_date, "%d-%m-%Y")
    end_date_formatted = date.datetime.strptime(end_date, "%d-%m-%Y")
    return start_date_formatted < end_date_formatted
