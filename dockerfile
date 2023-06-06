FROM node:18

WORKDIR /usr/src

COPY ["./package.json","./package-lock.json","tsconfig.json", "/usr/src/"]

RUN npm install

COPY [".", "/usr/src/"]



EXPOSE 3000

CMD tail -f /dev/null