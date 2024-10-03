#!/usr/bin/env sh

ENV_VARIABLES_FOR_SUBSTITUTION="\$BACKEND_BASE_URL"

for file in $1;
do
  envsubst $ENV_VARIABLES_FOR_SUBSTITUTION < $file > tmp && mv tmp $file
done

nginx -g 'daemon off;'
