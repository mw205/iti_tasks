s = "Mohamed Waleed"
count = 0
for c in s:
    if c.lower() in ('a','e','o','i','u'):
        count+=1

print(f"count of vowels {count}")