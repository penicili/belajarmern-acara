#!/bin/bash

# Ask for directory choice
echo "Which directory to use?"
echo "a: ./series"
echo "b: ./moviews"
read -p "Choose directory (a/b): " dir_choice

# Set directory based on choice
if [ "$dir_choice" = "a" ]; then
    TARGET_DIR="./series"
elif [ "$dir_choice" = "b" ]; then
    TARGET_DIR="./movies"
else
    echo "Invalid choice"
    exit 1
fi

# Change to target directory
cd "$TARGET_DIR"

# Ask for the torrent link
read -p "Enter the torrent link: " torrent_link

# Start webtorrent in the background, redirect output to a log file
nohup webtorrent download "$torrent_link" > download.log 2>&1 &

# Get the process ID
pid=$!

# Disown the process so it continues after SSH session ends
disown $pid

echo "Download started in background with PID: $pid"
echo "You can check progress in: $TARGET_DIR/download.log"