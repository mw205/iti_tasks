from auth import login, register
from projects import create_project, list_projects, edit_project, delete_project, search_by_date


def project_menu(user_email: str):
    while True:
        print(f"Welcome in main menu (logged in as {user_email})")
        print(
            "1. Create Project\n2. View all projects\n3. Edit my project\n4. Delete my Project\n5. Search By Date\n6. Logout")
        choice = input("Enter your choice: ")
        if choice == "1":
            create_project(user_email)
        elif choice == "2":
            list_projects()
        elif choice == "3":
            edit_project(user_email)
        elif choice == "4":
            delete_project(user_email)
        elif choice == "5":
            search_by_date()
        elif choice == "6":
            print("Thank you for using crowd funding")
            break


if __name__ == '__main__':
    while True:
        user_choice = input("1.Login\n2.Register\n3.Exit\nenter your choice: ")
        if user_choice == "1":
            user_email = login()
            if user_email:
                print("Login Successful")
                project_menu(user_email)
        elif user_choice == "2":
            if register():
                print("Register Successful")
        elif user_choice == "3":
            print("Goodbye")
            break
        else:
            print("Invalid Choice")
    print("Thank you for using crowd funding")
