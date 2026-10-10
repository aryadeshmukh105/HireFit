from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

from .models import Job
from .serializers import JobSerializer
from accounts.models import RecruiterProfile


class JobListCreateView(generics.ListCreateAPIView):
    queryset = Job.objects.all().order_by("-created_at")
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        recruiter = RecruiterProfile.objects.filter(
            user=self.request.user
        ).first()

        if not recruiter:
            raise ValidationError(
                "This account is not registered as a recruiter."
            )

        serializer.save(recruiter=recruiter)


class JobDetailView(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]