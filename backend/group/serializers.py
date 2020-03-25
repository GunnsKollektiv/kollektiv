from django.contrib.auth import authenticate
from rest_framework import serializers

from auth.models import User

from .models import CustomGroup


class GroupCreateSerializer(serializers.ModelSerializer):
    """ Serializer for creating a new group """

    class Meta:
        model = CustomGroup
        fields = '__all__'


class AddGroupMemberSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, data):
        try:
            user = User.objects.get(email=data['email'])
        except:
            raise serializers.ValidationError(
                f"No user with email {data['email']} exists.")
        return data
