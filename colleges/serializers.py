from rest_framework import serializers
from .models import College

class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = ['id', 'name', 'city', 'state', 'is_verified']
