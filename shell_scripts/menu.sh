#!/bin/bash
PS3="Select an option : "
while true
do
select choice in "ls" "ls -a" "exit"
do
	case $REPLY in 
		1) ls ;;
		2) ls -a ;;
		3) exit;;
		*) echo "Invalid choice";
	esac
done
done
