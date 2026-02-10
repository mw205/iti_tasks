#!/bin/bash
echo "Enter your logname"
read u_name

echo "full info about your home dir"
ls -l /home/$u_name

echo "copying to /tmp/"
cp -r /home/&u_name/* /tmp/
echo "copying complete"

echo "current processes status"
ps -u $u_name
