from django.core.management.base import BaseCommand
from orders.models import Variant, Option

class Command(BaseCommand):
    help = 'Populate variants and options'

    def handle(self, *args, **kwargs):
        options_data = [
    ('Carta (21.5x28 cm)', False),
    ('Media carta (14x21.5 cm)', False),
    ('Medio oficio (17x21.5 cm)', False),
    ('Otro ______________', True),
    ('Digital', False),
    ('Offset', False),
    ('______________', True),
    ('Color F/V', False),
    ('Blanco y negro F/V', False),
    ('Bond blanco de 75 g.', False),
    ('Bond blanco de 90 g.', False),
    ('Couché mate de 130 g.', False),
    ('Bond cultural (ahuesado) de 75 g.', False),
    ('Bond cultural (ahuesado) de 90 g.', False),
    ('Color 1ª. y 4ª. de forros (portada)', False),
    ('Color 2ª. y 3ª. de forros', False),
    ('Barniz a registro', False),
    ('Couché mate de 300 g.', False),
    ('Mate solo Frente', False),
    ('Mate F/V (no disponible para rústico pegado)', False),
    ('Brillante solo Frente', False),
    ('Brillante F/V (no disponible para rústico pegado)', False),
    ('Rústico pegado Ver', False),
    ('Rústico cosido', False),
    ('Espiral plástico Ver', False),
    ('Wire-o metálico Ver', False),
    ('Retractilado individual', False),
    ('Mail', False),
    ('WeTransfer', False),
    ('WhatsApp', False),
    ('Existente', False),
    ('Color solo Frente', False),
    ('Blanco y negro solo Frente', False),
    ('Color 1ª. de forros (portada)', False),
    ('Color 2ª. de forros', False),
    ('Color 3ª. de forros', False),
    ('Color 4ª de forros (contraportada)', False),
    ('A caballo Ver  (el número de páginas interiores debe ser múltiplo de 4)', False),
    ('Tres perforaciones', False),
    ('Carpeta de pasta dura (medida de herraje)', False),
    ('Carpeta de vinil (medida de herraje)', False),
    ('Una grapa', False),
    ('Sulfatada de 12 puntos', False),
    ('Sulfatada de 14 puntos', False),
    ('Nombre', False),
    ('Concepto', False),
    ('Fecha', False),
    ('Folio', False),
    ('Código de barras', False),
    ('Doble carta', False),
    ('Oficio', False),
    ('Serigrafía', False),
    ('Realzado en seco', False),
    ('Hotstamping', False),
    ('Realzado en seco y hotstamping', False),
    ('Papel opalina de 125 g.', False),
    ('Cartulina opalina de 225 g', False),
    ('Cartulina inspira de 230 g.', False),
    ('Corte recto', False),
    ('9.3x21.5 cm (tamaño extendido 28x21.5 cm)', False),
    ('14.3x28 cm (tamaño extendido 43x28 cm)', False),
    ('Personalizado', True),
    ('14x21.5 cm (tamaño extendido 28x21.5 cm)', False),
    ('21.5x28 cm (tamaño extendido 43x28 cm)', False),
    ('Cuarto de carta (14x10.5 cm)', False),
    ('21.5x5 cm', False),
    ('Con perforación', False),
    ('Con listón de 25 cm', False),
    ('Sin perforación', False),
    ('Con puntas redondeadas', False),
    ('Postal media carta (14x10.5 cm)', False),
    ('Tarjeta presentación (9x5 cm)', False),
    ('Postal (14x21.5 cm)', False),
    ('Mate F/V', False),
    ('Brillante F/V', False),
    ('5.4x8.6 cm', False),
    ('PVC', False),
    ('PVC con cinta magnética', False),
    ('Rectangular', False),
    ('Autoadherible', False),
    ('Medidas especiales', False),
    ('Impresión a color F/V', False),
    ('Acabado con dos dobleces', False),
    ('Acabado con un doblez', False),
]

        # Create or get each option
        for description, is_optional in options_data:
            option, created = Option.objects.get_or_create(description=description, is_optional=is_optional)
            self.stdout.write(f"{'Created' if created else 'Exists'} Option: {description}")

        self.stdout.write("\nAll options have been processed successfully.")

        # Now create variants and link options
        variants_data = [
    # (name, render_name, option_descriptions)
    ('Tamaño final', 'Tamaño final', ['Carta (21.5x28 cm)', 'Media carta (14x21.5 cm)', 'Medio oficio (17x21.5 cm)', 'Otro ______________']),
    ('Proceso de impresión', 'Proceso de impresión', ['Digital', 'Offset']),
    ('Número aprox de páginas interiores', 'Número aprox de páginas interiores', ['______________']),
    ('Impresión de interiores', 'Impresión de interiores', ['Color F/V', 'Blanco y negro F/V']),
    ('Papel de interiores', 'Papel de interiores', ['Bond blanco de 75 g.', 'Bond blanco de 90 g.', 'Couché mate de 130 g.', 'Bond cultural (ahuesado) de 75 g.', 'Bond cultural (ahuesado) de 90 g.', 'Otro ______________']),
    ('Impresión de forros', 'Impresión de forros', ['Color 1ª. y 4ª. de forros (portada)', 'Color 2ª. y 3ª. de forros', 'Barniz a registro']),
    ('Papel de forros', 'Papel de forros', ['Couché mate de 300 g.', 'Otro ______________']),
    ('Laminado de forros', 'Laminado de forros', ['Mate solo Frente', 'Mate F/V (no disponible para rústico pegado)', 'Brillante solo Frente', 'Brillante F/V (no disponible para rústico pegado)']),
    ('Acabado', 'Acabado', ['Rústico pegado Ver', 'Rústico cosido', 'Espiral plástico Ver', 'Wire-o metálico Ver', 'Retractilado individual', 'A caballo Ver  (el número de páginas interiores debe ser múltiplo de 4)', 'Tres perforaciones', 'Carpeta de pasta dura (medida de herraje)', 'Carpeta de vinil (medida de herraje)', 'Una grapa', 'Otro ______________']),
    ('Archivo', 'Archivo', ['Mail', 'WeTransfer', 'WhatsApp', 'Existente', 'Otro ______________']),
    ('Número de páginas interiores', 'Número de páginas interiores', ['______________']),
    ('Interiores', 'Interiores', ['Color F/V', 'Color solo Frente', 'Blanco y negro F/V', 'Blanco y negro solo Frente']),
    ('Dato variable', 'Dato variable', ['Nombre', 'Concepto', 'Fecha', 'Folio', 'Código de barras', 'Otro ______________']),
    ('Papel', 'Papel', ['Bond blanco de 75 g.', 'Bond blanco de 90 g.', 'Couché mate de 130 g.', 'Couché mate de 300 g.', 'Papel opalina de 125 g.', 'Cartulina opalina de 225 g', 'Cartulina inspira de 230 g.', 'PVC', 'PVC con cinta magnética', 'Autoadherible', 'Otro ______________']),
    ('Impresión', 'Impresión', ['Color F/V', 'Color solo Frente', 'Blanco y negro F/V', 'Blanco y negro solo Frente']),
    ('Proceso de grabado', 'Proceso de grabado', ['Realzado en seco', 'Hotstamping', 'Realzado en seco y hotstamping', 'Otro ______________']),
    ('Impresión a color F/V', 'Impresión a color F/V', ['Impresión a color F/V']),
    ('Acabado con dos dobleces', 'Acabado con dos dobleces', ['Acabado con dos dobleces']),
    ('Acabado con un doblez', 'Acabado con un doblez', ['Acabado con un doblez']),
    ('Laminado', 'Laminado', ['Mate solo Frente', 'Mate F/V', 'Brillante solo Frente', 'Brillante F/V']),
    ('Forma', 'Forma', ['Rectangular', 'Otro ______________']),
    ('Proceso de impresión (2)', 'Proceso de impresión', ['Digital', 'Offset', 'Serigrafía', 'Otro ______________']),
    ('Tamaño final (Variant 2)', 'Tamaño final', ['Carta (21.5x28 cm)', 'Doble carta', 'Oficio', 'Otro ______________']),
    ('Tamaño final (Variant 3)', 'Tamaño final', ['9.3x21.5 cm (tamaño extendido 28x21.5 cm)', '14.3x28 cm (tamaño extendido 43x28 cm)', 'Otro ______________']),
    ('Tamaño final (Variant 4)', 'Tamaño final', ['14x21.5 cm (tamaño extendido 28x21.5 cm)', '21.5x28 cm (tamaño extendido 43x28 cm)', 'Otro ______________']),
    ('Tamaño final (Variant 5)', 'Tamaño final', ['Carta (21.5x28 cm)', 'Media carta (14x21.5 cm)', 'Medio oficio (17x21.5 cm)', 'Cuarto de carta (14x10.5 cm)', 'Otro ______________']),
    ('Tamaño final (Variant 6)', 'Tamaño final', ['21.5x5 cm', 'Otro ______________']),
    ('Tamaño final (Variant 7)', 'Tamaño final', ['Postal media carta (14x10.5 cm)', 'Tarjeta presentación (9x5 cm)', 'Postal (14x21.5 cm)', 'Otro ______________']),
    ('Tamaño final (Variant 8)', 'Tamaño final', ['5.4x8.6 cm', 'Otro ______________']),
]

        variant_name_counts = {}  # To keep track of duplicate variant names

        for variant_info in variants_data:
            base_name, render_name, option_descriptions = variant_info

            # Handle duplicate variant names by appending a count
            count = variant_name_counts.get(base_name, 0) + 1
            variant_name_counts[base_name] = count

            if count > 1:
                name = f"{base_name} ({count})"
            else:
                name = base_name

            # Create the variant
            variant = Variant.objects.create(name=name, render_name=render_name)
            self.stdout.write(f"\nCreated Variant ID {variant.id}: {name}")

            # Add options to the variant
            for description in option_descriptions:
                try:
                    option = Option.objects.get(description=description)
                    variant.options.add(option)
                    self.stdout.write(f" - Linked Option: '{option.description}' to Variant ID {variant.id}: '{name}'")
                except Option.DoesNotExist:
                    self.stdout.write(f"Option '{description}' does not exist. Please ensure all options are created.")

        self.stdout.write("\nAll variants and their options have been processed successfully.")
