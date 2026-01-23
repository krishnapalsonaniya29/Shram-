# from django.shortcuts import render
# from Worker.models import ReportWorkerModel, HourWage
# from Users.models import CustomUser, EmployerModel, WorkerModel
# from Employer.models import WorkersWorkModel
# from .models import ResolvedReportsModel
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated, BasePermission
# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework.views import APIView
# from rest_framework.permissions import AllowAny
# from Users.models import CustomUser
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from django.db.models import F, Value, Count, Q
# from django.db.models.functions import Concat
# from datetime import timedelta
# from django.utils import timezone
# # Create your views here.

# class IsAdminUser(BasePermission):
#     def has_permission(self, request, view):
#         return request.user and request.user.is_authenticated and request.user.is_superuser

# @api_view(['GET'])
# @permission_classes([IsAuthenticated, IsAdminUser])
# def all_employers(request):
#     employers = CustomUser.objects.filter(role="employer").all()
#     all_employers = []
#     for employer in employers:
#         employerProfile = EmployerModel.objects.filter(user=employer).values("contact_number",
#                                                                              "id",
#                                                                              "org_name",
#                                                                              address=F("location"),
#                                                                              emailId=F("user__email"),
#                                                                              employer=F("user__username")).first()
#         all_employers.append(employerProfile)
#     return Response({"message": "All employers data sent.", "employers": all_employers}, status=status.HTTP_202_ACCEPTED)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated, IsAdminUser])
# def all_workers(request):
#     workers = CustomUser.objects.filter(role="worker").all()
#     all_workers = []
#     for worker in workers:
#         workerProfile = WorkerModel.objects.filter(user=worker).values("contact_number",
#                                                                         "id",
#                                                                         "address",
#                                                                         "skill",
#                                                                         "gender",
#                                                                         workerUsername=F("user__username"),
#                                                                         workerName=Concat(F("user__first_name"), Value(' '), F("user__last_name")))
#         all_workers.append(workerProfile)
#     return Response({"message": "All workers data sent.", "workers": all_workers}, status=status.HTTP_202_ACCEPTED)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated, IsAdminUser])
# def send_all_pending_reports(request):
#     reports = ReportWorkerModel.objects.filter(status="pending").all()
#     all_reports = []

#     for report in reports:
#         worker = report.worker
#         employer = report.employer
#         worker = WorkerModel.objects.filter(id=worker.id).first()
#         workerName = worker.user.username
#         employer = EmployerModel.objects.filter(id=employer.id).first()
#         employerName = employer.user.username
#         temp = {
#             "id": report.id,
#             "workerName": workerName,
#             "employerName": employerName,
#             "contact": worker.contact_number,
#             "reason": report.reason,
#             "message": report.message
#         }
#         all_reports.append(temp)
    
#     return Response({"message": "All pending reports sent.", "reports": all_reports}, status=status.HTTP_200_OK)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated, IsAdminUser])
# def send_all_resolved_reports(request):
#     reports = ReportWorkerModel.objects.filter(status="resolved").all()
#     all_reports = []
    
#     for report in reports:
#         worker = report.worker
#         employer = report.employer
#         worker = WorkerModel.objects.filter(id=worker.id).first()
#         workerName = worker.user.username
#         employer = EmployerModel.objects.filter(id=employer.id).first()
#         employerName = employer.user.username

#         resolved_complaint = ResolvedReportsModel.objects.filter(report=report).first()
        
#         temp = {
#             "id": report.id,
#             "workerName": workerName,
#             "employerName": employerName,
#             "contact": worker.contact_number,
#             "reason": report.reason,
#             "message": report.message,
#             "adminResponse": resolved_complaint.admin_message if resolved_complaint else "No response by admin."
#         }
#         all_reports.append(temp)
    
#     return Response({"message": "All resolved reports sent.", "reports":all_reports}, status=status.HTTP_200_OK)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated, IsAdminUser])
# def get_employer_data(request, username):
#     user = CustomUser.objects.filter(username=username).first()
#     employer = EmployerModel.objects.filter(user=user).values("org_name",
#                                                               "location",
#                                                               "contact_number",
#                                                               employerUsername=F("user__username"),
#                                                               employerEmail=F("user__email"))
    
#     emp = EmployerModel.objects.filter(user=user).first()
#     pending_reports = ReportWorkerModel.objects.filter(employer=emp, status="pending").all().count()
#     resolved_reports = ReportWorkerModel.objects.filter(employer=emp, status="resolved").all().count()
#     reports = {
#         "pending": pending_reports,
#         "resolved": resolved_reports,
#         "total": int(pending_reports) + int(resolved_reports)
#     }
#     return Response({"message": "All Employer Data sent", "employer": employer, "reports": reports}, status=status.HTTP_200_OK)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated, IsAdminUser])
# def get_worker_data(request, username):
#     user = CustomUser.objects.filter(username=username).first()
#     worker = WorkerModel.objects.filter(user=user).values("skill",
#                                                           "address",
#                                                           "gender",
#                                                           "contact_number",
#                                                           workerUsername=F("user__username"),
#                                                           workerName=Concat(F("user__first_name"), Value(' '), F("user__last_name")))
#     wor = WorkerModel.objects.filter(user=user).first()
#     pending_reports = ReportWorkerModel.objects.filter(worker=wor, status="pending").all().count()
#     resolved_reports = ReportWorkerModel.objects.filter(worker=wor, status="resolved").all().count()
#     reports = {
#         "pending": pending_reports,
#         "resolved": resolved_reports,
#         "total": int(pending_reports) + int(resolved_reports)
#     }
#     return Response({"message": "All Worker Data sent", "worker": worker, "reports": reports}, status=status.HTTP_200_OK)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated, IsAdminUser])
# def resolve_complaint(request):
#     report_id = request.data.get("id")
#     resolved_complaint = ResolvedReportsModel.objects.filter(report=report_id)
#     if resolved_complaint:
#         return Response({"message": "Report already resolved"}, status=status.HTTP_202_ACCEPTED)
    
#     pending_report = ReportWorkerModel.objects.filter(id=report_id).first()

#     if not pending_report:
#         return Response({"message": "No report found with this id"}, status=status.HTTP_404_NOT_FOUND)
    
#     response = request.data.get("response")
#     report = ResolvedReportsModel.objects.create(report=pending_report, admin_message=response)
#     pending_report.status = "resolved"
#     pending_report.save()
#     report.save()
#     return Response({"message": "Report resolved successfully"}, status=status.HTTP_202_ACCEPTED)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated, IsAdminUser])
# def filter_worker_by_employer_date(request, employer_id):
#     date_str = request.GET.get('date')
#     if not date_str:
#         return Response({"error": "Date parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
    
#     date = date_str.split("-")
#     year = date[0]
#     month = date[1]
#     day = date[2]
    
#     workers = WorkersWorkModel.objects.filter(date__day=day, date__month=month, date__year=year, employer__id=employer_id).all().values(
#         "date", "amount", "amount_given", workerUsername=F("worker__user__username")
#     )
#     return Response({"message": "Workers of Employer on particular day sent", "workers": workers}, status=status.HTTP_200_OK)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated, IsAdminUser])
# def filter_worker_work_by_date(request, worker_id):
#     date_str = request.GET.get('date')
#     if not date_str:
#         return Response({"error": "Date parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
    
#     date = date_str.split("-")
#     year = date[0]
#     month = date[1]
#     day = date[2]

#     worker = WorkersWorkModel.objects.filter(date__day=day, date__month=month, date__year=year, worker__id=worker_id).all().values(
#         "amount", "date", "attendance__shift", orgName=F("employer__org_name"), workerUsername=F("worker__user__username"), entryTime=F("attendance__entry_time"), leavingTime=F("attendance__leaving_time"),
#         overtimeEntryTime=F("attendance__overtime_entry_time"), overtimeLeavingTime=F("attendance__overtime_leaving_time")
#     )
#     return Response({"message": "Workers data on particular day sent", "worker": worker}, status=status.HTTP_200_OK)

# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated, IsAdminUser])
# def wage_authority_for_admin(request):
#     if request.method=="GET":
#         wage = HourWage.objects.last()
#         if not wage:
#             return Response({"error": "No wage history found"}, status=status.HTTP_404_NOT_FOUND)
#         hourly_wage = wage.hourly_wage
#         overtime_wage = wage.overtime_wage
#         return Response({"message": "Hour wages sent to Admin", "wages": {"hourWage": hourly_wage,
#                                                                           "overtimeWage": overtime_wage}}, status=status.HTTP_200_OK)

#     if request.method=="POST":
#         new_hour_wage = request.data.get("hourWage")
#         new_overtime_wage = request.data.get("overtimeWage")
        
#         if not new_hour_wage or not new_overtime_wage:
#             return Response({"error": "Didn't receive data"}, status=status.HTTP_400_BAD_REQUEST)
        
#         new_wage = HourWage.objects.create(hourly_wage=new_hour_wage, overtime_wage=new_overtime_wage)
#         new_wage.save()
#         return Response({"message": "Wage salary updated successfully"}, status=status.HTTP_200_OK)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated, IsAdminUser])
# def day_wise_stats(request):
#     time = int(request.GET.get("time", 1))
#     time_range = timezone.now() - timedelta(days=time)
#     data = WorkersWorkModel.objects.filter(date__gte=time_range)
#     stats = data.aggregate(
#         shift1_count=Count("id", filter=Q(attendance__shift="shift1")),
#         shift2_count=Count("id", filter=Q(attendance__shift="shift2")),
#         overtime_count=Count("id", filter=Q(attendance__overtime=True)),
#     )
#     return Response({"message": "Day wise stats sent to Admin", "stats": stats}, status=status.HTTP_200_OK)

# class AdminTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#         token['role'] = user.role
#         return token

# class AdminLoginView(TokenObtainPairView):
#     serializer_class = AdminTokenObtainPairSerializer

#     def post(self, request, *args, **kwargs):
#         username = request.data.get("username")
#         password = request.data.get("password")

#         user = CustomUser.objects.filter(username=username).first()

#         if user is None:
#             return Response({"message": "Invalid Credentials"}, status=status.HTTP_404_NOT_FOUND)
        
#         if not user.is_superuser:
#             return Response({"message": "You are not authorized to access this page."}, status=status.HTTP_401_UNAUTHORIZED)
        
#         if not user.check_password(password):
#             return Response({"message": "Invalid Credentials"}, status=status.HTTP_404_NOT_FOUND)
        
#         serializer = self.get_serializer(data=request.data)
#         try:
#             serializer.is_valid(raise_exception=True)
#         except Exception as e:
#             return Response({"message": "Invalid Credentials", "detail": str(e)}, status=status.HTTP_401_UNAUTHORIZED)

#         return Response(serializer.validated_data, status=status.HTTP_200_OK)



from django.shortcuts import render
from django.contrib.auth import get_user_model

from Worker.models import ReportWorkerModel, HourWage
from Users.models import CustomUser, EmployerModel, WorkerModel
from Employer.models import WorkersWorkModel
from .models import ResolvedReportsModel

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, BasePermission, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.db.models import F, Value, Count, Q
from django.db.models.functions import Concat
from datetime import timedelta
from django.utils import timezone

User = get_user_model()

# -------------------------------------------------------------------
# Permissions
# -------------------------------------------------------------------

class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.is_superuser
        )

# -------------------------------------------------------------------
# Admin APIs
# -------------------------------------------------------------------

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def all_employers(request):
    employers = CustomUser.objects.filter(role="employer")
    data = []

    for employer in employers:
        profile = EmployerModel.objects.filter(user=employer).values(
            "id",
            "org_name",
            "contact_number",
            address=F("location"),
            email=F("user__email"),
            username=F("user__username"),
        ).first()

        if profile:
            data.append(profile)

    return Response(
        {"message": "All employers data sent.", "employers": data},
        status=status.HTTP_200_OK
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def all_workers(request):
    workers = CustomUser.objects.filter(role="worker")
    data = []

    for worker in workers:
        profile = WorkerModel.objects.filter(user=worker).values(
            "id",
            "contact_number",
            "address",
            "skill",
            "gender",
            username=F("user__username"),
            name=Concat(F("user__first_name"), Value(" "), F("user__last_name")),
        ).first()

        if profile:
            data.append(profile)

    return Response(
        {"message": "All workers data sent.", "workers": data},
        status=status.HTTP_200_OK
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def send_all_pending_reports(request):
    reports = ReportWorkerModel.objects.filter(status="pending")
    data = []

    for r in reports:
        data.append({
            "id": r.id,
            "workerName": r.worker.user.username,
            "employerName": r.employer.user.username,
            "contact": r.worker.contact_number,
            "reason": r.reason,
            "message": r.message,
        })

    return Response(
        {"message": "All pending reports sent.", "reports": data},
        status=status.HTTP_200_OK
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def send_all_resolved_reports(request):
    reports = ReportWorkerModel.objects.filter(status="resolved")
    data = []

    for r in reports:
        resolved = ResolvedReportsModel.objects.filter(report=r).first()
        data.append({
            "id": r.id,
            "workerName": r.worker.user.username,
            "employerName": r.employer.user.username,
            "contact": r.worker.contact_number,
            "reason": r.reason,
            "message": r.message,
            "adminResponse": resolved.admin_message if resolved else None,
        })

    return Response(
        {"message": "All resolved reports sent.", "reports": data},
        status=status.HTTP_200_OK
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def resolve_complaint(request):
    report_id = request.data.get("id")
    admin_msg = request.data.get("response")

    if not report_id or not admin_msg:
        return Response(
            {"error": "id and response are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if ResolvedReportsModel.objects.filter(report_id=report_id).exists():
        return Response(
            {"message": "Report already resolved"},
            status=status.HTTP_400_BAD_REQUEST
        )

    report = ReportWorkerModel.objects.filter(id=report_id).first()
    if not report:
        return Response(
            {"error": "Report not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    ResolvedReportsModel.objects.create(
        report=report,
        admin_message=admin_msg
    )

    report.status = "resolved"
    report.save()

    return Response(
        {"message": "Report resolved successfully"},
        status=status.HTTP_200_OK
    )


# -------------------------------------------------------------------
# TEMP DEV ONLY – REMOVE AFTER FIRST USE
# -------------------------------------------------------------------

@api_view(["POST"])
@permission_classes([AllowAny])
def create_initial_superuser(request):
    if User.objects.filter(is_superuser=True).exists():
        return Response(
            {"error": "Superuser already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    User.objects.create_superuser(
        username="admin",
        email="admin@example.com",
        password="Admin@123"
    )

    return Response(
        {"success": "Superuser created"},
        status=status.HTTP_201_CREATED
    )


# -------------------------------------------------------------------
# Employer / Worker detail
# -------------------------------------------------------------------

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def get_employer_data(request, username):
    user = CustomUser.objects.filter(username=username).first()
    if not user:
        return Response({"error": "Employer not found"}, status=404)

    employer = EmployerModel.objects.filter(user=user).values(
        "org_name",
        "location",
        "contact_number",
        username=F("user__username"),
        email=F("user__email"),
    ).first()

    if not employer:
        return Response({"error": "Employer profile not found"}, status=404)

    pending = ReportWorkerModel.objects.filter(
        employer__user=user, status="pending"
    ).count()
    resolved = ReportWorkerModel.objects.filter(
        employer__user=user, status="resolved"
    ).count()

    return Response(
        {
            "employer": employer,
            "reports": {
                "pending": pending,
                "resolved": resolved,
                "total": pending + resolved,
            },
        },
        status=status.HTTP_200_OK,
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def get_worker_data(request, username):
    user = CustomUser.objects.filter(username=username).first()
    if not user:
        return Response({"error": "Worker not found"}, status=404)

    worker = WorkerModel.objects.filter(user=user).values(
        "skill",
        "address",
        "gender",
        "contact_number",
        username=F("user__username"),
        name=Concat(F("user__first_name"), Value(" "), F("user__last_name")),
    ).first()

    if not worker:
        return Response({"error": "Worker profile not found"}, status=404)

    pending = ReportWorkerModel.objects.filter(
        worker__user=user, status="pending"
    ).count()
    resolved = ReportWorkerModel.objects.filter(
        worker__user=user, status="resolved"
    ).count()

    return Response(
        {
            "worker": worker,
            "reports": {
                "pending": pending,
                "resolved": resolved,
                "total": pending + resolved,
            },
        },
        status=status.HTTP_200_OK,
    )


# -------------------------------------------------------------------
# JWT LOGIN
# -------------------------------------------------------------------

class AdminTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["role"] = user.role
        return token


class AdminLoginView(TokenObtainPairView):
    serializer_class = AdminTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")

        user = CustomUser.objects.filter(username=username).first()

        if not user or not user.is_superuser or not user.check_password(password):
            return Response(
                {"message": "Invalid credentials or unauthorized"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def filter_worker_by_employer_date(request, employer_id):
    date_str = request.GET.get("date")
    if not date_str:
        return Response({"error": "date is required"}, status=400)

    year, month, day = date_str.split("-")

    workers = WorkersWorkModel.objects.filter(
        date__year=year,
        date__month=month,
        date__day=day,
        employer_id=employer_id
    ).values(
        "date",
        "amount",
        "amount_given",
        workerUsername=F("worker__user__username"),
    )

    return Response(
        {"message": "Workers fetched successfully", "workers": workers},
        status=200
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def filter_worker_work_by_date(request, worker_id):
    date_str = request.GET.get("date")
    if not date_str:
        return Response({"error": "date is required"}, status=400)

    year, month, day = date_str.split("-")

    work = WorkersWorkModel.objects.filter(
        date__year=year,
        date__month=month,
        date__day=day,
        worker_id=worker_id
    ).values(
        "amount",
        "date",
        "attendance__shift",
        orgName=F("employer__org_name"),
        workerUsername=F("worker__user__username"),
        entryTime=F("attendance__entry_time"),
        leavingTime=F("attendance__leaving_time"),
        overtimeEntryTime=F("attendance__overtime_entry_time"),
        overtimeLeavingTime=F("attendance__overtime_leaving_time"),
    )

    return Response(
        {"message": "Worker work fetched", "worker": work},
        status=200
    )


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def wage_authority_for_admin(request):
    if request.method == "GET":
        wage = HourWage.objects.last()
        if not wage:
            return Response({"error": "No wage found"}, status=404)

        return Response({
            "hourWage": wage.hourly_wage,
            "overtimeWage": wage.overtime_wage
        }, status=200)

    if request.method == "POST":
        hour = request.data.get("hourWage")
        overtime = request.data.get("overtimeWage")

        if not hour or not overtime:
            return Response({"error": "Invalid data"}, status=400)

        HourWage.objects.create(
            hourly_wage=hour,
            overtime_wage=overtime
        )

        return Response({"message": "Wage updated"}, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def day_wise_stats(request):
    days = int(request.GET.get("time", 1))
    from_date = timezone.now() - timedelta(days=days)

    stats = WorkersWorkModel.objects.filter(date__gte=from_date).aggregate(
        shift1=Count("id", filter=Q(attendance__shift="shift1")),
        shift2=Count("id", filter=Q(attendance__shift="shift2")),
        overtime=Count("id", filter=Q(attendance__overtime=True)),
    )

    return Response(
        {"message": "Stats fetched", "stats": stats},
        status=200
    )


@api_view(["GET"])
@permission_classes([AllowAny])  # TEMP
def debug_list_users(request):
    users = CustomUser.objects.all().values(
        "id", "username", "is_superuser", "is_staff", "role"
    )
    return Response(list(users))
