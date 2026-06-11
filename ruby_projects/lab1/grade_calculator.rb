# frozen_string_literal: true

# mini program that calculates
print('How many score do you want to enter? ')
score_nums = gets.chomp.to_i
scores = []
score_nums.times do  |i|
  print "grade #{i + 1} = "
  scores << gets.to_i
end

average = scores.sum.to_f / score_nums
grade = case average
        when 90..100 then 'A'
        when 80...90 then 'B'
        when 70...80 then 'C'
        when 60...70 then 'D'
        else 'F'
        end
puts 'Results:'
puts "\t Average: #{average}"
puts "\t Grade : #{grade}"
puts "\t Highest : #{scores.max}"
puts "\t Lowest : #{scores.min}"
