#include <iostream>
#include <string>
#include <sstream>
using namespace std;

int main()
{
    // take a sentence from the user and print the number of words and characters
    string sentence;
    cout << "Enter a sentence: ";
    getline(cin, sentence);
    int words = 0;
    int character = 0;
    character = sentence.length();
    // check if the sentence is empty
    if (character != 0)
    {
        stringstream ss(sentence);
        string word;
        while (ss >> word)
        {
            words++;
        }
    }

    cout << "Words :" << words << endl;
    cout << "Characters: " << character;
    return 0;
}
