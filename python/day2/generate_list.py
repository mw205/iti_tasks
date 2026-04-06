def generate_list(start:int, length:int)->list|None:
    if start.is_integer() and length.is_integer():
        generated_nums = []
        for i in range(start , length+1):
            generated_nums.append(i+1)
        return generated_nums
    else:
        print("Invalid arguments")
        return None

start = input("enter the start : ")
while not start.isdigit():
    start = input("enter valid number in start: ")

length = input("enter the length : ")
while not length.isdigit():
    length = input("enter valid number in length: ")

start=  int(start)
length = int(length)
nums = generate_list(start,length)
print(nums)