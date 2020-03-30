from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers

from .models import List, ListItem


class ListSerializer(serializers.ModelSerializer):

    class Meta:
        model = List
        fields = '__all__'


class ListItemCreateSerializer(serializers.Serializer):

    list_id = serializers.IntegerField()
    name = serializers.CharField(max_length=100)


class ListItemDeleteSerializer(serializers.Serializer):
    item_id = serializers.IntegerField()
