from django.urls import path

from .views import GroupAddMemberAPI, GroupCreateAPI, GroupLeaveAPI, GroupRetrieveAPI

urlpatterns = [
    path('create/', GroupCreateAPI.as_view()),
    path('add-member/', GroupAddMemberAPI.as_view()),
    path('leave/', GroupLeaveAPI.as_view()),
    path('details/', GroupRetrieveAPI.as_view())
]
