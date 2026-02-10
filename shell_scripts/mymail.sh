#!/bin/bash

for user in $(cut -d: -f1 /etc/passwd)
do
	mailx $user < mtemplate
	echo "mail is sent to $user"
done
