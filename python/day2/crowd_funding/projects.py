import datetime
from crowd_funding.helpers.json_helpers import read_json, write_json
from crowd_funding.helpers.my_helpers import is_a_next_date, validate_end_date, last_inserted_id
from validators.custom_validators import validate_name, validate_date


def create_project(user_email: str) -> dict | None:
    title = input("enter project's title: ")
    while validate_name(title) == False:
        title = input("invalid title\nenter valid title: ")

    description = input("enter project's description: ")
    while validate_name(description) == False:
        description = input("invalid description\nenter valid description: ")

    total_target = input("enter project's total target: ")
    while True:
        try:
            if float(total_target) <= 0:
                raise ValueError
            break
        except ValueError:
            total_target = input("invalid total target\nenter valid total target: ")

    start_date = input("enter campaign's start date (dd-mm-yyyy): ")
    while not validate_date(start_date) or not is_a_next_date(start_date):
        start_date = input("invalid start date \nenter valid date (dd-mm-yyyy): ")

    end_date = input("enter campaign's end date (dd-mm-yyyy): ")
    while not validate_date(end_date) or not validate_end_date(start_date, end_date):
        end_date = input("invalid end date \nenter valid date (dd-mm-yyyy): ")

    projects_data = read_json('projects.json')
    new_id = last_inserted_id(projects_data) + 1

    data = {
        'id': new_id,
        'title': title,
        'details': description,
        'total_target': float(total_target),
        'start_time': start_date,
        'end_time': end_date,
        "owner_email": user_email
    }
    projects_data.append(data)
    write_json('projects.json', projects_data)
    print("Project created successfully!")


def delete_project(user_email: str):
    projects_data = read_json('projects.json')
    user_projects = [p for p in projects_data if p['owner_email'] == user_email]
    
    if not user_projects:
        print("You don't have any projects to delete.")
        return

    print("--- Your Projects ---")
    for p in user_projects:
        print(f"ID: {p['id']} | Title: {p['title']}")
    
    project_id = input("Enter the ID of the project you want to delete: ")
    
    found = False
    for i, project in enumerate(projects_data):
        if str(project['id']) == project_id and project['owner_email'] == user_email:
            projects_data.pop(i)
            found = True
            break
    
    if found:
        write_json('projects.json', projects_data)
        print("Project deleted successfully.")
    else:
        print("Project not found or you don't have permission to delete it.")


def list_projects() -> list | None:
    projects_data = read_json('projects.json')
    if not projects_data:
        print("No projects found.")
        return
    print("----------------------Projects List-----------------------")
    for project in projects_data:
        print("ID:", project.get('id', 'N/A'))
        print("title:", project['title'])
        print("description:", project['details'])
        print("total target:", project['total_target'])
        print("start date:", project['start_time'])
        print("end date:", project['end_time'])
        print("owner:", project['owner_email'])
        print("----------------------------------------------------------")


def edit_project(user_email: str):
    projects_data = read_json('projects.json')
    user_projects = [p for p in projects_data if p['owner_email'] == user_email]
    
    if not user_projects:
        print("You don't have any projects to edit.")
        return

    print("--- Your Projects ---")
    for p in user_projects:
        print(f"ID: {p['id']} | Title: {p['title']}")
    
    project_id = input("Enter the ID of the project you want to edit: ")
    
    project_to_edit = None
    for project in projects_data:
        if str(project['id']) == project_id and project['owner_email'] == user_email:
            project_to_edit = project
            break
    
    if not project_to_edit:
        print("Project not found or you don't have permission to edit it.")
        return

    print("Leave blank to keep current value.")
    
    new_title = input(f"Enter new title [{project_to_edit['title']}]: ")
    if new_title.strip():
        while validate_name(new_title) == False:
            new_title = input("invalid title\nenter valid title: ")
        project_to_edit['title'] = new_title

    new_details = input(f"Enter new description [{project_to_edit['details']}]: ")
    if new_details.strip():
        while validate_name(new_details) == False:
            new_details = input("invalid description\nenter valid description: ")
        project_to_edit['details'] = new_details

    new_target = input(f"Enter new total target [{project_to_edit['total_target']}]: ")
    if new_target.strip():
        while True:
            try:
                if float(new_target) <= 0:
                    raise ValueError
                project_to_edit['total_target'] = float(new_target)
                break
            except ValueError:
                new_target = input("invalid total target\nenter valid total target: ")

    new_start = input(f"Enter new start date [{project_to_edit['start_time']}]: ")
    if new_start.strip():
        while not validate_date(new_start) or not is_a_next_date(new_start):
            new_start = input("invalid start date \nenter valid date (dd-mm-yyyy): ")
        project_to_edit['start_time'] = new_start

    new_end = input(f"Enter new end date [{project_to_edit['end_time']}]: ")
    if new_end.strip():
        while not validate_date(new_end) or not validate_end_date(project_to_edit['start_time'], new_end):
            new_end = input("invalid end date \nenter valid date (dd-mm-yyyy): ")
        project_to_edit['end_time'] = new_end

    write_json('projects.json', projects_data)
    print("Project updated successfully.")


def search_by_date():
    search_date = input("Enter date to search for projects active during that time (dd-mm-yyyy): ")
    while not validate_date(search_date):
        search_date = input("Invalid format. Enter valid date (dd-mm-yyyy): ")
    
    search_date_obj = datetime.datetime.strptime(search_date, "%d-%m-%Y")
    projects_data = read_json('projects.json')
    
    results = []
    for project in projects_data:
        start = datetime.datetime.strptime(project['start_time'], "%d-%m-%Y")
        end = datetime.datetime.strptime(project['end_time'], "%d-%m-%Y")
        if start <= search_date_obj <= end:
            results.append(project)
    
    if not results:
        print("No projects found for this date.")
    else:
        print(f"--- Projects active on {search_date} ---")
        for project in results:
            print(f"Title: {project['title']} | Target: {project['total_target']} | End Date: {project['end_time']}")
