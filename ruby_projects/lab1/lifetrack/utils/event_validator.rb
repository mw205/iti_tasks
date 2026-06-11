# frozen_string_literal: true

module Utils
  # EventValidator validates input parameters before event creation or routing.
  class EventValidator
    VALID_TYPES = %w[work study exercise meal].freeze

    class ValidationError < ArgumentError; end

    # Validates raw parameters and raises ValidationError if constraints are violated.
    def self.validate!(type:, description:, duration: nil)
      validate_type!(type)
      validate_description!(description)
      validate_duration!(duration)
      true
    end

    def self.validate_type!(type)
      type_str = type.to_s.strip.downcase
      return if VALID_TYPES.include?(type_str)

      raise ValidationError, "Invalid event type: '#{type}'. Supported types are: #{VALID_TYPES.join(', ')}."
    end
    private_class_method :validate_type!

    def self.validate_description!(description)
      return unless description.nil? || description.to_s.strip.empty?

      raise ValidationError, 'Description is required and cannot be empty.'
    end
    private_class_method :validate_description!

    def self.validate_duration!(duration)
      return unless duration

      num_duration = parse_numeric_duration(duration)
      return if num_duration > 0

      raise ValidationError, "Duration must be a positive number (greater than 0), got #{duration}."
    end
    private_class_method :validate_duration!

    def self.parse_numeric_duration(duration)
      return duration if duration.is_a?(Numeric)

      Float(duration)
    rescue ArgumentError, TypeError
      raise ValidationError, "Duration must be a valid number, got '#{duration}'."
    end
    private_class_method :parse_numeric_duration
  end
end
