#!/bin/bash

npx tsc src/shared/lib/env.ts --skipLibCheck --module esnext --moduleResolution node --types 'vite/client'
mv src/shared/lib/env.js src/shared/lib/env--compiled.mjs
sed -i '' -e 's/import.meta.env/process.env/g' src/shared/lib/env--compiled.mjs
node -r dotenv/config src/shared/lib/env--compiled.mjs dotenv_config_path=.env dotenv_config_path=.env.local
exit
