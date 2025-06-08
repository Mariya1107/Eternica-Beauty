from rest_framework import viewsets
from django.db.models import Q
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from rest_framework.permissions import AllowAny
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny] 

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Category filter (your existing code)
        category = self.kwargs.get('category')
        if not category:
            category = self.request.query_params.get('category')
        if category:
            category_map = {
                'essential': 'Essential Oils',
                'carrier': 'Carrier Oils',
                'fragrance': 'Fragrance Oils',
                'massage': 'Massage Oils',
            }
            category_full = category_map.get(category.lower(), category)
            queryset = queryset.filter(category__name__iexact=category_full)
        
        # New: Search filter (fix for your search problem)
        search = self.request.query_params.get('search')
        if search:
            # Filter products where name or advantages contain the search term (case insensitive)
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(advantages__icontains=search)
            )
        
        return queryset
