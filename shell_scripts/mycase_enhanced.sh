#!/bin/bash
shopt -s extglob
read -p "Enter a string : " str
case $str in
    "") echo "Nothing" ;;
    +([A-Z])) echo "Upper Cases" ;;
    +([a-z])) echo "Lower Cases" ;;
    +([0-9])) echo "Numbers" ;;
    *) echo "Mix" ;;

esac

