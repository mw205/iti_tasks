#!/usr/bin/env bash
today=$(date +"%Y-%m-%d")
backup_dir="/tmp/backup-$today"
source_file="/var/log/syslog"

#check if backup directory exists
if [[ ! -d "$backup_dir" ]]; then
    echo "backup directory doesn't exist. creating..."
    mkdir "$backup_dir"
else
    echo "$backup_dir already exists."
fi

#check if source file exists AND is readable
    if [[ ! -f "$source_file" || ! -r "$source_file" ]]; then
        echo "source file doesn't exist or is not readable"
        exit 1
    fi

#Check if source file is empty
if [[ ! -s "$source_file" ]]; then
    echo "source file is empty. copying anyway"
fi
cp "$source_file" "$backup_dir/syslog.bak"
echo "backup of $source_file successfully created at $backup_dir"
