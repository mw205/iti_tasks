import random

from validators.custom_validators import validate_name, validate_alphabet

words=['kiwi','banana','apple','orange']
chosen_word_index= random.randint(0,len(words)-1)
chosen_word = words[chosen_word_index]
username = input("enter your name : ")
while validate_name(username) ==False:
    username = input("enter a valid name : ")

trials = 7
user_guesses = []
user_won = False
print(chosen_word_index)
print("------- Hangman -------")
def decrease_trials():
    global trials
    trials-=1
    print(f"remaining trials : {trials}")
while True:
    user_guess = input("guess an alphabet: ")
    while not validate_alphabet(user_guess):
        user_guess=input("enter a valid alphabet: ").lower()
    if user_guess in user_guesses:
        print("already guessed")
        continue
    if user_guess in chosen_word:
        user_guesses.append(user_guess)
        for char in chosen_word:
            if char in user_guesses:
                print(char,end="")
            else:
                print("_",end="")
        print()
    else:
        decrease_trials()
    if trials == 0:
        break
    for char in chosen_word:
        if char not in user_guesses:
            user_won=False
            break
        else:
            user_won = True
    if user_won:
        print("You won!")
        break
print("Game over!!")