from django.db import models

class Employee(models.Model):
    name = models.CharField(max_length=255)
    employee_id = models.CharField(max_length=100, unique=True)
    card_status = models.CharField(max_length=50, choices=[('Active', 'Active'), ('Inactive', 'Inactive')])
    total_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    card_number = models.CharField(max_length=16, unique=True)
    uses = models.IntegerField(default=0)
    activation_date = models.DateField()

class Transaction(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    vendor = models.CharField(max_length=255)

class Benefit(models.Model):
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

class DistributedFund(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    benefit = models.ForeignKey(Benefit, on_delete=models.CASCADE)