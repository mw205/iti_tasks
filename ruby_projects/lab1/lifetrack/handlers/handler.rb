# frozen_string_literal: true

# Handler is the abstract base class for all event observers in LifeTrack.
# Subclasses must implement the #handle(event) method.
class Handler
  def handle(event)
    raise NotImplementedError, "#{self.class} must implement #handle"
  end
end
