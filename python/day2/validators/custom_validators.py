import re
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
def validate_alphabet(alpha:str)->bool|None:
    alphabet_pattern = r'^[a-zA-z]'
    match = re.fullmatch(alphabet_pattern, alpha)
    if match and alpha.strip()!="":
        return True
    else:
        return False