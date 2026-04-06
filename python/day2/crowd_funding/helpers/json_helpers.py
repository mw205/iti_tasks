import json
def write_json(file_path:str, json_data:list)->None:
    try:
        with open(file_path, 'w') as file:
            json.dump(json_data, file)
    except Exception as e:
        print(e)
    return None

def read_json(file_path:str) -> list:
    try:
        with open(file_path, 'r') as file:
            json_data = json.load(file)
            return json_data
    except Exception as e:
        print(e)
    return []

