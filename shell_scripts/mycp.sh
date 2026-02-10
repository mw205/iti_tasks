#!/bin/bash
if [ $# -lt 2 ]
then
	echo "./mycp source .. destination"
else
	cp $*
fi
