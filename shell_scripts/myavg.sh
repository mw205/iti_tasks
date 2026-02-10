#!/bin/bash
typeset -i i=0
typeset -i sum=0
typeset -i avg=0

read -p "How many numbers" count

while [ $i -lt $count ]
do
    read -p "Enter a number:" num
    arr[$i]=$num
    sum=$sum+${arr[$i]}
    i=$i+1
done

avg=$sum/$count
echo "Average is $avg"
