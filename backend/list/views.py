from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics, serializers, views
from rest_framework.response import Response

from .models import List, ListItem
from .serializers import (ListItemCreateSerializer, ListItemDeleteSerializer,
                          ListSerializer)


class ListListAPI(generics.CreateAPIView):
    serializer_class = ListSerializer

    def get_queryset(self):
        return self.request.user.get_group().list_set.all()


class ListItemsRetrieveAPI(views.APIView):

    def get(self, *args, **kwargs):
        user = self.request.user
        if not user.has_group():
            raise serializers.ValidationError(
                f"{user} is not in a group.")

        group = self.request.user.get_group()

        lists = []
        for list_object in group.list_set.all():
            items = []
            for item in list_object.listitem_set.all():
                items.append({
                    'id': item.id,
                    'name': item.name
                })

            lists.append({
                'id': list_object.id,
                'name': list_object.name,
                'items': items
            })

        return Response(lists)


class ListItemCreateAPI(generics.GenericAPIView):
    serializer_class = ListItemCreateSerializer

    def post(self, *args, **kwargs):
        user = self.request.user
        if not user.has_group():
            raise serializers.ValidationError(
                f"{user} is not in a group.")

        group = self.request.user.get_group()

        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)

        try:
            list_object = group.list_set.get(
                id=serializer.validated_data['list_id'])
        except ObjectDoesNotExist:
            raise serializers.ValidationError(
                f"No list with id {serializer.validated_data['list_id']} exists for this group.")

        item = ListItem(list_model=list_object,
                        name=serializer.validated_data['name'])
        item.save()

        return Response("Item added")


class ListItemDeleteAPI(generics.GenericAPIView):
    serializer_class = ListItemDeleteSerializer

    def post(self, *args, **kwargs):
        user = self.request.user
        if not user.has_group():
            raise serializers.ValidationError(
                f"{user} is not in a group.")

        group = self.request.user.get_group()

        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)

        try:
            item = ListItem.objects.get(
                id=serializer.validated_data['item_id'])
        except ObjectDoesNotExist:
            raise serializers.ValidationError(
                f"No item with id {serializer.validated_data['item_id']} exists for this group.")

        if not item.list_model.group == group:
            raise serializers.ValidationError("Item not found")

        item.delete()

        return Response("Item deleted")
