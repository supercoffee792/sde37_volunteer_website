from django.urls import path
from .views import get_volunteers, create_volunteer, get_events, create_event, manage_event

urlpatterns = [
    path("volunteers/", get_volunteers, name="get_volunteers"),
    path("volunteers/create", create_volunteer, name="create_volunteers"),
    path("events/", get_events, name="get_events"),
    path("events/create", create_event, name="create_events"),
    path("events/<int:pk>", manage_event, name="manage_event",)
]