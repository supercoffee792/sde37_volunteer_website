from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Volunteer, Event

class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = '__all__'

class VolunteerSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Volunteer
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs): # watch here
        return attrs

    def create(self, validated_data):
        user_permissions = validated_data.pop('user_permissions', [])
        groups = validated_data.pop('groups', [])
        password = validated_data.pop('password')
        volunteer = Volunteer.objects.create_user(password=password, **validated_data)
        volunteer.groups.set(groups)
        volunteer.user_permissions.set(user_permissions)
        return volunteer

class VolunteerLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Wrong username or password")
        
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'