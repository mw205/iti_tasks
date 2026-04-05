n = input("enter a number: ")
while not n.isdigit():
    n = input("enter a valid number : ")
n = int(n)
multiplication_table = []
for i in range(1, n+1):
    l = []
    for j in range(1,i+1):
        l.append(j*i)
    multiplication_table.append(l)

print(multiplication_table)