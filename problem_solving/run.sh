#!/bin/bash

# Check if a filename was provided
if [ -z "$1" ]; then
    echo "Usage: ./run.sh <filename.cpp>"
    exit 1
fi

FILE=$1
BASENAME=$(basename "$FILE" .cpp)
TEMP_BIN="/tmp/$BASENAME"

# Compile the code
clang++ -std=c++17 -O2 -Wall -Wextra -DLOCAL "$FILE" -o "$TEMP_BIN"

# Check if compilation was successful
if [ $? -eq 0 ]; then
    echo "Compilation successful. Running..."
    
    # Check if input.txt exists
    if [ -f "input.txt" ]; then
        "$TEMP_BIN" < input.txt
    else
        "$TEMP_BIN"
    fi
    # Clean up the temporary binary
    rm "$TEMP_BIN"
else
    echo "Compilation failed."
fi
