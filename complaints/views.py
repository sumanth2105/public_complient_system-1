from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.models import Group, User
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.views import LoginView
from django.urls import reverse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from .forms import UserRegistrationForm, ComplaintForm, ComplaintStatusUpdateForm
from .models import Category, Complaint


def is_admin_user(user):
    return user.is_active and user.is_staff


def is_department_user(user):
    return user.is_active and user.groups.filter(name='Department').exists()


def is_citizen_user(user):
    return user.is_active and not user.is_staff and not user.groups.filter(name='Department').exists()


@user_passes_test(is_admin_user, login_url='login')
def admin_panel_view(request):
    complaints = Complaint.objects.order_by('-created_at')

    if request.method == 'POST':
        complaint_id = request.POST.get('complaint_id')
        complaint = get_object_or_404(Complaint, id=complaint_id)
        form = ComplaintStatusUpdateForm(request.POST, instance=complaint)
        if form.is_valid():
            form.save()
            messages.success(request, 'Complaint status updated successfully.')
        else:
            messages.error(request, 'Unable to update complaint status. Please try again.')
        return redirect('admin_panel')

    return render(request, 'complaints/admin_panel.html', {'complaints': complaints})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class CustomLoginView(LoginView):
    template_name = 'registration/login.html'
    authentication_form = AuthenticationForm

    def dispatch(self, request, *args, **kwargs):
        self.ensure_demo_users()
        return super().dispatch(request, *args, **kwargs)

    def ensure_demo_users(self):
        demo_admin, created = User.objects.get_or_create(username='demo_admin', defaults={
            'email': 'demo_admin@example.com',
            'is_active': True,
            'is_staff': True,
            'is_superuser': True,
        })
        if created or not demo_admin.check_password('adminpass'):
            demo_admin.set_password('adminpass')
            demo_admin.is_active = True
            demo_admin.is_staff = True
            demo_admin.is_superuser = True
            demo_admin.save()

        department_group, _ = Group.objects.get_or_create(name='Department')
        demo_department, created = User.objects.get_or_create(username='demo_department', defaults={
            'email': 'demo_dept@example.com',
            'is_active': True,
            'is_staff': False,
            'is_superuser': False,
        })
        if created or not demo_department.check_password('departmentpass'):
            demo_department.set_password('departmentpass')
            demo_department.is_active = True
            demo_department.is_staff = False
            demo_department.is_superuser = False
            demo_department.save()
        demo_department.groups.add(department_group)

    def form_valid(self, form):
        login_type = self.request.POST.get('login_type')
        user = form.get_user()

        if login_type == 'admin' and not user.is_staff:
            form.add_error(None, 'This account is not authorized for admin access.')
            return self.form_invalid(form)

        if login_type == 'department' and not user.groups.filter(name='Department').exists():
            form.add_error(None, 'This account is not authorized for department access.')
            return self.form_invalid(form)

        if login_type == 'citizen' and (user.is_staff or user.groups.filter(name='Department').exists()):
            form.add_error(None, 'Please use the appropriate admin or department login.')
            return self.form_invalid(form)

        return super().form_valid(form)

    def get_success_url(self):
        login_type = self.request.POST.get('login_type')
        if login_type == 'admin':
            return reverse('admin_panel')
        if login_type == 'department':
            return reverse('department_panel')
        return reverse('dashboard')


@user_passes_test(is_department_user, login_url='login')
def department_panel_view(request):
    categories = Category.objects.all()
    selected_category_id = request.GET.get('category') or request.POST.get('category')

    complaints = Complaint.objects.none()

    if selected_category_id:
        try:
            cat = Category.objects.get(id=selected_category_id)
            complaints = Complaint.objects.filter(category=cat).order_by('-created_at')
        except Category.DoesNotExist:
            complaints = Complaint.objects.none()

    if request.method == 'POST' and request.POST.get('complaint_id'):
        complaint_id = request.POST.get('complaint_id')
        complaint = get_object_or_404(Complaint, id=complaint_id)
        form = ComplaintStatusUpdateForm(request.POST, instance=complaint)
        if form.is_valid():
            form.save()
            messages.success(request, 'Complaint status updated successfully.')
        else:
            messages.error(request, 'Unable to update complaint status. Please try again.')
        # redirect back to same category view
        return redirect(f"{request.path}?category={selected_category_id}")

    return render(request, 'complaints/department_panel.html', {'categories': categories, 'complaints': complaints, 'selected_category_id': selected_category_id})


def home_view(request):
    resolved_count = Complaint.objects.filter(status='Resolved').count()
    pending_count = Complaint.objects.filter(status='Pending').count()
    total_count = Complaint.objects.count()
    
    context = {
        'resolved_count': resolved_count,
        'pending_count': pending_count,
        'total_count': total_count
    }
    return render(request, 'complaints/home.html', context)

@ensure_csrf_cookie
def register_view(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()
            login(request, user)
            return redirect('home')
    else:
        form = UserRegistrationForm()
    return render(request, 'registration/register.html', {'form': form})

@login_required
def dashboard_view(request):
    if request.user.is_staff:
        return redirect('admin_panel')
    if request.user.groups.filter(name='Department').exists():
        return redirect('department_panel')
    complaints = Complaint.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'complaints/dashboard.html', {'complaints': complaints})

@login_required
def submit_complaint_view(request):
    if request.user.is_staff or request.user.groups.filter(name='Department').exists():
        return redirect('login')
    if request.method == 'POST':
        form = ComplaintForm(request.POST, request.FILES)
        if form.is_valid():
            complaint = form.save(commit=False)
            complaint.user = request.user
            complaint.save()
            return redirect('dashboard')
    else:
        form = ComplaintForm()
    return render(request, 'complaints/submit_complaint.html', {'form': form})

@login_required
def complaint_detail_view(request, complaint_id):
    if request.user.is_staff:
        complaint = get_object_or_404(Complaint, id=complaint_id)
    else:
        complaint = get_object_or_404(Complaint, id=complaint_id, user=request.user)
    return render(request, 'complaints/complaint_detail.html', {'complaint': complaint})
