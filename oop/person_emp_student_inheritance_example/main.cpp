#include <iostream>

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

class Student : public Person
{
    int grade;

public:
    Student(int id, string name, int age, int grade) : Person(id, name, age)
    {
        setGrade(grade);
    }
    void setGrade(int grade)
    {
        this->grade = grade;
    }
    int getGrade()
    {
        return grade;
    }
    void print()
    {
        Person::print();
        cout << "Grade: " << getGrade() << endl;
    }
};

int main()
{
    Employee e(1, "Mohamed", 22, 5000);

    Student s(2, "Aly", 16, 10);
    e.print();
    cout << "==================" << endl;
    cout << "Student Data:" << endl;
    s.print();
    return 0;
}
