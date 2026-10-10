from django.urls import path
from .views import ApplicationCreateView, ApplicationListView

urlpatterns = [
    path("", ApplicationCreateView.as_view(), name="apply"),
    path("my/", ApplicationListView.as_view(), name="my-applications"),
]