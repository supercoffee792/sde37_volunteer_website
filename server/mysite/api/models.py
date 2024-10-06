from django.db import models
import datetime

class Volunteer(models.Model):
    VOLUNTEER_GENDER = {
        ('Male', 'male'), ('Female', 'female'), ('Non-binary/Other', 'other')
    }
    AGE = {
        ("Under 15", ''),
       ("15-17", '15-17'),
        ("18-20", '18-20'),
        ("21-30", '21-30'),
        ("31-40", '31-40'),
        ("41-50", '41-50'),
        ("51-60", '51-60'),
        ("61+", '61+')
    }
    
    name = models.CharField(max_length=100)
    gender = models.CharField(choice=VOLUNTEER_GENDER, default="Gender")
    age = models.IntegerField(default=1)
    address1 = models.CharField(max_length=100)
    address1 = models.CharField(max_length=100)
    

    def __str__(self):
        return self.first_name
    
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