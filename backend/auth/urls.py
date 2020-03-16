from django.urls import path
from knox import views as knox_views
from .views import UserCreateAPI, UserLoginAPI, UserRetrieveAPI

urlpatterns = [
    path('register/', UserCreateAPI.as_view()),
    path('login/', UserLoginAPI.as_view()),
    path('user/', UserRetrieveAPI.as_view()),
    path('logout/', knox_views.LogoutView.as_view())
]
