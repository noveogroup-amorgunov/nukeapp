#!/bin/bash

# Path for env validation file
ENV_FILE=src/shared/lib/env

SOURCE_FILE=$ENV_FILE.ts
COMPILED_FILE=$ENV_FILE.mjs

npx tsc $SOURCE_FILE --skipLibCheck --module esnext --moduleResolution node --types 'vite/client'
mv $ENV_FILE.js $COMPILED_FILE
sed -i '' -e 's/import.meta.env/process.env/g' $COMPILED_FILE
node -r dotenv/config $COMPILED_FILE dotenv_config_path=.env dotenv_config_path=.env.local
exit
