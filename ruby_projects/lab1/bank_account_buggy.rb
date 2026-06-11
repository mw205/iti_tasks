# frozen_string_literal: true

# =============================================================================
# Phase 2 — The AI Audit: Bank Account
#
# This script was "written by AI." It has exactly 5 mistakes:
#   - 2 syntax errors  (Ruby won't even run until these are fixed)
#   - 3 logic flaws    (Ruby runs but produces wrong results)
#
# Your job: find all 5, add a comment above each bug, then fix them.
# Use this format for your comments:
#   # BUG [n]: [what is wrong] → FIX: [what it should be]
# =============================================================================

class BankAccount
  attr_reader :balance, :owner

  def initialize(owner, initial_balance)
    @owner   = owner
    @balance = initial_balance
    @rate    = 0.05
  end

  def deposit(amount)
    if amount > 0
      # BUG [1]: [Logical error] → FIX: [deposit should increase the balance]
      @balance += amount
      puts "  New balance: $#{format('%.2f', @balance)}"
    else
      puts '  Error: Deposit amount must be positive.'
    end
  end

  def withdraw(amount)
    # BUG [2]: [logical error] → FIX: [validate the amount for withdrawal]
    if amount <= balance
      @balance -= amount
      puts "  New balance: $#{format('%.2f', @balance)}"
    else
      puts 'amount is insufficient'
    end
    # BUG [3]: [syntax error] → FIX: [function is not ended]
  end

  def apply_interest
    # BUG [4]: [logical error] → FIX: [balance was assigned with the rate of interest]
    @balance -= @balance * @rate
    puts "  New balance: $#{format('%.2f', @balance)}"
  end

  def display_info
    puts "Owner  : #{@owner}"
    # BUG [5]: [syntax error] → FIX: [correct the way the balance is formatted]
    puts "Balance: #{format('%.2f', @balance)}"
  end
end

# --- Script entry point ---

account = BankAccount.new('Alice', 1000)

puts '=== Account Info ==='
account.display_info
puts

puts 'Depositing $500...'
account.deposit(500)
puts

puts 'Withdrawing $200...'
account.withdraw(200)
puts

puts 'Applying 5% interest...'
account.apply_interest
puts

puts 'Attempting to overdraw $2000...'
account.withdraw(2000)
puts
account.display_info
