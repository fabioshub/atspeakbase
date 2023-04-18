
# Base image
FROM node:16-alpine AS builder
# Create app directory
WORKDIR /usr/src/app

RUN apk add g++ make py3-pip

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY /package.json ./package.json

# # # Install app dependencies
RUN npm install --omit=dev
RUN npm i nx --omit-dev

# # Bundle app source
COPY ./nx.json ./
COPY ./tsconfig.base.json ./
COPY ./apps/react-chat-window-demo-no-tailwind ./apps/react-chat-window-demo-no-tailwind
COPY ./libs/react-chat-window ./libs/react-chat-window

# # Creates a "dist" folder with the production build
COPY ./.env ./.env

RUN node_modules/.bin/nx run react-chat-window-demo-no-tailwind:build


# Bundle static assets with nginx
FROM nginx:1.23.0-alpine as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /usr/src/app/dist/apps/react-chat-window-demo-no-tailwind /usr/share/nginx/html

RUN ls /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
