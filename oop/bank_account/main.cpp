#include <string.h>
#include <iostream>

using namespace std;

class BankAccount
{

    int id;
    float balance = 0;
    char name[10];

public:
    void withdraw(float amount)
    {
        if (amount > balance)
        {
            cout << "Invalid operation, there is no sufficient amount";
        }
        else
        {
            balance -= amount;
            cout << "withdrawal done!";
        }
    }
    void deposit(float amount)
    {
        if (amount > 0)
        {
            balance += amount;
            cout << "deposit done !";
        }
        else
        {
            cout << "Invalid operation, amount should be more than 0";
        }
    }
    void displayBalance()
    {
        cout << "Current Balance : " << balance;
    }
    float getBalance()
    {
        return balance;
    }
    void setId(int id)
    {
        if (id > 0)
        {

            this->id = id;
        }
        else
        {
            cout << "id should be more than 0";
        }
    }
    int getId()
    {
        return id;
    }
    void setName(const char *name)
    {
        if (strlen(name) > 3)
        {
            strcpy(this->name, name);
        }
        else
        {
            cout << "name should be more than 3 characters";
        }
    }
    char *getName()
    {
        return name;
    }
    void printBankAccountInfo()
    {
        cout << "id : " << id << endl
             << "name : " << name << endl
             << "balance : " << balance << endl;
    }
};

int main()
{
    BankAccount ba;
    ba.setId(10);
    ba.setName("mo waleed");
    ba.deposit(100);
    cout << endl;
    ba.displayBalance();
    cout << endl;
    ba.withdraw(50);
    cout << endl;
    ba.displayBalance();
    cout << endl;
    cout << "balance now : " << ba.getBalance() << endl;
    cout << "Bank Account Info : " << endl;
    ba.printBankAccountInfo();
    cout << endl;
    return 0;
}
