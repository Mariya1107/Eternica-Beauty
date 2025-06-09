from django.urls import path
from .views import RegisterView, MyTokenObtainPairView, AdminTokenObtainPairView

urlpatterns = [
    # User auth
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    # Admin login
    path('admin/login/', AdminTokenObtainPairView.as_view(), name='admin_token_obtain_pair'),
]
