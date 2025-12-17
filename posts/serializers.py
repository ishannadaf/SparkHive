from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    college = serializers.CharField(source='user.college.name', read_only=True)

    class Meta:
        model = Post
        fields = '__all__'
