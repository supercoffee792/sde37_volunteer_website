from django.test import TestCase
from .models import Event, Volunteer #make sure you import all classses you use
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Event, Volunteer
from django.contrib.auth.hashers import make_password

# Volunteer Signup/login tests
class VolunteerSignupTest(TestCase):
    def testSignUpExists(self):
        url = reverse('signup')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 405) # test for correct HTTP methods

    def testSignup(self):
        url = reverse('signup')
        data = {
            'username': 'testuser',
            'password': 'testpassword123',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Volunteer.objects.filter(username='testuser').exists())

    def testLoginExists(self):
        url = reverse('login')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 405) # test for correct HTTP methods

    def testLogin(self):
        url = reverse('login')

        volunteer = Volunteer.objects.create_user(
            username="testuser",
            password="password123"
        )

        data = {
            'username': 'testuser',
            'password': 'password123',
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

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

    def test_num_events(self):
        num_events = 5
        for event_id in range(1, num_events + 1):
            example = Event.objects.get(id=event_id)
            self.assertEqual(example.id, event_id)

#########################################################################################
#different users test case
class UserModelTest(TestCase):
    @classmethod
    def setUp(cls):
        Volunteer.objects.create(
            pfp = "bear.png",
            username = "John Doe",
            gender = "Male",
            age ="21-30",
            address1 = "123 Main Street",
            address2 = "Apt 533",
            state = "AL",
            city = "Huntsville",
            zipcode = "12345", 
            skills = "Programming",
            preferences = "early mornings",
            notififications = "new notification",
            availability = {"Tuesday": "22:36 - 06:36"}
        )

    
    
    def testVolunteerCreation(self):
        example = Volunteer.objects.get(username="John Doe")
        self.assertEqual(example.gender, "Male")


    class VolunteerViewTest(TestCase):
        @classmethod
        def setUp(cls):
            num_volunteers = 5

            for volunteer_id in range(num_volunteers):
                Volunteer.objects.create(
                    pfp="bear.png",
                    username="John Doe",
                    gender="Male",
                    age="21-30",
                    address1="123 Main Street",
                    address2="Apt 533",
                    state="AL",
                    city="Huntsville",
                    zipcode="12345", 
                    skills="Programming",
                    preferences="early mornings",
                    notififications="new notification",
                    availability={"Tuesday": "22:36 - 06:36"}
                )

        def testVolunteerUrlExists(self):
            response = self.client.get('/api/volunteers/') 
            self.assertEqual(response.status_code, 200)

        # def testVolunteerListContent(self):
        #     response = self.client.get('/api/volunteers/')
        #     self.assertEqual(response.status_code, 200)
        #     self.assertContains(response, "Volunteer 0")  # Check for one of the volunteer usernames


##SECOND SOLN?

# class VolunteerModelTest(TestCase):
#     @classmethod
#     def setUpTestData(cls):
#         Volunteer.objects.create(
#             pfp="bear.png",
#             username="John Doe",
#             gender="Male",
#             age="21-30",
#             address1="123 Main Street",
#             address2="Apt 533",
#             state="AL",
#             city="Huntsville",
#             zipcode="12345", 
#             skills="Programming",
#             preferences="early mornings",
#             notifications="new notification",
#             availability={"Tuesday": "22:36 - 06:36"}
#         )
    
#     def test_volunteer_creation(self):
#         example = Volunteer.objects.get(username="John Doe")
#         self.assertEqual(example.gender, "Male")

# class VolunteerViewTest(TestCase):
#     @classmethod
#     def setUpTestData(cls):
#         num_volunteers = 5
#         for volunteer_id in range(num_volunteers):
#             Volunteer.objects.create(
#                 pfp="bear.png",
#                 username=f"Volunteer {volunteer_id}",
#                 gender="Male",
#                 age="21-30",
#                 address1="123 Main Street",
#                 address2="Apt 533",
#                 state="AL",
#                 city="Huntsville",
#                 zipcode="12345", 
#                 skills="Programming",
#                 preferences="early mornings",
#                 notifications="new notification",
#                 availability={"Tuesday": "22:36 - 06:36"}
#             )

#     def test_volunteer_url_exists(self):
#         response = self.client.get('/api/volunteers/') 
#         self.assertEqual(response.status_code, 200)

#     def test_volunteer_list_content(self):
#         response = self.client.get('/api/volunteers/')
#         self.assertEqual(response.status_code, 200)
#         self.assertContains(response, "Volunteer 0")  # Check for one of the volunteer usernames

class EventAPITest(APITestCase):
    def test_post_view(self): # Create event view
        url = reverse('create_events')

        data = {
            'name': 'test',
            'date': '2024-09-30', 
            'location': 'America', 
            'urgency': 'Urgent', 
            'skills': 'Strong lifter', 
            'description': 'stuff'
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'test')

    def test_put_view(self): # Manage event view
        event = Event.objects.create(
            name="Example event", 
            date="2024-09-30", 
            location="America", 
            urgency="Urgent", 
            skills="Strong lifter", 
            description="stuff"
        )

        url = reverse('manage_event', args=[event.id])
        update_data = {
            'name': 'Event 2',
            'date': '2024-09-30', 
            'location': 'America', 
            'urgency': 'Urgent', 
            'skills': 'Strong lifter', 
            'description': 'stuff'
        }
        
        response = self.client.put(url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_view(self): # Manage events delete
        event = Event.objects.create(
            name="Example event", 
            date="2024-09-30", 
            location="America", 
            urgency="Urgent", 
            skills="Strong lifter", 
            description="stuff"
        )

        url = reverse('manage_event', args=[event.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
