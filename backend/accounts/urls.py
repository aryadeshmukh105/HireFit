from django.urls import path
from .views import StudentRegistrationView, RecruiterRegistrationView
from .profile_views import StudentProfileView

urlpatterns = [
    path("register/student/", StudentRegistrationView.as_view()),
    path("register/recruiter/", RecruiterRegistrationView.as_view()),
    path("student/profile/", StudentProfileView.as_view()),
]