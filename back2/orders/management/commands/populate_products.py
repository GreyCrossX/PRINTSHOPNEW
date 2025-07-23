from django.core.management.base import BaseCommand
from orders.models import Product, Variant

class Command(BaseCommand):
    help = 'Populates the database with products'

    def handle(self, *args, **options):
        # Map variant names to products instead of using hardcoded IDs
        products_data = [
            ("Manuales", "Crea manuales para tus empleados o alumnos", [
                "Tamaño final", "Proceso de impresión", "Número aprox de páginas interiores", 
                "Número de páginas interiores", "Papel de interiores", "Impresión de forros", 
                "Papel de forros", "Laminado de forros", "Acabado", "Archivo"
            ]),
            ("Libros", "Libros personalizados para todas las edades", [
                "Tamaño final", "Proceso de impresión", "Número aprox de páginas interiores", 
                "Impresión de interiores", "Papel de interiores", "Impresión de forros", 
                "Papel de forros", "Laminado de forros", "Acabado", "Archivo"
            ]),
            ("Cuadernos de ejercicios y cuadernos", "Cuadernos útiles y personalizados", [
                "Tamaño final", "Proceso de impresión", "Número aprox de páginas interiores", 
                "Número de páginas interiores", "Papel de interiores", "Impresión de forros", 
                "Papel de forros", "Laminado de forros", "Acabado", "Archivo"
            ]),
            ("Exámenes y evaluaciones", "Material de evaluación adaptado", [
                "Tamaño final", "Proceso de impresión", "Número aprox de páginas interiores", 
                "Número de páginas interiores", "Proceso de impresión (2)", "Papel de interiores", 
                "Acabado", "Archivo"
            ]),
            ("Diplomas, Constancias y Certificados", "Certificados de reconocimiento", [
                "Tamaño final (Variant 2)", "Proceso de impresión (2)", "Interiores", 
                "Proceso de grabado", "Proceso de impresión (2)", "Papel de interiores", 
                "Acabado", "Archivo"
            ]),
            ("Trípticos", "Material informativo en formato tríptico", [
                "Proceso de impresión", "Proceso de grabado", "Papel de interiores", 
                "Impresión a color F/V", "Archivo", "Acabado con dos dobleces"
            ]),
            ("Dípticos", "Material informativo en formato díptico", [
                "Proceso de impresión", "Proceso de grabado", "Papel de interiores", 
                "Acabado con un doblez", "Archivo", "Acabado con dos dobleces"
            ]),
            ("Flyers", "Flyers promocionales personalizables", [
                "Proceso de impresión", "Interiores", "Papel de interiores", "Archivo", 
                "Tamaño final (Variant 5)"
            ]),
            ("Separadores de libros", "Separadores de libros personalizados", [
                "Proceso de impresión", "Interiores", "Papel de interiores", "Laminado de forros", 
                "Archivo", "Tamaño final (Variant 6)"
            ]),
            ("Postales y Tarjetas", "Tarjetas y postales personalizadas", [
                "Proceso de impresión", "Interiores", "Papel de interiores", "Papel de forros", 
                "Archivo", "Tamaño final (Variant 7)"
            ]),
            ("Credenciales", "Credenciales personalizadas", [
                "Proceso de impresión", "Interiores", "Proceso de impresión (2)", "Papel de interiores", 
                "Laminado de forros", "Archivo", "Tamaño final (Variant 8)"
            ]),
            ("Etiquetas", "Etiquetas personalizadas", [
                "Forma", "Proceso de impresión", "Interiores", "Papel de interiores", 
                "Laminado de forros", "Archivo", "Tamaño final (Variant 8)"
            ]),
        ]

        # Create or update products and associate variants by name
        for name, description, variant_names in products_data:
            # Create or update the product
            product, created = Product.objects.get_or_create(
                name=name,
                defaults={'description': description}
            )
            if not created:
                product.description = description
                product.save()
            self.stdout.write(f"{'Created' if created else 'Updated'} Product: {name}")
            
            # Clear existing variants to prevent duplicates
            product.variants.clear()

            # Add variants to the product by name
            for variant_name in variant_names:
                try:
                    variant = Variant.objects.get(name=variant_name)
                    product.variants.add(variant)
                    self.stdout.write(f" - Linked Variant: '{variant.name}' to Product: '{name}'")
                except Variant.DoesNotExist:
                    self.stdout.write(f"Variant '{variant_name}' does not exist. Skipping...")

        self.stdout.write("\nAll products have been processed successfully.")
