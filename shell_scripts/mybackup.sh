#!/bin/bash
if [! -d ~/backup]
then 
	mkdir -p ~/backup
fi

cd $HOME

for item in * 
do
	if [ -f $item ]
	then
		cp "$item" ~/backup/
		echo "$item is copied to ~/backup/"
	fi
done
