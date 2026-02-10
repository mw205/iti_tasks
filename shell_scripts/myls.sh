#!/bin/bash
if [ $# -eq 0 ]
then
	ls
else
	ls $*
fi
	
