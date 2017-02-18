## # https://github.com/mhart/alpine-node
## FROM mhart/alpine-node:6.3.1
##
## ENV DIR=/opt/este PORT=8000 NODE_ENV=production
##
## COPY package.json ${DIR}/
##
## # Installs (and removes) python and build deps for source builds, ex. node-sass.
## # Removing in the same instruction reduces image size bloat.
## RUN apk add --update python python-dev build-base && \
##   echo "# SUPPRESS WARNING" > ${DIR}/README.md && \
##   cd ${DIR} && npm install && \
##   apk del python python-dev build-base && \
##   rm -rf /etc/ssl /usr/share/man /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp
##
## COPY . $DIR
##
## WORKDIR $DIR
##
## RUN npm run build -- -p
##
## EXPOSE $PORT
##
## ENTRYPOINT ["npm"]
##
## CMD ["start"]



FROM mhart/alpine-node
# FROM mhart/alpine-node:base-4
# FROM mhart/alpine-node

WORKDIR /src
ADD . .

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python

# If you need npm, don't use a base tag
RUN npm install

EXPOSE 3000
CMD ["node", "src/server/index.js"]
