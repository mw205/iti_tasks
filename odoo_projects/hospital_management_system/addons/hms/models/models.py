from odoo import models, fields, api, _
from odoo.exceptions import ValidationError
from datetime import date

import re


class HmsPatient(models.Model):
    _name = "hms.patient"
    _description = "HMS Patient"

    first_name = fields.Char(string="First Name", required=True)
    last_name = fields.Char(string="Last Name", required=True)

    name = fields.Char(string="Name", compute="_compute_name", store=True)
    birth_date = fields.Date(string="Birth Date")
    history = fields.Html(string="History")
    cr_ratio = fields.Float(string="CR Ratio")

    blood_type = fields.Selection(
        [
            ("a+", "A+"),
            ("a-", "A-"),
            ("b+", "B+"),
            ("b-", "B-"),
            ("ab+", "AB+"),
            ("ab-", "AB-"),
            ("o+", "O+"),
            ("o-", "O-"),
        ],
        string="Blood Type",
    )

    pcr = fields.Boolean(string="PCR")
    image = fields.Image(string="Image")
    address = fields.Text(string="Address")

    age = fields.Integer(string="Age", compute="_compute_age", store=True)

    department_id = fields.Many2one(
        "hms.department",
        string="Department",
        domain=[("is_opened", "=", True)],
    )
    department_capacity = fields.Integer(
        related="department_id.capacity", string="Department Capacity"
    )
    doctor_ids = fields.Many2many("hms.doctor", string="Doctors")

    state = fields.Selection(
        [
            ("undetermined", "Undetermined"),
            ("good", "Good"),
            ("fair", "Fair"),
            ("serious", "Serious"),
        ],
        string="State",
        default="undetermined",
    )
    history_ids = fields.One2many(
        "hms.patient.history.log", "patient_id", string="Log History"
    )

    email = fields.Char(string="Email")

    @api.depends("first_name", "last_name")
    def _compute_name(self):
        for rec in self:
            rec.name = " ".join(
                part for part in [rec.first_name, rec.last_name] if part
            )

    @api.depends("birth_date")
    def _compute_age(self):
        for rec in self:
            if rec.birth_date:
                today = date.today()
                rec.age = (
                    today.year
                    - rec.birth_date.year
                    - (
                        (today.month, today.day)
                        < (rec.birth_date.month, rec.birth_date.day)
                    )
                )
            else:
                rec.age = 0

    @api.onchange("birth_date", "age")
    def _onchange_age(self):
        if 0 < self.age < 30 and not self.pcr:
            self.pcr = True
            return {
                "warning": {
                    "title": _("PCR Auto-checked"),
                    "message": _(
                        "The PCR field has been automatically checked because the patient is under 30."
                    ),
                }
            }

    @api.constrains("department_id")
    def _check_department_is_opened(self):
        for rec in self:
            if rec.department_id and not rec.department_id.is_opened:
                raise ValidationError(_("You cannot select a closed department."))

    @api.constrains("pcr", "cr_ratio")
    def _check_cr_ratio_required_when_pcr(self):
        for rec in self:
            if rec.pcr and (rec.cr_ratio is None or rec.cr_ratio <= 0.0):
                raise ValidationError(
                    _(
                        "CR Ratio must be set to a value greater than 0 when PCR is checked."
                    )
                )

    def write(self, vals):
        if "state" in vals:
            for record in self:
                self.env["hms.patient.history.log"].create(
                    {
                        "patient_id": record.id,
                        "description": f"State changed to {vals['state']}",
                    }
                )
        return super(HmsPatient, self).write(vals)

    _sql_constraints = [
        ("hms_patient_email_unique", "unique(email)", "Patient email must be unique!")
    ]

    @api.constrains("email")
    def _check_email_format(self):
        pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        for rec in self:
            if rec.email:
                email = rec.email.strip()
                if not re.match(pattern, email):
                    raise ValidationError(_("Please enter a valid email address"))


class HMSDepartment(models.Model):
    _name = "hms.department"
    _description = "HMS Department"

    name = fields.Char(string="Name", required=True)
    capacity = fields.Integer(string="Capacity")
    is_opened = fields.Boolean(string="Is Opened", default=True)
    patient_ids = fields.One2many("hms.patient", "department_id", string="Patients")


class HMSDoctor(models.Model):
    _name = "hms.doctor"
    _description = "HMS Doctor"
    _rec_name = "name"

    first_name = fields.Char(string="First Name", required=True)
    last_name = fields.Char(string="Last Name", required=True)
    image = fields.Image(string="Image")
    name = fields.Char(string="Name", compute="_compute_name", store=True)

    @api.depends("first_name", "last_name")
    def _compute_name(self):
        for rec in self:
            rec.name = " ".join(
                part for part in [rec.first_name, rec.last_name] if part
            )


class HMSPatientHistoryLog(models.Model):
    _name = "hms.patient.history.log"
    _description = "HMS Patient History Log"
    patient_id = fields.Many2one("hms.patient", string="Patient")
    description = fields.Char(string="Description")
