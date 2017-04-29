FROM nginx:latest

MAINTAINER Robert Brem <brem_robert@hotmail.com>

ADD target/jar.js /usr/share/nginx/html/target/jar.js
#ADD environment/environment.js /usr/share/nginx/html/environment/environment.js
ADD index.html /usr/share/nginx/html/index.html