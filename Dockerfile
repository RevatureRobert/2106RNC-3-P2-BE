# pull base image
FROM node:16

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production

EXPOSE 3000

# install dependencies first
RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm install

# ENTRYPOINT ["node"]
ENTRYPOINT ["npm", "run"]
CMD ["deploy"]