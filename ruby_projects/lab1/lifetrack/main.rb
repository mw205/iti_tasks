# frozen_string_literal: true

# ==============================================================================
# LifeTrack CLI Entry Point
# ==============================================================================
# BONUS DESIGN NOTE:
# - A future SlackHandler would live in `handlers/slack_handler.rb`.
# - It would inherit from `Handler` and implement the `handle(event)` method.
# - To register it, only `main.rb` (this file) would be edited to register:
#   `router.register(SlackHandler.new)`
# - If `EventRouter` or the `Handler` base class needs to be modified to support
#   `SlackHandler`, the Open/Closed Principle (OCP) is being violated.
# ==============================================================================

require_relative 'life_event'
require_relative 'event_router'
require_relative 'handlers/console_handler'
require_relative 'handlers/file_handler'
require_relative 'handlers/html_dashboard_handler'
require_relative 'utils/event_validator'

# Wire the concrete handlers (only main.rb is allowed to reference concrete classes)
router = EventRouter.new
router.register(ConsoleHandler.new)
router.register(FileHandler.new('log.txt'))
router.register(HtmlDashboardHandler.new('log.txt', 'dashboard.html'))

CHOICE_TO_TYPE = {
  '1' => 'work',
  '2' => 'study',
  '3' => 'exercise',
  '4' => 'meal'
}.freeze

def prompt_description
  print 'Description: '
  gets&.chomp&.strip
end

def prompt_duration(type)
  if type == 'meal'
    print 'Duration (minutes, optional - press enter to skip): '
  else
    print 'Duration (minutes): '
  end
  gets&.chomp&.strip
end

def parse_duration(input)
  return nil if input.empty?

  if input.include?('.')
    Float(input)
  else
    Integer(input)
  end
rescue ArgumentError
  input # Pass through invalid strings to let EventValidator check them
end

def log_event(router, type, description, duration)
  Utils::EventValidator.validate!(
    type: type,
    description: description,
    duration: duration
  )

  event = LifeEvent.new(
    type: type,
    description: description,
    duration: duration
  )

  router.dispatch(event)
  puts '✓ Event logged.'
end

def handle_choice(router, type)
  description = prompt_description
  duration_input = prompt_duration(type)
  duration = parse_duration(duration_input)

  log_event(router, type, description, duration)
rescue Utils::EventValidator::ValidationError => e
  puts "❌ Validation Error: #{e.message}"
rescue ArgumentError => e
  puts "❌ Error: #{e.message}"
end

def print_menu
  puts "\n=== LifeTrack ==="
  puts '1. Log a work session'
  puts '2. Log a study session'
  puts '3. Log an exercise session'
  puts '4. Log a meal'
  puts '5. Exit'
  print "\nChoose an option: "
end

def run_menu(router)
  loop do
    print_menu
    choice = gets&.chomp&.strip
    break if choice == '5'

    type = CHOICE_TO_TYPE[choice]
    if type
      handle_choice(router, type)
    else
      puts 'Invalid option. Please choose 1-5.'
    end
  end
  puts 'Goodbye!'
end

# Start the menu loop if run directly
run_menu(router) if __FILE__ == $PROGRAM_NAME
