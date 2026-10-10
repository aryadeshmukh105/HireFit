from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

from .models import Application
from .serializers import ApplicationSerializer
from accounts.models import StudentProfile


class ApplicationCreateView(generics.CreateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        student = StudentProfile.objects.filter(
            user=self.request.user
        ).first()

        if not student:
            raise ValidationError(
                "This account is not registered as a student."
            )

        serializer.save(student=student)


class ApplicationListView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        student = StudentProfile.objects.filter(
            user=self.request.user
        ).first()

        if not student:
            return Application.objects.none()

        return Application.objects.filter(student=student)