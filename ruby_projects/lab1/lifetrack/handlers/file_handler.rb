# frozen_string_literal: true

require 'json'
require_relative 'handler'

# FileHandler is an observer that appends serialized event details to a log file.
class FileHandler < Handler
  attr_reader :file_path

  def initialize(file_path)
    super()
    @file_path = file_path
  end

  def handle(event)
    data = {
      id: event.id,
      type: event.type,
      description: event.description,
      duration: event.duration,
      created_at: event.created_at.to_s
    }

    File.open(@file_path, 'a') do |file|
      file.puts(JSON.dump(data))
    end
  end
end
