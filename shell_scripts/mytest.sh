#i/bin/bash
filename=$1
if [ -f $filename ]
then
	echo "$filename is a file."
elif [ -d $filename ]
then
	echo "$filename is a Directory"
else 
	echo "$filename is neither a file nor a directory"
fi

if [ -r $filename ]
then
	echo "$filename is Readable"
else 
	echo "$filename is not Readable"
fi
if [ -w $filename ]
then
        echo "$filename is Writable"
else
        echo "$filename is not Writable"
fi
if [ -x $filename ]
then
        echo "$filename is Executable"
else
        echo "$filename is not Executable"
fi


