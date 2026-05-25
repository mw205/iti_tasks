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
    "depends": ["base", "crm"],
    "data": [
        "security/hms_groups.xml",
        "security/ir.model.access.csv",
        "security/record_rules.xml",
        "views/patient_views.xml",
        "views/department_views.xml",
        "views/doctor_views.xml",
        "views/res_partner_views.xml",
        "reports/patient_status_report.xml",
        "reports/report.xml",
    ],
    "application": True,
    "installable": True,
}
