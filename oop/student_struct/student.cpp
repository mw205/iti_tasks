#include <iostream>
#include<string.h>
using namespace std;

struct Student
{
    int id;
    char fullName [20];
    int grade;
};
void printStudentDetails (Student student);

int main()
{
   struct Student student ;
    cout <<"enter student's ID : ";
    cin>> student.id;
    cout <<"enter student's Full Name : ";
     cin.ignore();
     gets(student.fullName);
    cout << "enter student's grade : ";
    cin>> student.grade;
    printStudentDetails(student);

    return 0;
}
void printStudentDetails (Student student){
        cout << "\nStudent ID: " << student.id
         << "\nStudent Name: " << student.fullName
         << "\nGrade: " << student.grade << endl;
}
