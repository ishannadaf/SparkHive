from django.db import models
from accounts.models import User
from cloudinary.models import CloudinaryField
from django.utils import timezone
from datetime import timedelta

class Post(models.Model):
    POST_TYPE = (
        ('question', 'Question'),
        ('project', 'Project'),
        ('event', 'Event'),
        ('promo', 'Promotion'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    image = CloudinaryField('image', blank=True, null=True)
    post_type = models.CharField(max_length=20, choices=POST_TYPE)

    is_promoted = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.post_type}"

class Reaction(models.Model):
    REACTION_TYPE = (
        ('like', 'Like'),
        ('dislike', 'Dislike'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    reaction = models.CharField(max_length=10, choices=REACTION_TYPE)

    class Meta:
        unique_together = ('user', 'post')


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class Story(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = CloudinaryField('image')
    created_at = models.DateTimeField(auto_now_add=True)

    def is_active(self):
        return timezone.now() < self.created_at + timedelta(hours=24)