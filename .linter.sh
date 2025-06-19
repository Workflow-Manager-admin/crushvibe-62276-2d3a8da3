#!/bin/bash
cd /home/kavia/workspace/code-generation/crushvibe-62276-2d3a8da3/crushvibe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

