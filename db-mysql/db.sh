#!/bin/bash

# Ruta al archivo .sql a ejecutar
sql_file=".././db.sql"

# Verifica si el archivo .sql existe
if [ -f "$sql_file" ]; then
    # Genera el script SQL leyendo el contenido del archivo
    sql_script=$(cat "$sql_file")

    # Guarda el script SQL en un archivo temporal
    temp_file=$(mktemp)
    echo "$sql_script" > "$temp_file"

    # Reemplaza variables de entorno en el archivo temporal
    sed -i "s/{{DB_DATABASE}}/${MYSQL_DATABASE}/g" "$temp_file"

    # Ejecuta el script SQL en MySQL
    mysql -u "${MYSQL_USER}" -p"${MYSQL_PASSWORD}" < "$temp_file"

    # Elimina el archivo temporal
    rm "$temp_file"
else
    echo "El archivo $sql_file no existe."
fi

