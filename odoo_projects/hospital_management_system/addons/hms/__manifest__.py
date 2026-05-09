# -*- coding: utf-8 -*-
{
    "name": "HMS",
    "summary": "Hospital Management System",
    "description": """
Hospital Management System
    """,
    "author": "Waleed",
    "category": "Healthcare",
    "version": "1.0",
    "depends": ["base"],
    "data": [
        "security/ir.model.access.csv",
        "views/patient_views.xml",
        "views/department_views.xml",
        "views/doctor_views.xml",
    ],
    "application": True,
    "installable": True,
}
