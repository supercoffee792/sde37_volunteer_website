from django.test import TestCase
from .models import Event, Volunteer #make sure you import all classses you use

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