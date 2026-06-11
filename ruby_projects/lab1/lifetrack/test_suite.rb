# frozen_string_literal: true

require_relative 'life_event'
require_relative 'event_router'
require_relative 'handlers/console_handler'
require_relative 'handlers/file_handler'
require_relative 'handlers/html_dashboard_handler'
require_relative 'utils/event_validator'

TEST_LOG = 'test_log.txt'
TEST_HTML = 'test_dashboard.html'

# Clean up past test files
File.delete(TEST_LOG) if File.exist?(TEST_LOG)
File.delete(TEST_HTML) if File.exist?(TEST_HTML)

puts '=== Running LifeTrack Architect Tests ==='

router = EventRouter.new
router.register(ConsoleHandler.new)
router.register(FileHandler.new(TEST_LOG))
router.register(HtmlDashboardHandler.new(TEST_LOG, TEST_HTML))

# Helper to log events programmatically
def log_event(router, type, description, duration)
  Utils::EventValidator.validate!(type: type, description: description, duration: duration)
  event = LifeEvent.new(type: type, description: description, duration: duration)
  router.dispatch(event)
  puts "✓ Successfully logged: #{type} - #{description}"
rescue StandardError => e
  puts "❌ Validation failed as expected for (#{type}, '#{description}', #{duration}): #{e.message}"
end

puts "\n--- Test Case 1: Valid Events ---"
log_event(router, 'work', 'Building event router in Ruby', 120)
log_event(router, 'study', 'Reviewing SOLID principles', 45)
log_event(router, 'exercise', 'Evening jogging', 30)
log_event(router, 'meal', 'Dinner with team members', nil) # Nil duration is allowed for meals

puts "\n--- Test Case 2: Validation Failures ---"
log_event(router, 'sleep', 'Eight hours of sleep', 480)      # Invalid type
log_event(router, 'work', '', 60)                            # Empty description
log_event(router, 'exercise', 'Pushups', -15)                # Negative duration
log_event(router, 'study', 'Anatomy study', 'invalid_num')   # Non-numeric duration

puts "\n--- Test Case 3: Verify File Output ---"
if File.exist?(TEST_LOG)
  lines = File.readlines(TEST_LOG)
  puts "Log file exists and has #{lines.length} lines."
  lines.each_with_index do |line, idx|
    puts "  Line #{idx + 1}: #{line.strip}"
  end
else
  puts '❌ Error: Log file does not exist!'
end

puts "\n--- Test Case 4: Verify HTML Output ---"
if File.exist?(TEST_HTML)
  html = File.read(TEST_HTML)
  puts "HTML dashboard generated successfully. Size: #{html.bytesize} bytes."

  # Check if all events exist in the HTML
  expected_keywords = ['Building event router in Ruby', 'Reviewing SOLID principles', 'Evening jogging',
                       'Dinner with team members']
  all_found = true
  expected_keywords.each do |kw|
    if html.include?(kw)
      puts "  Found in HTML: '#{kw}'"
    else
      puts "  ❌ Missing in HTML: '#{kw}'"
      all_found = false
    end
  end
  puts all_found ? '✓ HTML content verification passed!' : '❌ HTML content verification failed!'
else
  puts '❌ Error: HTML dashboard does not exist!'
end

# Clean up files
File.delete(TEST_LOG) if File.exist?(TEST_LOG)
File.delete(TEST_HTML) if File.exist?(TEST_HTML)
puts "\n=== Test Run Finished ==="
