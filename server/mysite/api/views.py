from django.shortcuts import render, get_object_or_404, redirect
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Volunteer, Event
from .serializers import VolunteerSerializer, VolunteerSignupSerializer, EventSerializer, VolunteerLoginSerializer
from rest_framework.views import APIView
from django.utils import timezone

# Login / Signup operations
@api_view(['POST'])
def login(request):
    volunteer_data = request.data
    serializer = VolunteerLoginSerializer(data=volunteer_data)
    if serializer.is_valid():
        user = serializer.validated_data
        serializer = VolunteerSerializer(user)
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {"refresh":str(token), "access": str(token.access_token)}
        return Response(data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def signup(request):
    volunteer_data = request.data
    serializer = VolunteerSignupSerializer(data=volunteer_data)
    if serializer.is_valid():
        user = serializer.save()
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {"refresh": str(token), "access": str(token.access_token)}
        return Response(data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class VolunteerLogout(GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
class VolunteerTokenInfo(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = VolunteerSerializer

    def get(self, request, *args, **kwargs):
        volunteer_info = self.get_volunteer_info()
        serializer = self.get_serializer(volunteer_info)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_volunteer_info(self):
        return self.request.user

# Volunteer view operations
@api_view(['GET'])
def get_volunteers(request):
    volunteers = Volunteer.objects.all()
    serialized_data = VolunteerSerializer(volunteers, many=True).data
    return Response(serialized_data)

@api_view(['POST'])
def create_volunteer(request):
    volunteer_data = request.data
    serializer = VolunteerSerializer(data=volunteer_data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT', 'DELETE', 'PATCH'])
def manage_volunteer(request, pk):
    try:
        volunteer = Volunteer.objects.get(pk=pk)
    except Volunteer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        volunteer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = VolunteerSerializer(volunteer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PATCH':
        serializer = VolunteerSerializer(volunteer, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Event view operations
@api_view(['GET'])
def get_events(request):
    events = Event.objects.all()
    serialized_data = EventSerializer(events, many=True).data
    return Response(serialized_data)

@api_view(['GET'])
def get_one_event(request, pk):
    try:
        event = Event.objects.get(pk=pk)
        serialized_data = EventSerializer(event).data
        return Response(serialized_data, status=status.HTTP_200_OK)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_event(request):
    event_data = request.data
    serializer = EventSerializer(data=event_data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def manage_event(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'DELETE':
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        event_data = request.data
        serializer = EventSerializer(event, data=event_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# view for volunteers to signup for events
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def event_signup(request, pk):
    try:
        event = get_object_or_404(Event, id=pk)
        if request.user not in event.volunteers.all():
            event.volunteers.add(request.user)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Successfully signed up for the event!"}, status=status.HTTP_200_OK)

    except Event.DoesNotExist:
        return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)