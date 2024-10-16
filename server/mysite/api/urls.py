from django.urls import path, re_path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    re_path('login', login, name="login"),
    re_path('signup', signup, name="signup"),
    path("logout/", VolunteerLogout.as_view(), name="volunteer_logout"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("volunteer_info/", VolunteerTokenInfo.as_view(), name="volunter_token_info"),

    path("volunteers/", get_volunteers, name="get_volunteers"),
    path("volunteers/create", create_volunteer, name="create_volunteers"),
    path("volunteers/<int:pk>", manage_volunteer, name="manage_volunteers"),
    
    path("events/", get_events, name="get_events"),
    path("events/create", create_event, name="create_events"),
    path("events/<int:pk>", manage_event, name="manage_event"),
    path("events/<int:pk>/signup/", event_signup, name="event_signup",)
]