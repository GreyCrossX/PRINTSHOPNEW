from django.core.management.base import BaseCommand
from orders.models import Product, Variant

class Command(BaseCommand):
    help = 'Populates the database with products'

    def handle(self, *args, **options):
        # Define how much we need to subtract from the current IDs
        ID_OFFSET = 29

        products_data = [
            # original variant_ids now start at 30, for example
            ("Manuales", "Crea manuales para tus empleados o alumnos", [30, 31, 40, 41, 34, 35, 36, 37, 38, 39]),
            ("Libros", "Libros personalizados para todas las edades", [30, 31, 32, 33, 34, 35, 36, 37, 38, 39]),
            ("Cuadernos de ejercicios y cuadernos", "Cuadernos útiles y personalizados", [30, 31, 32, 41, 34, 35, 36, 37, 38, 39]),
            ("Exámenes y evaluaciones", "Material de evaluación adaptado", [30, 31, 40, 41, 42, 34, 38, 39]),
            ("Diplomas, Constancias y Certificados", "Certificados de reconocimiento", [52, 51, 33, 45, 42, 34, 38, 39]),
            ("Trípticos", "Material informativo en formato tríptico", [31, 46, 34, 47, 39, 53]),
            ("Dípticos", "Material informativo en formato díptico", [31, 46, 34, 48, 39, 54]),
            ("Flyers", "Flyers promocionales personalizables", [31, 33, 34, 39, 55]),
            ("Separadores de libros", "Separadores de libros personalizados", [31, 33, 34, 38, 39, 56]),
            ("Postales y Tarjetas", "Tarjetas y postales personalizadas", [31, 33, 34, 37, 39, 57]),
            ("Credenciales", "Credenciales personalizadas", [31, 33, 42, 34, 38, 39, 58]),
            ("Etiquetas", "Etiquetas personalizadas", [50, 31, 33, 34, 38, 39, 58]),
        ]

        # Now, create or update products and associate variants
        for name, description, variant_ids in products_data:
            # Create or update the product
            product, created = Product.objects.get_or_create(
                name=name,
                defaults={'description': description}
            )
            if not created:
                # If the product already exists, just update the description
                product.description = description
                product.save()
            self.stdout.write(f"{'Created' if created else 'Updated'} Product: {name}")
            
            # Clear existing variants to prevent duplicates
            product.variants.clear()
            
            # Adjust each variant_id by subtracting the offset
            adjusted_ids = [vid - ID_OFFSET for vid in variant_ids]

            # Add variants to the product
            for adjusted_id in adjusted_ids:
                try:
                    variant = Variant.objects.get(id=adjusted_id)
                    product.variants.add(variant)
                    self.stdout.write(f" - Linked Variant ID {adjusted_id}: '{variant.name}' to Product: '{name}'")
                except Variant.DoesNotExist:
                    self.stdout.write(f"Variant ID {adjusted_id} does not exist in the new DB.")

        self.stdout.write("\nAll products have been processed successfully.")
