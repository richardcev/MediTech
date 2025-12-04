from django.db import models

# Create your models here.
class Paciente(models.Model):
    SEXO_CHOICES = [
        ('M', 'Masculino'),
        ('F', 'Femenino'),
    ]
    cedula = models.CharField(max_length=10, unique=True, null=True, blank=True)
    nombres = models.CharField(max_length=255)
    apellidos = models.CharField(max_length=255)
    fecha_nacimiento = models.DateField()
    sexo = models.CharField(max_length=1, choices=SEXO_CHOICES, null=True, blank=True)
    telefono = models.CharField(max_length=15, null=True, blank=True)
    direccion = models.TextField(null=True, blank=True)
    correo = models.EmailField(null=True, blank=True)
    tipo_sangre = models.CharField(max_length=255 , null=True, blank=True)
    peso = models.FloatField(null=True, blank=True)
    altura = models.FloatField(null=True, blank=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"
    
    @property
    def tiene_historia_clinica(self):
        return hasattr(self, 'historiaclinica')
    
class HistoriaClinica(models.Model):
    paciente = models.OneToOneField(Paciente, on_delete=models.CASCADE)
    antecedentes_familiares = models.TextField(blank=True, null=True)
    antecedentes_personales = models.TextField(blank=True, null=True)
    alergias = models.TextField(blank=True, null=True)
    vacunas = models.TextField(blank=True, null=True)
    medicamentos_habituales = models.TextField(blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    observaciones_generales = models.TextField(blank=True, null=True)

class ConsultaMedica(models.Model):
    historia_clinica = models.ForeignKey(HistoriaClinica, on_delete=models.CASCADE, related_name="consultas")
    fecha_consulta = models.DateTimeField(auto_now_add=True)
    motivo = models.TextField()
    diagnostico = models.TextField()
    tratamiento = models.TextField()
    examenes_pedidos = models.TextField(blank=True, null=True)
    indicaciones = models.TextField(blank=True)
    medico = models.CharField(max_length=255)  # o una ForeignKey si manejas usuarios médicos

class ExamenMedico(models.Model):
    consulta = models.ForeignKey(ConsultaMedica, on_delete=models.CASCADE, related_name="examenes")
    nombre = models.CharField(max_length=255)
    resultado = models.TextField()
    fecha = models.DateField()
    archivo_pdf = models.FileField(upload_to='examenes/', null=True, blank=True)

class SignosVitales(models.Model):
    consulta = models.OneToOneField(ConsultaMedica, on_delete=models.CASCADE)
    peso = models.FloatField(null=True, blank=True)
    altura = models.FloatField(null=True, blank=True)
    presion = models.CharField(max_length=20, null=True, blank=True)
    temperatura = models.FloatField(null=True, blank=True)


# CONSULTA
# motivo
# descripcion
# diagnostico


#LABORATORIO
# nombre
# descripcion
# resultado
# ARCHIVO PDF