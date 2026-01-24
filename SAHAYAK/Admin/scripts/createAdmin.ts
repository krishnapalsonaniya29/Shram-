@api_view(["POST"])
@permission_classes([AllowAny])
def create_initial_superuser(request):
    if User.objects.filter(is_superuser=True).exists():
        return Response({"error": "Superuser already exists"}, status=400)

    User.objects.create_superuser(
        username="admin",
        email="admin@example.com",
        password="Admin@123"
    )
    return Response({"success": "Superuser created"}, status=201)
