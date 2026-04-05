s = "Mohamed Waleed"
s_enumerated = enumerate(s)
i_found=False
for index,c in s_enumerated:
    if c=='i':
        i_found=True
        print(f"char i found at {index}")

if not i_found:
    print("statement doesn't contain char i")