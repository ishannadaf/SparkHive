from rest_framework.generics import ListAPIView
from .models import College
from .serializers import CollegeSerializer

class CollegeListAPI(ListAPIView):
    queryset = College.objects.filter(is_active=True)
    serializer_class = CollegeSerializer
