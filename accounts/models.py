from django.contrib.auth.models import AbstractUser
from django.db import models
from colleges.models import College
from skills.models import Skill
from cloudinary.models import CloudinaryField

class User(AbstractUser):
    college = models.ForeignKey(
        College,
        on_delete=models.SET_NULL,
        null=True,
        related_name='students'
    )
    skills = models.ManyToManyField(Skill, blank=True)
    profile_image = CloudinaryField('image', blank=True)
