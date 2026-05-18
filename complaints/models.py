from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Complaint(models.Model):
    STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('In Progress', 'In Progress'),
        ('Resolved', 'Resolved'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='complaints')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=255)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    photo = models.ImageField(upload_to='complaints_photos/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.status}"

from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.core.mail import send_mail

@receiver(pre_save, sender=Complaint)
def complaint_status_change(sender, instance, **kwargs):
    if instance.id:
        try:
            old_instance = Complaint.objects.get(id=instance.id)
            if old_instance.status != instance.status:
                subject = f"Update on your complaint: {instance.title}"
                message = f"Hello {instance.user.username},\n\nThe status of your complaint '{instance.title}' has been changed to: {instance.status}.\n\nThank you for using CivicConnect."
                send_mail(
                    subject,
                    message,
                    'no-reply@civicconnect.com',
                    [instance.user.email],
                    fail_silently=True,
                )
        except Complaint.DoesNotExist:
            pass
