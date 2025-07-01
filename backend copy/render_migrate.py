import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings") 
django.setup()

from django.core.management import call_command

# Run migrations
call_command("migrate")

# Create a superuser only if not already created
from django.contrib.auth.models import User
if not User.objects.filter(username="mariya").exists():
    User.objects.create_superuser("mariya", "mariya@example.com", "12345")
    print("✅ Superuser created: mariya / 12345")
else:
    print("⚠️ Superuser already exists")
