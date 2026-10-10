from django.contrib.auth.models import User
from rest_framework import serializers
from .models import StudentProfile, RecruiterProfile


class StudentRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )

        StudentProfile.objects.create(user=user)

        return user


class RecruiterRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    company_name = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "company_name"]

    def create(self, validated_data):
        company_name = validated_data.pop("company_name")

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )

        RecruiterProfile.objects.create(
            user=user,
            company_name=company_name
        )

        return user