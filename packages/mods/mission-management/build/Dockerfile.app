ARG voloiqUiPipelineImageVersion=latest

FROM --platform=amd64 vcdoprodcrdevops.azurecr.io/voloiq-ui-pipeline:${voloiqUiPipelineImageVersion} as build

WORKDIR /voloiq/packages/mods/mission-management
RUN yarn build

FROM nginx:stable-alpine as final

COPY --from=build /voloiq/packages/mods/mission-management/dist /usr/share/nginx/html
COPY --from=build /voloiq/packages/mods/mission-management/config/nginx.conf /etc/nginx/conf.d/default.conf

ARG commitId=0000000
ARG branch=local
ARG voloiqUiPipelineImageVersion=latest

RUN echo '{ \
    "commitId": "'$commitId'", \
    "branch": "'$branch'", \
    "buildId": "'$voloiqUiPipelineImageVersion'", \
    "date": "'$(date)'" \
}' > /usr/share/nginx/html/version.json

RUN cat /usr/share/nginx/html/version.json

COPY ./packages/mods/mission-management/build/start-nginx.sh /usr/bin/start-nginx.sh
RUN chmod +x /usr/bin/start-nginx.sh
WORKDIR /usr/share/nginx/html

EXPOSE 8080

ENTRYPOINT ["start-nginx.sh", "/usr/share/nginx/html/*"]
