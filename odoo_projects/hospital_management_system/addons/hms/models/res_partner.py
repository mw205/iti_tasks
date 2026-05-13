from odoo import models, fields, api, _
from odoo.exceptions import ValidationError


class ResPartner(models.Model):
    _inherit = "res.partner"
    related_patient_id = fields.Many2one("hms.patient", string="Related Patient")

    @api.constrains("related_patient_id")
    def _check_email_unique_in_patients(self):
        for rec in self:
            if rec.related_patient_id and rec.email:
                existing_customer = self.search(
                    [
                        ("id", "!=", rec.id),
                        ("email", "=", rec.related_patient_id.email),
                    ],
                    limit=1,
                )
                if existing_customer:
                    raise ValidationError(
                        _("Patient email is already assigned to another customer")
                    )

    def unlink(self):
        for rec in self:
            if rec.related_patient_id:
                raise ValidationError(
                    _("Can't delete the partner because it is related to a patient")
                )
        return super().unlink()
