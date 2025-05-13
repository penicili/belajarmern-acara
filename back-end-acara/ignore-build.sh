#!/bin/bash

# Extract the names of the files that were changed
CHANGED_FILES=$(git diff --name-only HEAD^ HEAD)

# Check if any of the changed files are in the backend directory
echo "Checking changed files..."
echo "$CHANGED_FILES"

# If no files in the backend directory were changed, exit with code 1 to skip the build
if ! echo "$CHANGED_FILES" | grep -q "^backend/"; then
  echo "No changes to backend directory, skipping build"
  exit 1
else
  echo "Changes detected in backend directory, proceeding with build"
  exit 0
fi