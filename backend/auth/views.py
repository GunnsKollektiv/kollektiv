from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .models import User
from .serializers import UserSerializer, UserLoginSerializer


class UserCreateAPI(generics.GenericAPIView):
    """ Endpoint for creating a new user """
    serializer_class = UserSerializer

    permission_classes = [
        permissions.AllowAny
    ]
    authentication_classes = []

    def post(self, *args, **kwargs):
        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        password = data['password']
        del data['password']
        user = User(**data)
        user.set_password(password)
        user.save()

        return Response({
            'email': user.email,
            'token': AuthToken.objects.create(user)[1],
            'first_name': user.first_name,
            'last_name': user.last_name
        })


class UserLoginAPI(generics.GenericAPIView):
    """ Endpoint for logging in a user """
    serializer_class = UserLoginSerializer

    permission_classes = [
        permissions.AllowAny
    ]
    authentication_classes = []

    def post(self, *args, **kwargs):
        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        return Response({
            'email': user.email,
            'token': AuthToken.objects.create(user)[1],
            'first_name': user.first_name,
            'last_name': user.last_name
        })


class UserRetrieveAPI(generics.RetrieveAPIView):
    """ Returns the current user """
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
