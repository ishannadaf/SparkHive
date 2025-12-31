from django.urls import path
from .api_views import NotificationListAPI, MarkNotificationReadAPI

urlpatterns = [
    path('', NotificationListAPI.as_view()),
    path('<int:notification_id>/read/', MarkNotificationReadAPI.as_view()),
]
