from rest_framework import routers
from django.urls import path
from .api import UserViewSet, ProductViewSet, VariantViewSet, OptionViewSet, OrderViewSet, OrderSpecsViewSet
from .views import CreateOrderView

router = routers.DefaultRouter()

# Register all viewsets with trailing slashes for clarity
router.register(r'api/users', UserViewSet, basename='users')
router.register(r'api/products', ProductViewSet, basename='products')
router.register(r'api/variants', VariantViewSet, basename='variants')
router.register(r'api/options', OptionViewSet, basename='options')
router.register(r'api/orders', OrderViewSet, basename='orders')
router.register(r'api/order-specs', OrderSpecsViewSet, basename='order-specs')

# Define urlpatterns and include the custom API view separately
urlpatterns = router.urls + [
    path('api/create_order/', CreateOrderView.as_view(), name="create_order"),
    path('api/users/<user_id>/', UserViewSet.as_view({'get': 'retrieve', 'put': 'update'}), name='user-detail')
]
