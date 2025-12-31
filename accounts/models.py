from django.contrib.auth.models import AbstractUser
from django.db import models
from colleges.models import College
from skills.models import Skill
from cloudinary.models import CloudinaryField
from django.conf import settings

class User(AbstractUser):
    college = models.ForeignKey(
        College,
        on_delete=models.SET_NULL,
        null=True,
        related_name='students'
    )
    skills = models.ManyToManyField(Skill, blank=True)
    profile_image = CloudinaryField('image', blank=True)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    college = models.ForeignKey(
        College,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    skills = models.ManyToManyField(
        Skill,
        blank=True
    )
    bio = models.CharField(max_length=150, blank=True)
    contact_no = models.CharField(max_length=15)
    profile_image = CloudinaryField('image', blank=True, null=True)

    def __str__(self):
        return self.user.username


class Follow(models.Model):
    follower = models.ForeignKey(
        User,
        related_name="account_following",
        on_delete=models.CASCADE
    )
    following = models.ForeignKey(
        User,
        related_name="account_followers",
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("follower", "following")

    def __str__(self):
        return f"{self.follower} → {self.following}"

class College(models.Model):
    name = models.CharField(max_length=255, unique=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
