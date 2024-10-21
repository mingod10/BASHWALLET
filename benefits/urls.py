from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, TransactionViewSet, BenefitViewSet, DistributedFundViewSet

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'benefits', BenefitViewSet)
router.register(r'distributed-funds', DistributedFundViewSet)

urlpatterns = [
    path('', include(router.urls)),
]