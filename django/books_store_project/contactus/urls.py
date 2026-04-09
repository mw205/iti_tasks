from django.urls import path

from contactus.views import index

app_name = "contactus"

urlpatterns = [
    path('index/', index, name='index'),

]
