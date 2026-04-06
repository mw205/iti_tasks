def divisible_by_3(x:int) ->bool | None:
    if x.is_integer():
        return x % 3 == 0
    else:
        return None

def divisible_by_5(x:int) ->bool | None:
    if x.is_integer():
        return x % 5 == 0
    else:
        return None

num = input("enter a number : ")
while not num.isdigit():
    num = input("enter valid number: ")
num = int(num)
if divisible_by_3(num):
    print("Fizz",end="")

if divisible_by_5(num):
    print("Buzz",end="")
