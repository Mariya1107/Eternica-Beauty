from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from products import views as product_views
from orders import views as order_views
from django.http import HttpResponse  # import HttpResponse

router = DefaultRouter()
router.register(r'categories', product_views.CategoryViewSet)
router.register(r'products', product_views.ProductViewSet)
router.register(r'orders', order_views.OrderViewSet)

# Simple home view for root URL
def home(request):
    return HttpResponse("Welcome to the Backend API")

urlpatterns = [
    path('', home),  # Add this line for root URL
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/', include('accounts.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
