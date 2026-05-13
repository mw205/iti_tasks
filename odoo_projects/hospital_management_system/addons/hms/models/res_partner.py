from odoo import models, fields, api, _
from odoo.exceptions import ValidationError


class ResPartner(models.Model):
    _inherit = "res.partner"
    related_patient_id = fields.Many2one("hms.patient", string="Related Patient")

    @api.constrains("related_patient_id")
    def _check_email_unique_in_patients(self):
        for rec in self:
            patient = rec.related_patient_id
            if not patient or not patient.email:
                continue
            patient_email = patient.email.strip().lower()
            partners = self.env["res.partner"].search(
                [("id", "!=", rec.id), ("email", "!=", False)]
            )
            conflict = partners.filtered(
                lambda p: p.email and p.email.strip().lower() == patient_email
            )
            if conflict:
                raise ValidationError(
                    _(
                        "You cannot link this patient because the patient email is already used by another customer"
                    )
                )

    @api.constrains("customer_rank", "vat")
    def _check_vat_required_for_customers(self):
        for rec in self:
            if rec.customer_rank > 0 and not rec.vat:
                raise ValidationError(_("Tax ID is mandatory for customers"))

    def unlink(self):
        for rec in self:
            if rec.related_patient_id:
                raise ValidationError(
                    _("Can't delete the partner because it is related to a patient")
                )
        return super().unlink()
