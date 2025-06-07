from rest_framework import viewsets
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Try to get category from URL path first
        category = self.kwargs.get('category')
        
        # If not found in URL, check query params (fallback)
        if not category:
            category = self.request.query_params.get('category')
        
        # Map short names to full category names if needed
        if category:
            category_map = {
                'essential': 'Essential Oils',
                'carrier': 'Carrier Oils',
                'fragrance': 'Fragrance Oils',
                'massage': 'Massage Oils',
            }
            category_full = category_map.get(category.lower(), category)
            
            queryset = queryset.filter(category__name__iexact=category_full)
        return queryset
