from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Volunteer, Event
from .serializers import VolunteerSerializer, EventSerializer
from rest_framework.views import APIView

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
    
@api_view(['PUT', 'DELETE'])
def manage_volunteer(request, pk):
    try:
        volunteer = Volunteer.objects.get(pk=pk)
    except Volunteer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'DELETE':
        volunteer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        volunteer_data = request.data
        serializer = VolunteerSerializer(data=event_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Event view operations
@api_view(['GET'])
def get_events(request):
    events = Event.objects.all()
    serialized_data = EventSerializer(events, many=True).data
    return Response(serialized_data)

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
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)