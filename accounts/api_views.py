from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SignupSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from follows.models import Follow
from rest_framework.permissions import AllowAny
from posts.models import Post
from .models import Profile
from django.db.models import Count, Q
from rest_framework.decorators import api_view, permission_classes
User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    first_name = request.data.get("first_name")
    last_name = request.data.get("last_name")
    username = request.data.get("username")
    contact_no = request.data.get("contact_no")
    password = request.data.get("password")

    if not all([first_name, last_name, username, contact_no, password]):
        return Response(
            {"error": "All fields are required"},
            status=400
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Username already exists"},
            status=400
        )

    user = User.objects.create_user(
        username=username,
        password=password,
        first_name=first_name,
        last_name=last_name
    )

    Profile.objects.create(
        user=user,
        contact_no=contact_no
    )

    return Response(
        {"message": "Account created successfully"},
        status=201
    )

class ProfileAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, username=None):
        user = request.user if not username else User.objects.get(username=username)

        followers_count = Follow.objects.filter(following=user).count()
        following_count = Follow.objects.filter(follower=user).count()

        is_following = False
        if username and user != request.user:
            is_following = Follow.objects.filter(
                follower=request.user,
                following=user
            ).exists()

        posts = Post.objects.filter(user=user).annotate(
            likes_count=Count(
                "reaction",
                filter=Q(reaction__reaction="like")
            ),
            comments_count=Count("comments")
        ).order_by("-created_at")

        return Response({
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "followers": followers_count,
            "following": following_count,
            "is_following": is_following,
            "posts": [
                {
                    "id": p.id,
                    "content": p.content,
                    "post_type": p.post_type,
                    "image": p.image.url if p.image else None,
                    "likes_count": p.likes_count,
                    "comments_count": p.comments_count,
                }
                for p in posts
            ]
        })
        
class ToggleFollowAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, username):
        user_to_follow = User.objects.get(username=username)

        if user_to_follow == request.user:
            return Response({"error": "Cannot follow yourself"}, status=400)

        follow, created = Follow.objects.get_or_create(
            follower=request.user,
            following=user_to_follow
        )

        if not created:
            follow.delete()
            return Response({"following": False})

        return Response({"following": True})
    
class UpdateProfileAPI(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        profile = request.user.profile

        profile.contact_no = request.data.get("contact_no", profile.contact_no)
        profile.bio = request.data.get("bio", profile.bio)

        if "profile_image" in request.FILES:
            profile.profile_image = request.FILES["profile_image"]

        profile.save()

        return Response({
            "message": "Profile updated",
            "bio": profile.bio,
            "contact_no": profile.contact_no,
            "profile_image": profile.profile_image.url if profile.profile_image else None
        })
