from rest_framework import generics
from .serializers import (
    StudentRegistrationSerializer,
    RecruiterRegistrationSerializer
)


class StudentRegistrationView(generics.CreateAPIView):
    serializer_class = StudentRegistrationSerializer


class RecruiterRegistrationView(generics.CreateAPIView):
    serializer_class = RecruiterRegistrationSerializer