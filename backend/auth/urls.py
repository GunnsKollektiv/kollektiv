from django.urls import path
from knox import views as knox_views
from .views import UserCreateAPI, UserLoginAPI

urlpatterns = [
    path('register/', UserCreateAPI.as_view()),
    path('login/', UserLoginAPI.as_view()),
    path('logout/', knox_views.LogoutView.as_view())
]
