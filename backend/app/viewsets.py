from rest_framework import viewsets
from .models import Paciente, ConsultaMedica, HistoriaClinica, ExamenMedico, SignosVitales
from .serializers import PacienteSerializer, ConsultaMedicaSerializer, HistoriaClinicaSerializer
from django_filters.rest_framework import DjangoFilterBackend


class PacienteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows pacientes to be viewed or edited.
    """
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['nombres', 'apellidos', 'cedula', 'fecha_nacimiento']

    
class ConsultaMedicaViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows consultas to be viewed or edited.
    """
    queryset = ConsultaMedica.objects.all()
    serializer_class = ConsultaMedicaSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['fecha_consulta', 'medico']

class HistoriaClinicaViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows historias clinicas to be viewed or edited.
    """
    queryset = HistoriaClinica.objects.all()
    serializer_class = HistoriaClinicaSerializer  # Cambia esto si tienes un serializer específico para HistoriaClinica
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['paciente']