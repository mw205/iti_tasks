#!/bin/bash
USER=$(whoami)
MAILFILE=/var/mail/$USER

while true
do
	if [ -s "MAILFILE" ]
	then
		echo "Check your mail"
	else
		echo "Nothing new in inbox"
	fi
	sleep 10
done	
