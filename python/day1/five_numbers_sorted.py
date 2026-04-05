nums = []
for i in range(5):
    n = input(f"enter number {i+1} : ")
    while not n.isdigit():
        n = input("enter a valid number : ")
    nums.append(int(n))


print("nums in ascending order : ")
print(sorted(nums))
print("nums in descending order : ")
print(sorted(nums, reverse=True))