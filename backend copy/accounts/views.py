from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import RegisterSerializer, MyTokenObtainPairSerializer, AdminTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]  # Anyone can register (no auth required)


class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]  # Anyone can login
    serializer_class = MyTokenObtainPairSerializer


class AdminTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]  # Admin login endpoint open to all (checks inside serializer)
    serializer_class = AdminTokenObtainPairSerializer
