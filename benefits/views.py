from rest_framework import viewsets
from .models import Employee, Transaction, Benefit, DistributedFund
from .serializers import EmployeeSerializer, TransactionSerializer, BenefitSerializer, DistributedFundSerializer

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class BenefitViewSet(viewsets.ModelViewSet):
    queryset = Benefit.objects.all()
    serializer_class = BenefitSerializer

class DistributedFundViewSet(viewsets.ModelViewSet):
    queryset = DistributedFund.objects.all()
    serializer_class = DistributedFundSerializer