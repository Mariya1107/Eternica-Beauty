from django.contrib import admin
from .models import Category, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'quantity', 'price', 'in_stock')
    list_filter = ('category', 'in_stock')
    search_fields = ('name', 'brand')
    fields = (
        'category', 'name', 'brand', 'quantity', 'available_quantities', 
        'advantages', 'safety_information', 'ingredients', 'how_to_use', 
        'image', 'image1', 'image2', 'image3', 'price', 'in_stock'
    )