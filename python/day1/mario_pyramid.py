n = input("enter a number: ")
while not n.isdigit():
    n = input("enter a valid number : ")
n = int(n)

for i in range(n):
    print((n-i+1)*" "+ "*"*(i+1))