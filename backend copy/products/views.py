from rest_framework import viewsets
from django.db.models import Q
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny] 

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
        
        # Search filter
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(advantages__icontains=search)
            )
        
        return queryset

    @action(detail=True, methods=['get'])
    def related(self, request, pk=None):
        """
        Returns products in the same category as the given product (excluding itself).
        """
        try:
            current_product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=404)

        related_products = Product.objects.filter(category=current_product.category).exclude(pk=current_product.pk)
        serializer = self.get_serializer(related_products, many=True)
        return Response(serializer.data)
