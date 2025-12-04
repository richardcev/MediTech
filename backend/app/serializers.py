from rest_framework import serializers
from .models import Paciente, ConsultaMedica, HistoriaClinica, ExamenMedico, SignosVitales

class PacienteSerializer(serializers.ModelSerializer):
    tiene_historia_clinica = serializers.SerializerMethodField()
    class Meta:
        model = Paciente
        fields = [
            'id', 'cedula', 'nombres', 'apellidos', 'fecha_nacimiento',
            'sexo', 'telefono', 'direccion', 'correo', 'tipo_sangre', 'peso', 'altura',	
            'fecha_registro', 'tiene_historia_clinica'
        ]
    
    def get_tiene_historia_clinica(self, obj):
        return obj.tiene_historia_clinica

class ConsultaMedicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultaMedica
        fields = '__all__'

class HistoriaClinicaSerializer(serializers.ModelSerializer):
    class Meta:
        model= HistoriaClinica
        fields = '__all__'


