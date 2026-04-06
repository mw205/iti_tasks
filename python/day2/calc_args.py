def validate_num(x:str)-> bool|None:
    return x.isdigit() and x.strip()!=""

def calc_args():
    count = 0
    my_sum=0
    user_input = input("enter a number: ")

    while True:
        while not validate_num(user_input):
            user_input = input("enter a valid number : ")
        count+=1
        my_sum+=int(user_input)
        user_input = input("enter another number: ")
        if user_input.lower()=="done":
            break
    print(f"count: {count}\nsum: {my_sum}\naverage:{my_sum/count}")
calc_args()