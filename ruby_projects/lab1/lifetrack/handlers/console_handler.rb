# frozen_string_literal: true

require_relative 'handler'

# ConsoleHandler is an observer that formats and prints events to the terminal console.
class ConsoleHandler < Handler
  def handle(event)
    timestamp = event.created_at.strftime('%Y-%m-%d %H:%M')
    type_str = event.type.to_s.upcase
    duration_str = if event.duration
                     formatted_duration = (event.duration % 1 == 0) ? event.duration.to_i : event.duration
                     " (#{formatted_duration} min)"
                   else
                     ''
                   end

    puts "[#{timestamp}] #{type_str} — #{event.description}#{duration_str}"
  end
end
