import re
from re import Match


def validate_name (name:str)->bool|None:
    name_pattern = r"^[a-zA-Z ]+((?:[\s.'-][a-zA-Z]+)*$)"
    match = re.fullmatch(name_pattern, name)
    if match and name.strip()!="":
        return True
    else:
        return False
def validate_email (email:str)->bool|None:
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    match = re.fullmatch(email_pattern, email)
    if match and email.strip()!="":
        return True
    else:
        return False

def validate_phone_number (phone:str)->bool|None:
    phone_pattern = r'^01[0125]\d{8}$'
    match = re.fullmatch(phone_pattern, phone)
    if match and phone.strip()!="":
        return True
    else:
        return False
def validate_password(password:str)->bool|None:
    if len(password) == 8 and password.strip()!="":
        return True
    else:
        return False
def validate_date(date:str)->bool:
    date_pattern = r'^\d{2}-\d{2}-\d{4}$'
    match = re.fullmatch(date_pattern, date)
    if match and date.strip()!="":
        return True
    else:
        return False
def password_match(password:str, confirm_password:str)-> bool | None:
    return password == confirm_password