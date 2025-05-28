#!/bin/bash
cd /home/kavia/workspace/code-generation/piggyhabit-23249-9debde6f/piggyhabit
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

