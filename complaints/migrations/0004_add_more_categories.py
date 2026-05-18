from django.db import migrations


ADDITIONAL_CATEGORIES = [
    (
        "Electricity",
        "Power outages, exposed wires, damaged electric poles, and voltage issues.",
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


def create_additional_categories(apps, schema_editor):
    Category = apps.get_model("complaints", "Category")
    for name, description in ADDITIONAL_CATEGORIES:
        Category.objects.get_or_create(
            name=name,
            defaults={"description": description},
        )


def remove_additional_categories(apps, schema_editor):
    Category = apps.get_model("complaints", "Category")
    Category.objects.filter(
        name__in=[name for name, description in ADDITIONAL_CATEGORIES]
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("complaints", "0003_seed_categories"),
    ]

    operations = [
        migrations.RunPython(
            create_additional_categories,
            remove_additional_categories,
        ),
    ]

