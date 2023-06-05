#!/bin/bash

# Ruta al archivo .sql a ejecutar
SQL_FILES=(".././db.sql")

# Comando para ingresar a MySQL y ejecutar el script

for file in "${SQL_FILES[@]}"
do

    echo "Ejecutando archivo: $file"
    MYSQL_DATABASE=${MYSQL_DATABASE} mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "source $file"

done