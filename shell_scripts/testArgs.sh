#! /usr/bin/env bash
read -p "enter your username: " user_name

if [[ -z "$user_name" ]]; then
	echo "empty username. exiting.."
	exit 1 # it tells the 
fi
echo "hello $user_name!" 
