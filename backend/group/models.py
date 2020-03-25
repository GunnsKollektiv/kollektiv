from django.contrib.auth.models import Group as DjangoGroup
from django.db import models


class CustomGroup(DjangoGroup):

    def get_members(self):
        members = []
        for member in self.user_set.all():
            members.append({
                'email': member.email,
                'first_name': member.first_name,
                'last_name': member.last_name
            })

        def sortMembers(element):
            return element['first_name']

        members.sort(key=sortMembers)
        return members
