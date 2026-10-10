from django.db import models
from django.contrib.auth.models import User


class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15, blank=True)
    college = models.CharField(max_length=200, blank=True)
    degree = models.CharField(max_length=100, default="MCA")
    graduation_year = models.IntegerField(null=True, blank=True)
    skills = models.TextField(blank=True)
    resume = models.FileField(upload_to="resumes/", blank=True, null=True)

    def __str__(self):
        return self.user.username


class RecruiterProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company_name = models.CharField(max_length=200)
    designation = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return self.company_name
