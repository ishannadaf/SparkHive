from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from accounts.api_views import ProfileAPI, signup, ToggleFollowAPI, UpdateProfileAPI

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', ProfileAPI.as_view()),
    path("profile/<str:username>/", ProfileAPI.as_view()),
    path("follow/<str:username>/", ToggleFollowAPI.as_view()),
    path("profile/update/", UpdateProfileAPI.as_view()),
    path("signup/", signup),
]
