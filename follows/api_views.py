from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Follow
from notifications.models import Notification
from accounts.models import User

class FollowToggleAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        target = User.objects.get(id=user_id)

        follow, created = Follow.objects.get_or_create(
            follower=request.user,
            following=target
        )

        if created:
            Notification.objects.create(
                user=target,
                sender=request.user,
                notification_type='follow',
                message=f"{request.user.username} started following you"
            )
            return Response({"message": "Followed"})

        follow.delete()
        return Response({"message": "Unfollowed"})
