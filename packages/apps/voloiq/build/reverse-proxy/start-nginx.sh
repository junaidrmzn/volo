#!/usr/bin/env sh

envsubst "$(env | cut -d= -f1 | sed -e 's/^/$/')" < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'