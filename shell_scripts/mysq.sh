#!/bin/bash
mysq(){
	echo $(($1*$1))
}
read -p "Enter a number : " number
mysq $number

