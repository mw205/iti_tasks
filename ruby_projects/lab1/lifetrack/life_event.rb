# frozen_string_literal: true

require 'securerandom'

# LifeEvent is a simple data class carrying attributes of a life tracking event.
# It has no knowledge of how events are formatted, stored, or routed.
class LifeEvent
  attr_reader :id, :type, :description, :duration, :created_at

  def initialize(type:, description:, duration: nil, id: nil, created_at: nil)
    @id = id || SecureRandom.uuid
    @type = type
    @description = description
    @duration = duration
    @created_at = created_at || Time.now
  end
end
