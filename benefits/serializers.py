from rest_framework import serializers
from .models import Employee, Transaction, Benefit, DistributedFund

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

class BenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Benefit
        fields = '__all__'

class DistributedFundSerializer(serializers.ModelSerializer):
    class Meta:
        model = DistributedFund
        fields = '__all__'