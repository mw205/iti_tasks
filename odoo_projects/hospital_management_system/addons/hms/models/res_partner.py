from odoo import models, fields, api, _
from odoo.exceptions import ValidationError


class ResPartner(models.Model):
    _inherit = "res.partner"
    related_patient_id = fields.Many2one("hms.patient", string="Related Patient")

    @api.constrains("related_patient_id")
    def _check_email_unique_in_patients(self):
        for record in self:
            if not record.related_patient_id or not record.email:
                continue

            duplicate = self.search(
                [
                    ("id", "!=", record.id),
                    ("email", "=", record.email),
                    ("related_patient_id", "!=", False),
                ],
                limit=1,
            )

            if duplicate:
                raise ValidationError(
                    _("This email is already linked to another patient.")
                )

    def unlink(self):
        for rec in self:
            if rec.related_patient_id:
                raise ValidationError(
                    _("Can't delete the partner because it is related to a patient")
                )
        return super().unlink()
