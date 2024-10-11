from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Event, Volunteer
from django.contrib.auth.hashers import make_password

# Volunteer Signup test
class VolunteerSignupTests(APITestCase):
    def test_create_user(self):
        url = reverse('signup')
        data = {
            "username": "newuser",
            "password": "password123",
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('token', response.data)
        self.assertEqual(response.data['user']['username'], "newuser")

# Volunteer signin tests
class VolunteerLoginTests(APITestCase):
    def setUp(self):
        self.username = 'John'
        self.password = 'password123'
        self.user = Volunteer.objects.create(
            username=self.username,
            password=make_password(self.password)
        )

        self.url = reverse('login')

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