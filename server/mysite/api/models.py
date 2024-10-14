from django.db import models
from django.contrib.auth.models import AbstractBaseUser, AbstractUser
from django.conf import settings
from rest_framework.authtoken.models import Token as BaseToken
import datetime

class Volunteer(AbstractUser):
    VOLUNTEER_GENDER = {
        ('Male', 'Male'), ('Female', 'Female'), ('Non-Binary/Other', 'Non-Binary/Other')
    }
    STATE = {
        ('AL', 'AL'), ('AK', 'AK'), ('AZ', 'AZ'), ('AR', 'AR'), ('CA', 'CA'), 
        ('CO', 'CO'), ('CT', 'CT'), ('DE', 'DE'), ('FL', 'FL'), ('GA', 'GA'), 
        ('HI', 'HI'), ('ID', 'ID'), ('IL', 'IL'), ('IN', 'IN'), ('IA', 'IA'), 
        ('KS', 'KS'), ('KY', 'KY'), ('LA', 'LA'), ('ME', 'ME'), ('MD', 'MD'), 
        ('MA', 'MA'), ('MI', 'MI'), ('MN', 'MN'), ('MS', 'MS'), ('MO', 'MO'), 
        ('MT', 'MT'), ('NE', 'NE'), ('NV', 'NV'), ('NH', 'NH'), ('NJ', 'NJ'), 
        ('NM', 'NM'), ('NY', 'NY'), ('NC', 'NC'), ('ND', 'ND'), ('OH', 'OH'), 
        ('OK', 'OK'), ('OR', 'OR'), ('PA', 'PA'), ('RI', 'RI'), ('SC', 'SC'), 
        ('SD', 'SD'), ('TN', 'TN'), ('TX', 'TX'), ('UT', 'UT'), ('VT', 'VT'), 
        ('VA', 'VA'), ('WA', 'WA'), ('WV', 'WV'), ('WI', 'WI'), ('WY', 'WY')
    }
    AGE = {
        ('Under 15', 'Under 15'),
       ('15-17', '15-17'),
        ('18-20', '18-20'),
        ('21-30', '21-30'),
        ('31-40', '31-40'),
        ('41-50', '41-50'),
        ('51-60', '51-60'),
        ('61+', '61+')
    }
    PFP = [
        ('bear.png', 'Bear'),
        ('bird.png', 'Bird'),
        ('chameleon.png', 'Chameleon'),
        ('frog.png', 'Frog'),
        ('raccoon.png', 'Raccoon'),
        ('turtle.png', 'Turtle'),
    ]
    
    pfp = models.ImageField(upload_to='profile_pictures/', choices=PFP, default='bear.png') 
    profilename = models.CharField(max_length=50, default='John Doe')
    gender = models.CharField(max_length=16, choices=VOLUNTEER_GENDER, default="Male")
    age = models.CharField(max_length=8, choices=AGE, default = "21-30")
    address1 = models.CharField(max_length=100, default="123 Main Street")
    address2 = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=2, choices=STATE, default = "AL")
    city = models.CharField(max_length=100, default="Huntsville")
    zipcode = models.CharField(max_length=9, default = "12345")

    # User credentials
    username = models.CharField(max_length=100, unique=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    
    skills = models.TextField(blank=True)
    preferences = models.TextField(blank=True)
    notififications = models.TextField(blank=True)
    availability = models.JSONField(default=dict)
    
    # allows for multiple skill choices from form
    def get_skills_list(self):
        return self.skills.split(',') if self.skills else []

    def set_skills_list(self, skills):
        self.skills = ','.join(skills)

    
# class EventHistory(models.Model):
#     volunteer = models.ForeignKey(Volunteer, on_delete=models.CASCADE, related_name='event_history')
#     event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='event_history')
#     is_future_event
    
#     #checking if event is an upcoming or past event (true if past event)
#     def has_happened(self): 
#         return self.event.date < datetime.date.today() 
    
    
# class Notification(models.Model):
#     volunteer = models.ForeignKey(Volunteer, on_delete=models.CASCADE, related_name='notifications')
#     event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='notifications')
#     message = models.TextField()
#     date_sent = models.DateTimeField(auto_now_add=True)
    

    
class Event(models.Model):
    EVENT_SKILLS = {
        ('Not urgent', 'not_urgent'), #front end, variable name
        ('Urgent', 'urgent'),
        ('Very urgent', 'very_urgent'),
    }

    name = models.CharField(max_length=100)
    date = models.DateField(default=datetime.date.today)
    location = models.CharField(max_length=200)
    urgency = models.CharField(max_length=20, choices=EVENT_SKILLS, default="Not urgent")
    skills = models.TextField(blank=True)
    description = models.TextField(blank=True)

    # allows for multiple skill choices from form
    def get_skills_list(self):
        return self.skills.split(',') if self.skills else []

    def set_skills_list(self, skills):
        self.skills = ','.join(skills)