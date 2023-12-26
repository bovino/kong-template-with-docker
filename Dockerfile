FROM kong:3.3.1-alpine
USER root
ENV PACKAGES="openssl-devel kernel-headers gcc git openssh" \
  LUA_BASE_DIR="/usr/local/share/lua/5.1" \
  KONG_PLUGIN_SESSION_VER="2.4.4" \
  NGX_DISTRIBUTED_SHM_VER="1.0.7"
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
RUN apk add --update nodejs npm python3 make g++
RUN npm install --unsafe -g kong-pdk@0.5.3

ENV term xterm
RUN apk add --update vim nano
