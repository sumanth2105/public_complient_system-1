from django.db import migrations


DEFAULT_CATEGORIES = [
    (
        "Roads and Potholes",
        "Damaged roads, potholes, broken footpaths, and unsafe streets.",
    ),
    (
        "Street Lights",
        "Broken, flickering, or missing public lights.",
    ),
    (
        "Electricity",
        "Power outages, exposed wires, damaged electric poles, and voltage issues.",
    ),
    (
        "Garbage and Sanitation",
        "Waste collection, overflowing bins, drainage, and cleanliness issues.",
    ),
    (
        "Water Supply",
        "Water leakage, shortage, contamination, or public tap issues.",
    ),
    (
        "Public Safety",
        "Unsafe public spaces, damaged public property, and urgent civic hazards.",
    ),
    (
        "Drainage and Sewage",
        "Blocked drains, sewage overflow, open manholes, and waterlogging.",
    ),
    (
        "Traffic and Parking",
        "Traffic signal issues, illegal parking, road signs, and traffic congestion.",
    ),
    (
        "Parks and Public Spaces",
        "Damaged park equipment, unclean public spaces, and maintenance issues.",
    ),
    (
        "Noise Pollution",
        "Excessive noise from public works, events, construction, or loudspeakers.",
    ),
    (
        "Animal Control",
        "Street animal concerns, animal safety issues, and related public hazards.",
    ),
]


def create_default_categories(apps, schema_editor):
    Category = apps.get_model("complaints", "Category")
    for name, description in DEFAULT_CATEGORIES:
        Category.objects.get_or_create(
            name=name,
            defaults={"description": description},
        )


def remove_default_categories(apps, schema_editor):
    Category = apps.get_model("complaints", "Category")
    Category.objects.filter(
        name__in=[name for name, description in DEFAULT_CATEGORIES]
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("complaints", "0002_complaint_latitude_complaint_longitude_and_more"),
    ]

    operations = [
        migrations.RunPython(create_default_categories, remove_default_categories),
    ]
