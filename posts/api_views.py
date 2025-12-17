from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Post, Reaction, Comment
from .serializers import PostSerializer
from follows.models import Follow
from django.db.models import Q

class CreatePostAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class ReactPostAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        reaction_type = request.data.get('reaction')

        reaction, created = Reaction.objects.update_or_create(
            user=request.user,
            post_id=post_id,
            defaults={'reaction': reaction_type}
        )

        return Response({"message": "Reaction updated"})

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
        user = request.user

        followed_users = Follow.objects.filter(
            follower=user
        ).values_list('following', flat=True)

        feed = Post.objects.filter(
            Q(user__in=followed_users) |
            Q(user__college=user.college) |
            Q(is_promoted=True)
        ).distinct().order_by(
            '-is_promoted',
            '-created_at'
        )

        serializer = PostSerializer(feed, many=True)
        return Response(serializer.data)