FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install -g npm@8.2.0
RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]