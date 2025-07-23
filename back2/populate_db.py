#!/usr/bin/env python
import os
import django
import sys

# Add the project directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'printapi.settings')
django.setup()

from orders.models import User, Option, Variant, Product, Order, OrderSpecs

def populate_database():
    print("Starting database population...")
    
    # Create Options
    options_data = [
        {"description": "A4 Size", "is_optional": False},
        {"description": "A3 Size", "is_optional": False},
        {"description": "Letter Size", "is_optional": False},
        {"description": "Color Printing", "is_optional": True},
        {"description": "Black & White", "is_optional": False},
        {"description": "Double Sided", "is_optional": True},
        {"description": "Single Sided", "is_optional": False},
        {"description": "Glossy Paper", "is_optional": True},
        {"description": "Matte Paper", "is_optional": False},
        {"description": "Binding", "is_optional": True},
        {"description": "Lamination", "is_optional": True},
    ]
    
    options = []
    for option_data in options_data:
        option, created = Option.objects.get_or_create(
            description=option_data["description"],
            defaults={"is_optional": option_data["is_optional"]}
        )
        options.append(option)
        if created:
            print(f"Created option: {option.description}")
    
    # Create Variants
    variants_data = [
        {"name": "Paper Size", "render_name": "Size", "option_descriptions": ["A4 Size", "A3 Size", "Letter Size"]},
        {"name": "Print Type", "render_name": "Color", "option_descriptions": ["Color Printing", "Black & White"]},
        {"name": "Print Sides", "render_name": "Sides", "option_descriptions": ["Double Sided", "Single Sided"]},
        {"name": "Paper Type", "render_name": "Paper", "option_descriptions": ["Glossy Paper", "Matte Paper"]},
        {"name": "Finishing", "render_name": "Extras", "option_descriptions": ["Binding", "Lamination"]},
    ]
    
    variants = []
    for variant_data in variants_data:
        variant, created = Variant.objects.get_or_create(
            name=variant_data["name"],
            defaults={"render_name": variant_data["render_name"]}
        )
        
        # Add options to variant
        for option_desc in variant_data["option_descriptions"]:
            option = Option.objects.get(description=option_desc)
            variant.options.add(option)
        
        variants.append(variant)
        if created:
            print(f"Created variant: {variant.name}")
    
    # Create Products
    products_data = [
        {
            "name": "Document Printing",
            "description": "Standard document printing service",
            "variant_names": ["Paper Size", "Print Type", "Print Sides", "Paper Type"]
        },
        {
            "name": "Photo Printing",
            "description": "High-quality photo printing",
            "variant_names": ["Paper Size", "Print Type", "Paper Type", "Finishing"]
        },
        {
            "name": "Business Cards",
            "description": "Professional business card printing",
            "variant_names": ["Print Type", "Paper Type", "Finishing"]
        },
        {
            "name": "Flyers",
            "description": "Marketing flyer printing",
            "variant_names": ["Paper Size", "Print Type", "Print Sides", "Paper Type"]
        },
    ]
    
    products = []
    for product_data in products_data:
        product, created = Product.objects.get_or_create(
            name=product_data["name"],
            defaults={"description": product_data["description"]}
        )
        
        # Add variants to product
        for variant_name in product_data["variant_names"]:
            variant = Variant.objects.get(name=variant_name)
            product.variants.add(variant)
        
        products.append(product)
        if created:
            print(f"Created product: {product.name}")
    
    # Create sample users
    users_data = [
        {
            "name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "address": "123 Main St, City, State 12345"
        },
        {
            "name": "Jane",
            "last_name": "Smith",
            "email": "jane.smith@example.com",
            "phone": "0987654321",
            "address": "456 Oak Ave, City, State 67890"
        },
    ]
    
    users = []
    for user_data in users_data:
        user, created = User.objects.get_or_create(
            email=user_data["email"],
            defaults=user_data
        )
        users.append(user)
        if created:
            print(f"Created user: {user.name} {user.last_name}")
    
    print("Database population completed!")
    print(f"Created {Option.objects.count()} options")
    print(f"Created {Variant.objects.count()} variants")
    print(f"Created {Product.objects.count()} products")
    print(f"Created {User.objects.count()} users")

if __name__ == "__main__":
    populate_database()