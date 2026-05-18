from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from .forms import UserRegistrationForm, ComplaintForm
from .models import Complaint

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
    complaints = Complaint.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'complaints/dashboard.html', {'complaints': complaints})

@login_required
def submit_complaint_view(request):
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
    complaint = get_object_or_404(Complaint, id=complaint_id, user=request.user)
    return render(request, 'complaints/complaint_detail.html', {'complaint': complaint})
