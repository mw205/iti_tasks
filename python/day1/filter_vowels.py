s = "Mohamed Waleed"
for i in s:
    if i.lower() in ('a','e','o','i','u'):
        s=s.replace(i,"")
print(s)