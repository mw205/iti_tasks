#include <iostream>
#include <string>
#include <windows.h>
#include <conio.h>
#include <ctype.h>

using namespace std;

// --- DOMAIN CLASSES ---
class Person
{
    int id;
    string name;
    int age;

public:
    Person(int id, string name, int age)
    {
        setId(id);
        setName(name);
        setAge(age);
    }
    Person()
    {
        setId(0);
        setName("undetermined");
        setAge(22);
    }

    void setId(int id) { this->id = id; }
    void setName(string name) { this->name = name; }
    void setAge(int age) { this->age = age; }

    int getId() { return id; }
    string getName() { return name; }
    int getAge() { return age; }

    void print()
    {
        cout << "id : " << getId() << endl;
        cout << "name : " << getName() << endl;
        cout << "age : " << getAge() << endl;
    }
};

class Employee : public Person
{
    float salary;

public:
    Employee(int id, string name, int age, float salary) : Person(id, name, age)
    {
        setSalary(salary);
    }
    Employee() : Person()
    {
        salary = 0;
    }
    void setSalary(float salary) { this->salary = salary; }
    float getSalary() { return salary; }

    void print()
    {
        Person::print();
        cout << "Salary: " << getSalary() << endl;
    }
};

// --- LINKED LIST STRUCTURE ---
struct Node
{
public:
    Employee value;
    Node *prev;
    Node *next;
    Node(Employee newValue)
    {
        value = newValue;
        prev = nullptr;
        next = nullptr;
    }
};

class LinkedList
{
    Node *head;
    Node *tail;

public:
    LinkedList()
    {
        head = nullptr;
        tail = nullptr;
    }

    bool isEmpty()
    {
        return head == nullptr;
    }

    void display()
    {
        if (isEmpty())
        {
            cout << "List is Empty \n";
            return;
        }
        Node *temp = head;
        int count = 1;
        while (temp)
        {
            cout << "\n--- Record " << count++ << " ---" << endl;
            temp->value.print();
            temp = temp->next;
        }
    }

    void append(int id, string name, int age, float salary)
    {
        Employee emp(id, name, age, salary);
        Node *temp = new Node(emp);

        if (isEmpty())
        {
            head = temp;
            tail = temp;
        }
        else
        {
            tail->next = temp;
            temp->prev = tail;
            tail = temp;
        }
    }

    Employee *searchById(int id)
    {
        Node *temp = head;
        while (temp)
        {
            if (temp->value.getId() == id)
            {
                return &temp->value;
            }
            temp = temp->next;
        }
        return nullptr;
    }

    int count()
    {
        int n = 0;
        Node *temp = head;
        while (temp)
        {
            n++;
            temp = temp->next;
        }
        return n;
    }

    void deleteNode(int id)
    {
        Node *temp = head;

        while (temp != nullptr && temp->value.getId() != id)
        {
            temp = temp->next;
        }
        if (temp == nullptr)
        {
            cout << "Employee not found !!";
            return;
        }

        // Logic for deletion
        if (temp == head)
        {
            head = head->next;
            if (head)
                head->prev = nullptr;
            else
                tail = nullptr; // List became empty
        }
        else if (temp == tail)
        {
            tail = tail->prev;
            if (tail)
                tail->next = nullptr;
            else
                head = nullptr;
        }
        else // Middle
        {
            temp->prev->next = temp->next;
            temp->next->prev = temp->prev;
        }

        delete temp; // FIX: Free memory
        cout << "Employee deleted successfully.\n";
    }

    Employee &getElement(int index)
    {
        Node *temp = head;
        for (int i = 0; i < index && temp != nullptr; i++)
        {
            temp = temp->next;
        }
        return temp->value;
    }
};

struct MenuOption
{
    char title[20];
    char subtitles[3][50];
    int subCount;
};

// --- HELPER FUNCTIONS ---
void gotoxy(int x, int y)
{
    COORD coord;
    coord.X = x;
    coord.Y = y;
    SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), coord);
}

void textattr(int color)
{
    SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), color);
}

void printEmployeeDetails(Employee emp)
{
    // Using the print method from the class for consistency
    emp.print();
}

void addNewEmployee(LinkedList &employees)
{
    int id;
    string name;
    float salary;
    bool valid = false;

    cout << "\n--- Enter New Employee Data ---\n";

    // 1. ROBUST ID VALIDATION
    do
    {
        cout << "Enter ID: ";
        cin >> id;

        if (cin.fail())
        {
            // User typed text instead of a number
            cin.clear();             // Reset error flag
            cin.ignore(10000, '\n'); // Discard bad input
            cout << "Error: Please enter a numeric value.\n";
            valid = false;
        }
        else if (id <= 0)
        {
            cout << "Error: ID must be a positive number.\n";
            valid = false;
        }
        else if (employees.searchById(id) != nullptr)
        {
            cout << "Error: ID " << id << " already exists! Please choose a unique ID.\n";
            valid = false;
        }
        else
        {
            valid = true;
        }
    } while (!valid);

    // 2. NAME VALIDATION
    cout << "Enter Name: ";
    cin.ignore(); // Clear newline from previous cin
    do
    {
        getline(cin, name);
        if (name.length() < 2)
        {
            cout << "Name is too short. Enter Name: ";
        }
    } while (name.length() < 2);

    // 3. SALARY VALIDATION
    valid = false;
    do
    {
        cout << "Enter Salary: ";
        cin >> salary;

        if (cin.fail())
        {
            cin.clear();
            cin.ignore(10000, '\n');
            cout << "Error: Please enter a numeric value for salary.\n";
            valid = false;
        }
        else if (salary < 0)
        {
            cout << "Error: Salary cannot be negative.\n";
            valid = false;
        }
        else
        {
            valid = true;
        }
    } while (!valid);

    employees.append(id, name, 22, salary);
    cout << "Employee added successfully!\n";
}

void addNewMultipleEmployees(LinkedList &employees)
{
    int numToAdd;
    bool valid = false;

    do
    {
        cout << "How many employees do you want to add? ";
        cin >> numToAdd;

        if (cin.fail() || numToAdd < 1)
        {
            cin.clear();
            cin.ignore(10000, '\n');
            cout << "Please enter a valid number (at least 1).\n";
            valid = false;
        }
        else
        {
            valid = true;
        }
    } while (!valid);

    for (int i = 0; i < numToAdd; i++)
    {
        cout << "\n--------------------------------";
        cout << "\n(Record " << (i + 1) << " of " << numToAdd << ")";
        addNewEmployee(employees);
    }

    cout << "\n\nDone! Added " << numToAdd << " employees.\n";
}
void displayEmployeeByNumber(LinkedList &employees)
{
    int count = employees.count();
    if (count == 0)
    {
        cout << "List is empty.\n";
        return;
    }

    int rowNumber;
    do
    {
        cout << "Enter record number to display (1-" << count << "): ";
        cin >> rowNumber;
        if (rowNumber < 1 || rowNumber > count)
        {
            cout << "Invalid record number.\n";
        }
    } while (rowNumber < 1 || rowNumber > count);

    // Get element at index (rowNumber - 1)
    Employee &emp = employees.getElement(rowNumber - 1);
    cout << "\n--- Displaying Record " << rowNumber << " ---\n";
    emp.print();
}

int main()
{
    char ch;
    int hindex = 0;
    int sindex = 0;
    int menuLevel = 0;

    // Modified menu structure to fit Dynamic nature
    MenuOption options[3] =
        {
            {"New", {"Multiple Records", "Single Record"}, 2}, // Changed "Record by Number" to "Single Record"
            {"Display", {"All Records", "Record by Number"}, 2},
            {"Exit", {""}, 0}};

    // REMOVED: arrSize prompting.
    LinkedList employees;

    cout << "System ready. Press any key to start...";
    getch();

    do
    {
        system("cls");

        // Menu Drawing Logic
        for (int i = 0; i < 3; i++)
        {
            gotoxy(0, 0 + i);
            if (i == hindex)
            {
                textattr(0x04); // Highlight Main Menu
                cout << options[i].title;

                if (options[i].subCount > 0 && menuLevel == 1) // Only show sub if entered
                {
                    for (int j = 0; j < options[i].subCount; j++)
                    {
                        gotoxy(15, 0 + j); // Offset sub-menu
                        if (j == sindex)
                            textattr(0x03); // Highlight Sub Menu
                        else
                            textattr(0x07);
                        cout << options[i].subtitles[j];
                    }
                }
            }
            else
            {
                textattr(0x07);
                cout << options[i].title;
            }
        }
        textattr(0x07);

        // Input Handling
        ch = getch();

        if (ch == -32) // Extended keys
        {
            ch = getch();
            switch (ch)
            {
            case 72: // Up
                if (menuLevel == 0)
                {
                    hindex--;
                    if (hindex < 0)
                        hindex = 2;
                }
                else
                {
                    sindex--;
                    if (sindex < 0)
                        sindex = options[hindex].subCount - 1;
                }
                break;
            case 80: // Down
                if (menuLevel == 0)
                {
                    hindex++;
                    if (hindex > 2)
                        hindex = 0;
                }
                else
                {
                    sindex++;
                    if (sindex >= options[hindex].subCount)
                        sindex = 0;
                }
                break;
            case 77: // Right (Enter sub)
                if (menuLevel == 0 && options[hindex].subCount > 0)
                {
                    menuLevel = 1;
                    sindex = 0;
                }
                break;
            case 75: // Left (Back)
                if (menuLevel == 1)
                    menuLevel = 0;
                break;
            }
        }
        else if (ch == 13) // Enter
        {
            system("cls");
            if (menuLevel == 0)
            {
                if (hindex == 2)
                    return 0; // Exit
                if (options[hindex].subCount > 0)
                    menuLevel = 1; // Enter Sub
            }
            else
            {
                // Action Logic
                if (hindex == 0) // NEW
                {
                    if (sindex == 0)
                        addNewMultipleEmployees(employees);
                    else
                        addNewEmployee(employees); // Single Add
                }
                else if (hindex == 1) // DISPLAY
                {
                    if (sindex == 0)
                        employees.display();
                    else
                        displayEmployeeByNumber(employees);
                }

                cout << "\n\nPress any key to return to the menu...";
                getch();
            }
        }
        else if (ch == 27) // Escape
        {
            if (menuLevel == 1)
                menuLevel = 0;
            else
                break;
        }

    } while (true);

    return 0;
}