from django.db import models
import datetime

class Volunteer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    age = models.IntegerField(default=0)

    def __str__(self):
        return self.first_name
    
class Event(models.Model):
    EVENT_SKILLS = {
        ('Not urgent', 'not_urgent'),
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