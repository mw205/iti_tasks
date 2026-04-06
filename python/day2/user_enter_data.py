from validators.custom_validators import *
username  = input("enter your name: ")
while validate_name(username) ==False:
    username = input("invalid name\nenter valid name: ")

user_email  = input("enter your email: ")
while  validate_email(user_email)==False:
    user_email = input("invalid email\nenter valid email: ")

print(f"user name: {username}")
print(f"user email: {user_email}")