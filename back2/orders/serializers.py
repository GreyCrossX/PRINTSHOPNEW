from rest_framework import serializers
from .models import User, Option, Variant, Product, Order, OrderSpecs


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'user_id', 'name', 'last_name', 'email', 'phone', 'address']


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'description', 'is_optional']


class VariantSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True)

    class Meta:
        model = Variant
        fields = ['id', 'name', 'render_name', 'options']


class ProductSerializer(serializers.ModelSerializer):
    variants = VariantSerializer(many=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'variants']

class OrderSpecsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderSpecs
        fields = ('variant', 'option', 'custom_option_input')

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('user', 'product')

class OrderCreateSerializer(serializers.Serializer):
    order = OrderSerializer()
    specs = OrderSpecsSerializer(many=True)

    def create(self, validated_data):
        order_data = validated_data.get('order')
        specs_data = validated_data.get('specs')
        order = Order.objects.create(**order_data)
        for spec_data in specs_data:
            OrderSpecs.objects.create(order=order, **spec_data)
        return order