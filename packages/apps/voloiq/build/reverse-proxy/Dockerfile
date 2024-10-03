FROM nginx:stable-alpine

COPY ./nginx.conf.template /etc/nginx/conf.d/nginx.conf.template
COPY ./start-nginx.sh  /usr/bin/start-nginx.sh
RUN chmod +x /usr/bin/start-nginx.sh

EXPOSE 9082

ENTRYPOINT ["start-nginx.sh"] 