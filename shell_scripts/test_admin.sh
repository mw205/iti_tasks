#! /usr/bin/env bash
USER_ID=$(id -u)
if [[ USER_ID -ne 0 ]]; then
    echo "You are not admin"
    exit 1
fi
echo "Welcome Adminstrator"