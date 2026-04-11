import re


class CustomValidators:
    NAME_PATTERN = r"^[A-Za-z]{2,25}( [A-Za-z]{2,25})?$"

    @staticmethod
    def validate_length(
        value: str,
        validator_class: type[Exception],
        label: str,
        min_length: int = 3,
        max_length: int = 255,
    ):
        if len(value) > max_length:
            raise validator_class(f"{label} must be less than {max_length} characters")
        if len(value) < min_length:
            raise validator_class(f"{label} must be more than {min_length} characters")
        return value

    @classmethod
    def name_validator(
        cls,
        name: str,
        validator_class: type[Exception],
        label: str = "Name",
        validate_format: bool = False,
    ):
        if validate_format and not re.fullmatch(cls.NAME_PATTERN, name):
            raise validator_class("Invalid name")
        return cls.validate_length(name, validator_class=validator_class, label=label)

    @staticmethod
    def bio_validator(
        bio: str,
        validator_class: type[Exception],
        label: str = "Bio",
        max_length: int = 1000,
    ):
        if len(bio) > max_length:
            raise validator_class(f"{label} must be less than {max_length} characters")
        return bio

    @staticmethod
    def image_size_validator(
        image,
        validator_class: type[Exception],
        max_size_mb: int = 2,
    ):
        if image and image.size > max_size_mb * 1024 * 1024:
            raise validator_class(f"Image file too large ( > {max_size_mb}MB )")
        return image

    @staticmethod
    def non_negative_validator(value, validator_class: type[Exception], label: str):
        if value < 0:
            raise validator_class(f"{label} must be greater than 0")
        return value
