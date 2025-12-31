from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Notification

class NotificationListAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notifications = Notification.objects.filter(
            user=request.user
        ).order_by("-created_at")

        return Response([
            {
                "id": n.id,
                "sender": n.sender.username,
                "message": n.message,
                "is_read": n.is_read,
                "created_at": n.created_at,
            }
            for n in notifications
        ])

class MarkNotificationReadAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, notification_id):
        Notification.objects.filter(
            id=notification_id,
            user=request.user
        ).update(is_read=True)

        return Response({"message": "Marked as read"})
