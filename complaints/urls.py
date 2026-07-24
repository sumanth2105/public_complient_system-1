from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('register/', views.register_view, name='register'),
    path('dashboard/', views.dashboard_view, name='dashboard'),
    path('admin-panel/', views.admin_panel_view, name='admin_panel'),
    path('department-panel/', views.department_panel_view, name='department_panel'),
    path('submit/', views.submit_complaint_view, name='submit_complaint'),
    path('complaint/<int:complaint_id>/', views.complaint_detail_view, name='complaint_detail'),
]
