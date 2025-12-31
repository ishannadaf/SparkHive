from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Post, Reaction, Comment, Story
from .serializers import PostSerializer
from follows.models import Follow
from django.db.models import Q
from rest_framework.parsers import MultiPartParser, FormParser
from notifications.models import Notification
from django.db.models import Count

class CreatePostAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        content = request.data.get("content")
        post_type = request.data.get("post_type")
        image = request.FILES.get("image")

        if not content or not post_type:
            return Response(
                {"error": "Content and post type required"},
                status=400
            )

        post = Post.objects.create(
            user=request.user,
            content=content,
            post_type=post_type,
            image=image
        )

        return Response({
            "id": post.id,
            "message": "Post created successfully"
        }, status=201)

class ReactPostAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        post = Post.objects.get(id=post_id)

        reaction, created = Reaction.objects.get_or_create(
            user=request.user,
            post=post,
            defaults={"reaction": "like"}
        )

        if not created:
            reaction.delete()
            return Response({"liked": False})

        return Response({"liked": True})


class CommentAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        Comment.objects.create(
            user=request.user,
            post_id=post_id,
            text=request.data.get('text')
        )
        return Response({"message": "Comment added"})

class FeedAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        posts = (
            Post.objects
            .annotate(
                likes_count=Count(
                    "reaction",
                    filter=Q(reaction__reaction="like"),
                    distinct=True
                ),
                comments_count=Count("comments", distinct=True),
            )
            .order_by("-is_promoted", "-created_at")
        )

        return Response([
            {
                "id": p.id,
                "user": p.user.username,
                "content": p.content,
                "post_type": p.post_type,
                "image": p.image.url if p.image else None,
                "is_promoted": p.is_promoted,
                "likes_count": p.likes_count,
                "comments_count": p.comments_count,
            }
            for p in posts
        ])

class CommentListCreateAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        text = request.data.get("text")

        if not text or not text.strip():
            return Response(
                {"error": "Comment text is required"},
                status=400
            )

        post = Post.objects.get(id=post_id)

        Comment.objects.create(
            user=request.user,
            post=post,
            text=text
        )

        return Response({"message": "Comment added"}, status=201)


class UserPostsAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        posts = Post.objects.filter(user_id=user_id).order_by('-created_at')
        serializer = PostSerializer(
            posts,
            many=True,
            context={'request': request}
        )
        return Response(serializer.data)

class CreateStoryAPI(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        Story.objects.create(
            user=request.user,
            image=request.data.get('image')
        )
        return Response({"message": "Story uploaded"}, status=201)

class StoryListAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        stories = Story.objects.all()
        active_stories = [s for s in stories if s.is_active()]

        return Response([
            {
                "user": s.user.username,
                "image": s.image.url,
                "created_at": s.created_at,
            }
            for s in active_stories
        ])
