# Generated by Django 5.1.5 on 2025-01-16 01:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Option',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=100, unique=True)),
                ('is_optional', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('description', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.CharField(editable=False, max_length=6, unique=True)),
                ('name', models.CharField(max_length=25)),
                ('last_name', models.CharField(max_length=25)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=10)),
                ('address', models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.product')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='orders.user')),
            ],
        ),
        migrations.CreateModel(
            name='Variant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('render_name', models.CharField(default='', max_length=100)),
                ('options', models.ManyToManyField(related_name='variants', to='orders.option')),
            ],
        ),
        migrations.AddField(
            model_name='product',
            name='variants',
            field=models.ManyToManyField(related_name='products', to='orders.variant'),
        ),
        migrations.CreateModel(
            name='OrderSpecs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('custom_option_input', models.TextField(blank=True, null=True)),
                ('option', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.option')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='specs', to='orders.order')),
                ('variant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.variant')),
            ],
        ),
    ]
