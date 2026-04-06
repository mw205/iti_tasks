def longest_substring(sentence:str)->str|None:
    if not sentence:
        return None
    current_start= 0
    current_len=1
    best_start = 0
    best_len = 1
    for i in range(1,len(sentence)):
        if sentence[i]>sentence[i-1]:
            current_len+=1
        else:
            if current_len>best_len:
                best_len =current_len
                best_start = current_start
            current_start = i
            current_len =1
    if current_len > best_len:
        best_len = current_len
        best_start = current_start
    return sentence[best_start:best_start+ best_len]

sentence = input("enter a sentence: ")
while sentence.strip() =="":
    sentence=input("sentence can't be empty!!\nenter a valid sentence: ")
print(longest_substring(sentence))