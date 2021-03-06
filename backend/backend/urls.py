from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('auth.urls')),
    path('api/group/', include('group.urls')),
    path('api/list/', include('list.urls'))
]
