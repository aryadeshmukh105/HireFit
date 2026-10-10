from django.db import models
from accounts.models import RecruiterProfile


class Job(models.Model):
    JOB_TYPES = [
        ("Full Time", "Full Time"),
        ("Part Time", "Part Time"),
        ("Internship", "Internship"),
    ]

    recruiter = models.ForeignKey(
        RecruiterProfile,
        on_delete=models.CASCADE
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=100)
    salary = models.CharField(max_length=100, blank=True)
    required_skills = models.TextField()
    experience = models.CharField(max_length=100, default="Fresher")
    job_type = models.CharField(
        max_length=20,
        choices=JOB_TYPES,
        default="Full Time"
    )
    deadline = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
