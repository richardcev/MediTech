# Meditech - Sistema de Gestión Médica 🏥

**MediTech** es una aplicación web integral diseñada para facilitar la gestión de consultorios médicos. Permite a los profesionales de la salud administrar pacientes, historias clínicas, consultas y signos vitales de manera eficiente.

El sistema está construido con una arquitectura moderna separando el Backend (Django REST Framework) del Frontend (React + Vite).


## 🚀 Características Principales

* **Gestión de Pacientes:** CRUD completo (Crear, Leer, Actualizar, Eliminar) de pacientes con datos demográficos.
* **Historia Clínica Digital:** Registro de antecedentes personales, familiares, alergias y vacunas.
* **Consultas Médicas:** Registro detallado de motivo, diagnóstico, tratamiento e indicaciones.
* **Signos Vitales:** Monitoreo de peso, altura, presión arterial y temperatura por consulta.
* **Laboratorio:** Gestión de exámenes médicos y subida de resultados en PDF.
* **Dashboard Interactivo:** Panel de control con accesos rápidos y resumen de actividades.
* **Búsqueda Avanzada:** Filtrado de pacientes por nombre, apellido o cédula.

## 🛠️ Tecnologías Utilizadas

### Backend
* **Python / Django 5.2**: Framework principal.
* **Django REST Framework 3.16**: Para la creación de la API RESTful.
* **Django Filter**: Para filtrado avanzado en los endpoints.
* **SQLite**: Base de datos por defecto (fácilmente escalable a PostgreSQL).

### Frontend
* **React 18**: Librería de UI.
* **Vite**: Empaquetador y servidor de desarrollo rápido.
* **Material UI (MUI)**: Componentes de diseño (DataGrid, Inputs, Layouts).
* **React Router Dom**: Manejo de rutas.
* **React Toastify**: Notificaciones al usuario.
* **Dayjs**: Manipulación de fechas.

---

## ⚙️ Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto localmente.

### Prerrequisitos
* Python 3.10+
* Node.js 18+
* Git

### 1. Configuración del Backend (Django)

```bash
# 1. Clonar el repositorio
git clone <tu-repo-url>
cd backend

# 2. Crear y activar entorno virtual
python -m venv venv
# En Windows:
venv\Scripts\activate
# En Mac/Linux:
source venv/bin/activate

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. Realizar migraciones de base de datos
python manage.py makemigrations
python manage.py migrate

# 5. Crear superusuario (opcional, para admin de Django)
python manage.py createsuperuser

# 6. Iniciar el servidor
python manage.py runserver