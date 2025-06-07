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