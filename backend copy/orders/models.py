from django.db import models
from products.models import Product

class Order(models.Model):
    products = models.ManyToManyField(Product)
    tracking_number = models.CharField(max_length=100)
    customer_name = models.CharField(max_length=100)
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Order #{self.id}"