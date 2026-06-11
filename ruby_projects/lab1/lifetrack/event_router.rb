# frozen_string_literal: true

# EventRouter dispatches life tracking events to all registered handlers.
# It acts as the Subject/Publisher in the Observer pattern.
class EventRouter
  def initialize
    @handlers = []
  end

  def register(handler)
    @handlers << handler
  end

  def dispatch(event)
    @handlers.each do |handler|
      handler.handle(event)
    end
  end
end
