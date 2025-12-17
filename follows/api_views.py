from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Follow
from accounts.models import User

class FollowToggleAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        target = User.objects.get(id=user_id)

        follow, created = Follow.objects.get_or_create(
            follower=request.user,
            following=target
        )

        if not created:
            follow.delete()
            return Response({"message": "Unfollowed"})

        return Response({"message": "Followed"})
