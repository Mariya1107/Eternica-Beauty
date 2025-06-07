from rest_framework import viewsets, filters
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]  # 🔍 Add this
    search_fields = ['name', 'description']   # 🔍 Enable search by name & description

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Category filter
        category = self.kwargs.get('category') or self.request.query_params.get('category')
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
