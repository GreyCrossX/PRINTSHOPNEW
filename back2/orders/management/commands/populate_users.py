from django.core.management.base import BaseCommand
from orders.models import User

class Command(BaseCommand):
    help = 'Populate the database with mock users.'

    def handle(self, *args, **kwargs):
        users_data = [
            {"name": "Alice", "last_name": "Smith", "email": "alice.smith@example.com", "phone": "1234567890", "address": "123 Maple St"},
            {"name": "Bob", "last_name": "Johnson", "email": "bob.johnson@example.com", "phone": "2345678901", "address": "456 Oak St"},
            {"name": "Charlie", "last_name": "Brown", "email": "charlie.brown@example.com", "phone": "3456789012", "address": "789 Pine St"},
            {"name": "David", "last_name": "Williams", "email": "david.williams@example.com", "phone": "4567890123", "address": "101 Elm St"},
            {"name": "Eva", "last_name": "Jones", "email": "eva.jones@example.com", "phone": "5678901234", "address": "202 Birch St"},
            {"name": "Frank", "last_name": "Miller", "email": "frank.miller@example.com", "phone": "6789012345", "address": "303 Cedar St"},
            {"name": "Grace", "last_name": "Wilson", "email": "grace.wilson@example.com", "phone": "7890123456", "address": "404 Spruce St"},
            {"name": "Henry", "last_name": "Moore", "email": "henry.moore@example.com", "phone": "8901234567", "address": "505 Ash St"},
            {"name": "Isabella", "last_name": "Taylor", "email": "isabella.taylor@example.com", "phone": "9012345678", "address": "606 Cherry St"},
            {"name": "Jack", "last_name": "Anderson", "email": "jack.anderson@example.com", "phone": "0123456789", "address": "707 Walnut St"},
        ]

        for user_data in users_data:
            user, created = User.objects.get_or_create(
                name=user_data["name"],
                last_name=user_data["last_name"],
                email=user_data["email"],
                phone=user_data["phone"],
                address=user_data["address"]
            )
            self.stdout.write(
                f"{'Created' if created else 'Already exists'}: {user.name} {user.last_name}"
            )

        self.stdout.write("\nAll users have been processed successfully.")
