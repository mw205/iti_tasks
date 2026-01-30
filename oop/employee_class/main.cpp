#include <iostream>
#include <string.h>
using namespace std;

class Employee
{
    int id;
    char name[10];
    int age;
    float salary;

public:
    // constructors

    Employee(int _id, char* _name, int _age, float _salary)
    {
        strcpy(name,_name);
        id = _id;
        age = _age;
        salary=_salary;
    }
    Employee(int _id, char* _name) : Employee(_id , _name , 22 , 6000 )
    {
    }
    Employee(int _id, char* _name, int _age) : Employee(_id , _name , _age , 6000 )
    {
    }
    // setters
    void setId(int id)
    {
        if (id > 0 && id < 100)
        {
            this->id = id;
        }
    }
    void setAge(int age)
    {
        if (age >= 22 && age < 60)
        {
            this->age = age;
        }
        else
        {
            cout << "invalid age" << endl;
        }
    }
    void setName(char *name)
    {
        if (strlen(name) > 3)
            strcpy(this->name, name);
        else
            cout << "invalid name";
    }
    void setSalary(float salary)
    {
        if (salary > 0)
            this->salary = salary;
    }

    // getters
    char *getName()
    {
        return name;
    }
    int getAge()
    {
        return age;
    }
    int getId()
    {
        return id;
    }
    float getSalary()
    {
        return salary;
    }
    // print
    void print()
    {
        cout << "Id : " << getId() << endl
             << "Name : " << getName() << endl
             << "Age : " << getAge() << endl
             << "Salary : " << getSalary() << endl;
    }
};
int main()
{
    Employee emp (10, "Mohamed"), emp2(10, "Mahmoud", 22), emp3(10, "Ali", 22, 5000);
    emp.print();
    cout << "=========================="<<endl;
    emp2.print();
    cout << "=========================="<<endl;
    emp3.print();
    return 0;
}
