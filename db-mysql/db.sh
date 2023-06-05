#!/bin/bash

# Ruta al archivo .sql a ejecutar
SQL_FILES=(".././db.sql")

# Recorremos la lista de archivos SQL
for file in "${SQL_FILES[@]}"
do
    echo "Ejecutando archivo: $file"

    # Leer el contenido del archivo SQL
    sql_content=$(cat "$file")

    # Reemplazar las variables de entorno en el contenido del archivo
    sql_content="${sql_content//\${MYSQL_USER}/${MYSQL_USER}}"
    sql_content="${sql_content//\${MYSQL_PASSWORD}/${MYSQL_PASSWORD}}"
    # Agregar más reemplazos de variables de entorno según sea necesario

    # Guardar el contenido modificado en un nuevo archivo temporal
    temp_file=$(mktemp)
    echo "$sql_content" > "$temp_file"

    # Ejecutar el archivo SQL en MySQL
    mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" < "$temp_file"

    # Eliminar el archivo temporal
    rm "$temp_file"

done
