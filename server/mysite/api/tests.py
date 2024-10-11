from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Event, Volunteer
from django.contrib.auth.hashers import make_password

# Volunteer Signup/login tests
class VolunteerSignupTest(TestCase):
    def setUp(self):
        self.url = reverse('signup')
    
    def testSignUpURL(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 405) # test for correct HTTP methods

# Event tests
class EventModelTest(TestCase):
    @classmethod
    def setUp(cls):
        Event.objects.create(
            name="Example event", 
            date="2024-09-30", 
            location="America", 
            urgency="Urgent", 
            skills="Strong lifter", 
            description="stuff"
        )
    
    def testEventCreation(self):
        example = Event.objects.get(id=1)
        self.assertEqual(example.urgency, "Urgent")

class EventViewTest(TestCase):
    @classmethod
    def setUp(cls):
        num_events = 5

        for event_id in range(num_events):
            Event.objects.create(
                name="Example event", 
                date="2024-09-30", 
                location="America", 
                urgency="Urgent", 
                skills="Strong lifter", 
                description=f"{event_id}"
            )

    def testEventUrlExists(self):
        response = self.client.get('/api/events/')
        self.assertEqual(response.status_code, 200)