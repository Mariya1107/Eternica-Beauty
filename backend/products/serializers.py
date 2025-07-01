from rest_framework import serializers
from .models import Category, Product

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    image1 = serializers.SerializerMethodField()
    image2 = serializers.SerializerMethodField()
    image3 = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_image(self, obj):
        return obj.image.url if obj.image else None

    def get_image1(self, obj):
        return obj.image1.url if obj.image1 else None

    def get_image2(self, obj):
        return obj.image2.url if obj.image2 else None

    def get_image3(self, obj):
        return obj.image3.url if obj.image3 else None
