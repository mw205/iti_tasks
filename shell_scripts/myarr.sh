#!/bin/bash
typeset -i i=0

read -p "How many elements? " count
while [ $i -lt $count ]
do
	read -p "Enter element $i : " val
	arr[$i]=$val
	i=$i+1
done
echo "The array contains : "
echo ${arr[*]}

