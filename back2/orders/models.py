from django.db import models
import random

class User(models.Model):
    user_id = models.CharField(max_length=6, unique=True, editable=False)
    name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    email = models.EmailField(max_length=254)
    phone = models.CharField(max_length=10)
    address = models.CharField(max_length=1000)

    def save(self, *args, **kwargs):
        if not self.user_id:
            self.user_id = self.generate_unique_user_id()
        super().save(*args, **kwargs)

    def generate_unique_user_id(self):
        while True:
            user_id = str(random.randint(100000, 999999))
            if not User.objects.filter(user_id=user_id).exists():
                return user_id

    def __str__(self):
        return f"{self.name} {self.last_name} (ID: {self.user_id})"


class Option(models.Model):
    description = models.CharField(max_length=100, unique=True)
    is_optional = models.BooleanField(default=False)

    def __str__(self):
        return self.description


class Variant(models.Model):
    name = models.CharField(max_length=100, unique=True)
    options = models.ManyToManyField(Option, related_name="variants")
    render_name = models.CharField(max_length=100, default="", unique=False)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    variants = models.ManyToManyField(Variant, related_name="products")

    def __str__(self):
        return self.name


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} by {self.user if self.user else 'Guest'}"


class OrderSpecs(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="specs")
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE)
    option = models.ForeignKey(Option, on_delete=models.CASCADE)
    custom_option_input = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.order} - {self.variant} - {self.option}"
