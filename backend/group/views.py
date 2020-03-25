from rest_framework import generics, serializers, views
from rest_framework.response import Response

from auth.models import User

from .models import CustomGroup
from .serializers import AddGroupMemberSerializer, GroupCreateSerializer


class GroupCreateAPI(generics.GenericAPIView):
    """ Endpoint for creating a new group and adding request user """
    serializer_class = GroupCreateSerializer

    def post(self, *args, **kwargs):

        if self.request.user.has_group():
            raise serializers.ValidationError("User is already in a group.")

        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        group = CustomGroup(name=data['name'])
        group.save()
        self.request.user.groups.add(group)
        return Response({
            'id': group.id,
            'group': group.name
        })


class GroupAddMemberAPI(generics.GenericAPIView):
    """ Endpoint for add a member to the request users group """

    serializer_class = AddGroupMemberSerializer

    def post(self, *args, **kwargs):
        user = self.request.user

        if not user.has_group():
            raise serializers.ValidationError(
                f"{user} is not in a group.")

        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        new_member = User.objects.get(email=serializer.validated_data['email'])

        if new_member.has_group():
            raise serializers.ValidationError(
                f"{new_member} is already in a group.")

        group = user.get_group()
        new_member.groups.add(group)
        return Response(f"{new_member} added to {group}")


class GroupLeaveAPI(views.APIView):
    """ Endpoint for leaving a group """

    def post(self, *args, **kwargs):
        user = self.request.user
        if not user.has_group():
            raise serializers.ValidationError("User is not in a group.")
        group = user.get_group()

        user.groups.remove(group)

        # delete group if all members left it
        deleted = False
        if (len(group.user_set.all()) == 0):
            group.delete()
            deleted = True

        return Response(f"{user} removed from group {group}" + (f" and {group} was deleted" if deleted else ""))


class GroupRetrieveAPI(views.APIView):
    """ Endpoint for getting group details and group members """

    def get(self, *args, **kwargs):
        user = self.request.user

        if not user.has_group():
            raise serializers.ValidationError("User is not in a group.")

        group = user.get_group()

        return Response({
            'id': group.id,
            'name': group.name,
            'members': group.get_members()
        })
