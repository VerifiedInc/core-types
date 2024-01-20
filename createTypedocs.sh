#!/bin/sh

# Need to remove the build directory otherwise will get a permissions conflict
rm -rf build/
npx typedoc index.ts
npm run compile