FROM node:latest

WORKDIR /workspaces

COPY . /workspaces

RUN yarn install --frozen-lockfile --no-cache

RUN yarn build

ENV TIMEZONE Africa/Narobi

EXPOSE 4710

#RUN yarn server:prod

CMD [ "yarn", "server:prod" ]
