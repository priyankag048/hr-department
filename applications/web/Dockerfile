FROM node:23-alpine AS build

WORKDIR /usr/app

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY applications/web/ applications/web/

RUN  pnpm install --frozen-lockfile
RUN pnpm deploy --filter=@hr-application/web --prod /usr/src/app/deploy

WORKDIR /usr/src/app/deploy
RUN pnpm --filter=@hr-application/web build

FROM node:23-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/deploy/node_modules node_modules/
COPY --from=build /usr/src/app/deploy/package.json .
COPY --from=build /usr/src/app/deploy/build build/
COPY --from=build /usr/src/app/deploy/server server/

CMD ["node", "server/index.ts"]