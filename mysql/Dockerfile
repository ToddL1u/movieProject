FROM mysql:8

# RUN chown -R mysql:root /var/lib/mysql/

ARG MYSQL_ROOT_PASSWORD

ENV MYSQL_DATABASE='db'
ENV MYSQL_PASSWORD='root'
ENV MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}

# ADD create_db.sql /docker-entrypoint-initdb.d
ADD movies.sql /docker-entrypoint-initdb.d
ADD comments.sql /docker-entrypoint-initdb.d

EXPOSE 3306