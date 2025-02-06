from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import OrderCreateSerializer

class CreateOrderView(APIView):
    def post(self, request, format=None):
        serializer = OrderCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Order created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
