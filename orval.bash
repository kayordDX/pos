#!/usr/bin/env bash
# sed -i '1s;^;// @ts-nocheck\n;' src/lib/api/generated/grades.ts
for filename in src/lib/api/generated/*.ts; do
    grep -R '// @ts-nocheck' $filename || true | sed -i '1s;^;// @ts-nocheck\n;' $filename
done

echo 🔧 Ignoring generated types