from django.core.management.base import BaseCommand
from app.models import Paciente
from datetime import date
import random

class Command(BaseCommand):
    help = 'Genera 10 pacientes de prueba'

    def handle(self, *args, **kwargs):
        nombres = ['Juan', 'María', 'Carlos', 'Ana', 'Luis', 'Diana', 'Pedro', 'Lucía', 'Jorge', 'Valeria']
        apellidos = ['Pérez', 'Gómez', 'Rodríguez', 'Cevallos', 'Vega', 'Lopez', 'Mora', 'Sánchez', 'Torres', 'Bravo']

        for i in range(10):
            cedula = str(1000000000 + i)
            paciente, created = Paciente.objects.get_or_create(
                cedula=cedula,
                defaults={
                    'nombres': random.choice(nombres),
                    'apellidos': random.choice(apellidos),
                    'fecha_nacimiento': date(1980 + random.randint(0, 20), random.randint(1, 12), random.randint(1, 28)),
                    'sexo': random.choice(['M', 'F']),
                    'telefono': f'09{random.randint(10000000, 99999999)}',
                    'direccion': f"Calle Ficticia #{i+1}",
                    'correo': f'paciente{i+1}@mail.com',
                    'activo': True
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'✔ Paciente creado: {paciente}'))
            else:
                self.stdout.write(self.style.WARNING(f'⚠ Paciente con cédula {cedula} ya existe'))
