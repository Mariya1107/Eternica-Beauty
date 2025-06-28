from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    quantity = models.CharField(max_length=50)
    advantages = models.TextField()
    safety_information = models.TextField(blank=True, null=True) # <-- Added
    ingredients = models.TextField(blank=True, null=True)
    how_to_use = models.TextField()
    image = models.ImageField(upload_to='products/')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    in_stock = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    available_quantities = models.CharField(max_length=200, blank=True, null=True)
    def __str__(self):
        return self.name