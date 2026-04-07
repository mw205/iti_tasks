from helpers.json_helpers import read_json, write_json
from helpers.my_helpers import hash_password, last_inserted_id, email_exists
from validators.custom_validators import *


def register() -> bool | None:
    first_name = input("enter your first name: ")
    while validate_name(first_name) == False:
        first_name = input("invalid name\nenter valid name: ")

    last_name = input("enter your last name: ")
    while validate_name(last_name) == False:
        last_name = input("invalid name\nenter valid name: ")

    password = input("enter your password: ")
    while validate_password(password) == False:
        password = input("invalid password\nreenter your password: ")

    confirm_password = input("confirm your password: ")
    while password_match(password, confirm_password) == False:
        confirm_password = input("passwords don't match reenter your password: ")

    email = input("enter your email: ")
    while validate_email(email) == False:
        email = input("invalid email\nenter valid email: ")
    while email_exists(email):
        email = input("email already exists\nenter unique email: ")
    phone_number = input("enter your phone: ")
    while validate_phone_number(phone_number) == False:
        phone_number = input("invalid phone number\nenter valid phone number: ")

    json_data = read_json("users.json")
    user_data = {
        "id": last_inserted_id(json_data) + 1,
        "first_name": first_name,
        "last_name": last_name,
        "password": hash_password(password),
        "email": email,
        "phone_number": phone_number
    }
    json_data.append(user_data)
    write_json("users.json", json_data)
    return True


def login() -> str | None:
    json_data = read_json("users.json")

    email = input("enter your email: ")
    while validate_email(email) == False:
        email = input("invalid email\nenter valid name: ")
    while not email_exists(email):
        email = input("this email doesn't exist\nenter valid email: ")
    password = input("enter your password: ")
    while validate_password(password) == False:
        password = input("invalid password\nreenter your password: ")

    for user in json_data:
        if user["email"] == email and user["password"] == hash_password(password):
            return email
    return None
