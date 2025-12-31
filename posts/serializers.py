from rest_framework import serializers
from .models import Post, Reaction, Comment

class PostSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    college = serializers.CharField(source='user.college.name', read_only=True)

    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    is_owner = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            'id',
            'user_name',
            'college',
            'post_type',
            'content',
            'created_at',
            'likes_count',
            'comments_count',
            'is_liked',
            'is_owner',
        ]

    def get_likes_count(self, obj):
        return Reaction.objects.filter(post=obj, reaction='like').count()

    def get_comments_count(self, obj):
        return Comment.objects.filter(post=obj).count()

    def get_is_liked(self, obj):
        user = self.context.get('request').user
        return Reaction.objects.filter(
            post=obj,
            user=user,
            reaction='like'
        ).exists()

    def get_is_owner(self, obj):
        user = self.context.get('request').user
        return obj.user == user
