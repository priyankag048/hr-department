FROM node:23-alpine AS build

WORKDIR /usr/app

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY applications/employee-services/ applications/employee-services/
COPY libraries/database/ libraries/database/

RUN  pnpm install --frozen-lockfile
RUN pnpm deploy --filter=@hr-application/employee-services --prod /usr/src/app/deploy

WORKDIR /usr/src/app/deploy


FROM node:23-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/deploy/node_modules node_modules/
COPY --from=build /usr/src/app/deploy/package.json .
COPY --from=build /usr/src/app/deploy/src src/

CMD ["node", "src/server.ts"]
