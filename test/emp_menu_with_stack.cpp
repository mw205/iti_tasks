#include <iostream>
#include <string>
#include <windows.h>
#include <conio.h>
#include <ctype.h>

using namespace std;

class Person
{
    int id;
    string name;
    int age;

public:
    // constructors
    Person(int id, string name, int age)
    {
        setId(id);
        setName(name);
        setAge(age);
    }

    // setters

    void setId(int id)
    {
        this->id = id;
    }
    void setName(string name)
    {
        this->name = name;
    }
    void setAge(int age)
    {
        this->age = age;
    }
    // getters
    int getId()
    {
        return id;
    }

    string getName()
    {
        return name;
    }

    int getAge()
    {
        return age;
    }

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
    Employee();
    void setSalary(float salary)
    {
        this->salary = salary;
    }

    float getSalary()
    {
        return salary;
    }
    void print()
    {
        Person::print();
        cout << "Salary: " << getSalary() << endl;
    }
};

struct MenuOption
{
    char title[20];
    char subtitles[3][50];
    int subCount;
};

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

void printEmployeeDetails(Employee emp);
void addNewEmployee(Employee employees[], int index);
void addNewMultipleEmployees(Employee employees[], int arrSize);
void displayAllEmployees(Employee employees[], int arrSize);
void displayEmployeeByNumber(Employee employees[], int arrSize);

int main()
{
    char ch;
    int hindex = 0;
    int sindex = 0;
    int menuLevel = 0;

    MenuOption options[3] =
        {
            {"New", {"Multiple Records", "Record by Number"}, 2},
            {"Display", {"Multiple Records", "Record by Number"}, 2},
            {"Exit", {""}, 0}};

    Employee *employees;
    int arrSize;

    do
    {
        cout << "Enter the total number of employee records to store: ";
        cin >> arrSize;
        if (arrSize < 1)
        {
            system("cls");
            cout << "You must have at least 1 record.\n";
        }
    } while (arrSize < 1);

    employees = new Employee[arrSize];

    cout << "System ready to store " << arrSize << " employees. Press any key...";
    getch();
    do
    {
        system("cls");

        for (int i = 0; i < 3; i++)
        {
            gotoxy(0, 0 + i);
            if (i == hindex)
            {
                textattr(0x04);
                cout << options[i].title;

                if (options[i].subCount > 0)
                {
                    for (int j = 0; j < options[i].subCount; j++)
                    {
                        gotoxy(10, 0 + j);
                        if (menuLevel == 1 && j == sindex)
                        {
                            textattr(0x03);
                        }
                        else
                        {
                            textattr(0x07);
                        }
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

        ch = getch();

        if (ch == -32)
        {
            ch = getch();
            switch (ch)
            {
            // arrow up
            case 72:
                if (menuLevel == 0)
                {
                    hindex--;
                    if (hindex < 0)
                        hindex = 2;
                    sindex = 0;
                }
                else
                {
                    sindex--;
                    if (sindex < 0)
                        sindex = options[hindex].subCount - 1;
                }
                break;

            // arrow down
            case 80:
                if (menuLevel == 0)
                {
                    hindex++;
                    if (hindex > 2)
                        hindex = 0;
                    sindex = 0;
                }
                else
                {
                    sindex++;
                    if (sindex >= options[hindex].subCount)
                        sindex = 0;
                }
                break;

            // arrow right
            case 77:
                if (menuLevel == 0 && options[hindex].subCount > 0)
                {
                    menuLevel = 1;
                }
                break;

            // arrow left
            case 75:
                if (menuLevel == 1)
                {
                    menuLevel = 0;
                }
                break;

            // home case
            case 71:
                hindex = 0;
                sindex = 0;
                menuLevel = 0;
                break;

            // end.
            case 79:
                hindex = 2;
                sindex = 0;
                menuLevel = 0;
                break;
            }
        }
        else if (ch == 13) // Enter
        {
            system("cls");
            if (menuLevel == 0)
            {
                if (hindex == 2) // Exit
                {
                    cout << "Exiting program." << endl;
                    delete[] employees;
                    return 0;
                }
                else if (options[hindex].subCount > 0)
                {
                    menuLevel = 1;
                }
            }
            else // menuLevel == 1
            {
                switch (hindex)
                {
                case 0:              // New
                    if (sindex == 0) // Multiple Records
                    {

                        addNewMultipleEmployees(employees, arrSize);
                    }
                    else // Record by Number
                    {
                        int rowNumber;
                        do
                        {
                            cout << "Enter record number to add/edit (1-" << arrSize << "): ";
                            cin >> rowNumber;
                            if (rowNumber < 1 || rowNumber > arrSize)
                            {
                                system("cls");
                                cout << "Invalid record number. Please enter a value between 1 and " << arrSize << ".\n";
                            }
                        } while (rowNumber < 1 || rowNumber > arrSize);

                        addNewEmployee(employees, rowNumber - 1);
                    }
                    break;

                case 1:              // Display
                    if (sindex == 0) // Multiple Records
                    {

                        displayAllEmployees(employees, arrSize);
                    }
                    else // Record by Number
                    {

                        displayEmployeeByNumber(employees, arrSize);
                    }
                    break;
                }

                cout << "\n\nPress any key to return to the menu...";
                getch();
            }
        }
        else if (ch == 27) // Escape
        {
            if (menuLevel == 1)
            {
                menuLevel = 0;
                ch = 0;
            }
            else
            {
                break;
            }
        }

    } while (ch != 27);

    delete[] employees;
    return 0;
}

void printEmployeeDetails(Employee emp)
{
    emp.print();
}

void addNewEmployee(Employee employees[], int index)
{
    if (employees[index].getId() != 0)
    {
        cout << "\nThis record already contains data:\n";
        printEmployeeDetails(employees[index]);

        char overrideChoice;
        do
        {
            cout << "\n\nDo you want to override it? (y/n): ";
            cin >> overrideChoice;
            overrideChoice = tolower(overrideChoice); // Handle 'Y' or 'y'
        } while (overrideChoice != 'y' && overrideChoice != 'n');

        if (overrideChoice != 'y')
        {
            cout << "Operation cancelled.";
            return;
        }
    }

    do
    {
        cout << "\nEnter New Employee ID  : ";
        int tempId;
        cin >> tempId;
        employees[index].setId(tempId);

    } while (employees[index].getId() <= 0);

    cout << "Enter New Employee Name: ";
    cin.ignore();
    // replace gets with getline

    string temp;
    getline(cin, temp);
    employees[index].setName(temp);

    do
    {
        cout << "Enter New Employee Salary : ";
        float tempSalary;
        cin >> tempSalary;
        employees[index].setSalary(tempSalary);
    } while (employees[index].getSalary() < 0);

    cout << "\nEmployee data saved successfully at record " << (index + 1) << ".";
}

void addNewMultipleEmployees(Employee employees[], int arrSize)
{
    int numToAdd;
    bool valid = false;
    do
    {
        cout << "How many employees do you want to add? (1-" << arrSize << "): ";
        cin >> numToAdd;

        if (numToAdd > arrSize || numToAdd < 1)
        {
            system("cls");
            cout << "Enter a valid number between (1-" << arrSize << ")\n";
            valid = false;
        }
        else
        {
            valid = true;
        }

    } while (valid == false);

    int addedCount = 0;

    for (int i = 0; i < arrSize && addedCount < numToAdd; i++)
    {
        if (employees[i].getId() == 0)
        {
            cout << "\n--- Adding Employee in Record " << (i + 1) << " ---" << endl;
            addNewEmployee(employees, i);
            addedCount++;
        }
    }

    if (addedCount == 0)
    {
        cout << "Could not add any employees. The array might be full.";
    }
    else
    {
        cout << "\n\nFinished adding " << addedCount << " employee(s).";
    }
}

void displayAllEmployees(Employee employees[], int arrSize)
{
    cout << "--- All Employee Records ---" << endl;
    bool found = false;

    for (int i = 0; i < arrSize; i++)
    {
        if (employees[i].getId() != 0)
        {
            cout << "\nRecord " << (i + 1) << ":\n";
            printEmployeeDetails(employees[i]);
            cout << "\n----------------------------\n";
            found = true;
        }
    }

    if (!found)
    {
        cout << "No employee records found.\n";
    }
}

void displayEmployeeByNumber(Employee employees[], int arrSize)
{
    int rowNumber;

    do
    {
        cout << "Enter record number to display (1-" << arrSize << "): ";
        cin >> rowNumber;
        if (rowNumber < 1 || rowNumber > arrSize)
        {
            system("cls");
            cout << "Invalid record number. Please enter a value between 1 and " << arrSize << ".\n";
        }
    } while (rowNumber < 1 || rowNumber > arrSize);

    int index = rowNumber - 1;
    if (employees[index].getId() != 0)
    {
        cout << "\n--- Displaying Record " << rowNumber << " ---\n";
        printEmployeeDetails(employees[index]);
    }
    else
    {
        cout << "Record " << rowNumber << " is empty.";
    }
}
