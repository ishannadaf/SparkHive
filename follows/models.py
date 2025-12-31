from django.db import models
from accounts.models import User

class Follow(models.Model):
    follower = models.ForeignKey(
        User,
        related_name='follows_following',
        on_delete=models.CASCADE
    )
    following = models.ForeignKey(
        User,
        related_name='follows_followers',
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('follower', 'following')

    def __str__(self):
        return f"{self.follower} → {self.following}"
