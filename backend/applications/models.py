from django.db import models
from accounts.models import StudentProfile
from jobs.models import Job


class Application(models.Model):
    STATUS_CHOICES = [
        ("Applied", "Applied"),
        ("Shortlisted", "Shortlisted"),
        ("Interview", "Interview"),
        ("Selected", "Selected"),
        ("Rejected", "Rejected"),
    ]

    student = models.ForeignKey(
        StudentProfile,
        on_delete=models.CASCADE
    )
    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Applied"
    )
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("student", "job")

    def __str__(self):
        return f"{self.student} - {self.job}"