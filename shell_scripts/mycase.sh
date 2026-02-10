#!/bin/bash
read -p "Enter a character:" ch

case $ch in
	[A-Z]) echo "Upper Case";;
	[a-z]) echo "Lower Case";;
	[0-9]) echo "Number";;
	"")    echo "Nothing";;
	*)     echo "Unkown char";;
esac

