FROM python:3.13

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copia el resto del proyecto
COPY . .

# Expone el puerto por defecto de Django
EXPOSE 8000

# Comando para ejecutar el servidor
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]