# Needs to be executed from the monorepo's root: "docker build -t voloiq -f packages/apps/voloiq/build/Dockerfile.app ."
ARG voloiqUiPipelineImageVersion=latest
FROM --platform=amd64 vcdoprodcrdevops.azurecr.io/voloiq-ui-pipeline:${voloiqUiPipelineImageVersion} as build

WORKDIR /voloiq/packages/apps/voloiq

RUN yarn build

FROM nginx:stable-alpine as final

RUN apk add jq

COPY --from=build /voloiq/packages/apps/voloiq/dist /usr/share/nginx/html
COPY --from=build /voloiq/yarn.lock /usr/share/nginx/html
COPY --from=build /voloiq/packages/apps/voloiq/config/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./packages/apps/voloiq/build/start-nginx.sh /usr/bin/start-nginx.sh
RUN chmod +x /usr/bin/start-nginx.sh
WORKDIR /usr/share/nginx/html

EXPOSE 8080

ENTRYPOINT ["start-nginx.sh", "/usr/share/nginx/html/*"]
