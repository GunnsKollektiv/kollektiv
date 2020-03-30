from django.urls import path

from .views import ListItemsRetrieveAPI, ListItemCreateAPI, ListItemDeleteAPI

urlpatterns = [
    path('retrieve/', ListItemsRetrieveAPI.as_view()),
    path('add-item/', ListItemCreateAPI.as_view()),
    path('delete-item/', ListItemDeleteAPI.as_view())
]
