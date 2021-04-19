FROM kong:2.4.0-alpine
USER root
ENV PACKAGES="openssl-devel kernel-headers gcc git openssh" \
  LUA_BASE_DIR="/usr/local/share/lua/5.1" \
  KONG_PLUGIN_SESSION_VER="2.4.4" \
  NGX_DISTRIBUTED_SHM_VER="1.0.2"
RUN set -ex \
  && apk --no-cache add \
  libssl1.1 \
  openssl \
  curl \
  unzip \
  git \
  && apk --no-cache add --virtual .build-dependencies \
  make \
  gcc \
  openssl-dev \
  && curl -sL https://raw.githubusercontent.com/grrolland/ngx-distributed-shm/${NGX_DISTRIBUTED_SHM_VER}/lua/dshm.lua > ${LUA_BASE_DIR}/resty/dshm.lua \
  && TPL=${LUA_BASE_DIR}/kong/templates/nginx_kong.lua \
  && mkdir -p /usr/local/kong \
  && chown -R kong:`id -gn kong` /usr/local/kong \
  && setcap 'cap_net_bind_service=+ep' /usr/local/bin/kong \
  && setcap 'cap_net_bind_service=+ep' /usr/local/openresty/nginx/sbin/nginx
ENV NPM_CONFIG_LOGLEVEL info
RUN apk add --update python
RUN apk add --update nodejs npm
RUN echo "NODE Version:" && node --version
RUN echo "NPM Version:" && npm --version
RUN npm -g config set user root
RUN apk add g++ make python
RUN npm install typescript -g
RUN npm install kong-pdk -g
USER kong
