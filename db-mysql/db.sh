#!/bin/bash
# Ruta al archivo .sql a ejecutar
SQL_FILES=("./db.sql")

# Comando para ingresar a MySQL y ejecutar el script

for file in "${SQL_FILES[@]}"
do
    echo "Ejecutando archivo: $file"
    mysql -u ${MYSQL_USER} -p${MYSQL_PASSWORD}  <  source "$file"
done
