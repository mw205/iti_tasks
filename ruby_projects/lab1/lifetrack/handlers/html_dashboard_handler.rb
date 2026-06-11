# frozen_string_literal: true

require 'json'
require 'time'
require 'cgi'
require_relative 'handler'

# HtmlDashboardHandler is an observer that parses logged events and regenerates dashboard.html.
class HtmlDashboardHandler < Handler
  attr_reader :log_path, :dashboard_path

  def initialize(log_path, dashboard_path)
    super()
    @log_path = log_path
    @dashboard_path = dashboard_path
  end

  def handle(event)
    events = parse_log_file
    html_content = generate_html(events)
    File.write(@dashboard_path, html_content)
  end

  private

  def parse_log_file
    events = []
    return events unless File.exist?(@log_path)

    File.foreach(@log_path) do |line|
      next if line.strip.empty?

      begin
        events << JSON.parse(line, symbolize_names: true)
      rescue JSON::ParserError
        # Gracefully skip malformed JSON lines
      end
    end
    events
  end

  def get_emoji(type)
    case type.to_s.downcase
    when 'work' then '💼'
    when 'study' then '📚'
    when 'exercise' then '⚡'
    when 'meal' then '🍔'
    else '📝'
    end
  end

  def generate_event_html(ev)
    type = ev[:type].to_s.downcase
    emoji = get_emoji(type)
    duration_str = format_duration(ev[:duration])
    formatted_time = format_time(ev[:created_at])
    escaped_description = CGI.escapeHTML(ev[:description])

    <<-HTML
      <div class="event-card #{type}">
        <div class="event-info">
          <div class="event-icon">#{emoji}</div>
          <div class="event-details">
            <span class="event-tag">#{type}</span>
            <div class="event-description">#{escaped_description}</div>
          </div>
        </div>
        <div class="event-meta">
          #{duration_str}
          <span class="event-time">#{formatted_time}</span>
        </div>
      </div>
    HTML
  end

  def format_duration(duration)
    return '' unless duration

    duration_val = duration.to_f
    formatted = (duration_val % 1).zero? ? duration.to_i : duration
    "<span class='event-duration'>⏱ #{formatted} min</span>"
  end

  def format_time(created_at)
    Time.parse(created_at).strftime('%b %d, %Y at %I:%M %p')
  rescue
    created_at
  end

  def empty_state_html
    <<-HTML
      <div class="empty-state">
        <p>No activities logged yet.</p>
        <span>Use the CLI menu to log your first life event!</span>
      </div>
    HTML
  end

  def generate_html(events)
    events_list_html = if events.empty?
                         empty_state_html
                       else
                         events.reverse.map { |ev| generate_event_html(ev) }.join("\n")
                       end

    dashboard_template(events_list_html)
  end

  # rubocop:disable Metrics/MethodLength
  def dashboard_template(events_list_html)
    <<-HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LifeTrack Dashboard</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-primary: #0b0f19;
      --bg-secondary: #161e2e;
      --text-primary: #f3f4f6;
      --text-secondary: #9ca3af;
      --accent-work: #6366f1;
      --accent-study: #f59e0b;
      --accent-exercise: #10b981;
      --accent-meal: #ec4899;
    }

    body {
      font-family: 'Inter', sans-serif;
      background-color: var(--bg-primary);
      background-image: 
        radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.12) 0px, transparent 50%),
        radial-gradient(at 100% 100%, rgba(236, 72, 153, 0.12) 0px, transparent 50%);
      background-attachment: fixed;
      color: var(--text-primary);
      margin: 0;
      padding: 3rem 1.5rem;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .dashboard-container {
      width: 100%;
      max-width: 800px;
    }

    .header {
      text-align: center;
      margin-bottom: 4rem;
      animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .header h1 {
      font-size: 3rem;
      font-weight: 800;
      margin: 0 0 0.5rem 0;
      letter-spacing: -0.025em;
      background: linear-gradient(135deg, #a5b4fc, #ec4899);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .header p {
      color: var(--text-secondary);
      font-size: 1.15rem;
      margin: 0;
    }

    .event-list {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      width: 100%;
    }

    .event-card {
      background: rgba(22, 30, 46, 0.75);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 20px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
    }

    .event-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }

    .event-card.work::before { background-color: var(--accent-work); }
    .event-card.study::before { background-color: var(--accent-study); }
    .event-card.exercise::before { background-color: var(--accent-exercise); }
    .event-card.meal::before { background-color: var(--accent-meal); }

    .event-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 
                  0 0 1px 1px rgba(255, 255, 255, 0.1) inset;
      background: rgba(30, 41, 59, 0.85);
    }

    .event-info {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }

    .event-icon {
      font-size: 1.8rem;
      width: 54px;
      height: 54px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.06);
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .event-card:hover .event-icon {
      transform: scale(1.1) rotate(5deg);
    }

    .event-details {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .event-tag {
      width: fit-content;
      padding: 0.25rem 0.6rem;
      border-radius: 8px;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .work .event-tag { background: rgba(99, 102, 241, 0.15); color: #818cf8; border: 1px solid rgba(99, 102, 241, 0.2); }
    .study .event-tag { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.2); }
    .exercise .event-tag { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.2); }
    .meal .event-tag { background: rgba(236, 72, 153, 0.15); color: #f472b6; border: 1px solid rgba(236, 72, 153, 0.2); }

    .event-description {
      font-size: 1.15rem;
      font-weight: 600;
      color: var(--text-primary);
      letter-spacing: -0.01em;
    }

    .event-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.5rem;
    }

    .event-duration {
      font-size: 0.9rem;
      font-weight: 600;
      color: #f3f4f6;
      background: rgba(255, 255, 255, 0.05);
      padding: 0.35rem 0.75rem;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .event-time {
      color: var(--text-secondary);
      font-size: 0.8rem;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      background: rgba(22, 30, 46, 0.5);
      border-radius: 20px;
      border: 1px dashed rgba(255, 255, 255, 0.1);
      margin-top: 2rem;
    }

    .empty-state p {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
    }

    .empty-state span {
      color: var(--text-secondary);
      font-size: 0.95rem;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 640px) {
      .event-card {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
      .event-meta {
        align-items: flex-start;
        width: 100%;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        padding-top: 0.75rem;
      }
    }
  </style>
</head>
<body>
  <div class="dashboard-container">
    <div class="header">
      <h1>LifeTrack Dashboard</h1>
      <p>A beautifully visual record of your logged life activities</p>
    </div>
    <div class="event-list">
      #{events_list_html}
    </div>
  </div>
</body>
</html>
    HTML
  end
  # rubocop:enable Metrics/MethodLength
end
