from django.db import models

from group.models import CustomGroup


class List(models.Model):
    name = models.CharField(max_length=50)
    group = models.ForeignKey(CustomGroup, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class ListItem(models.Model):
    name = models.CharField(max_length=100)
    list_model = models.ForeignKey(List, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
