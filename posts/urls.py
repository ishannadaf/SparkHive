from django.urls import path
from .api_views import FeedAPI, CommentListCreateAPI, CreatePostAPI, CreateStoryAPI, ReactPostAPI

urlpatterns = [
    path('feed/', FeedAPI.as_view()),
    path('<int:post_id>/comments/', CommentListCreateAPI.as_view()),
    path('create/', CreatePostAPI.as_view()),
    path('story/create/', CreateStoryAPI.as_view()),
    path("<int:post_id>/react/", ReactPostAPI.as_view()),
    path("create/", CreatePostAPI.as_view()),
    path("feed/", FeedAPI.as_view()),
]
