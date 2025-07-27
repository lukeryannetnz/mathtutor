class AdditionEquation < ApplicationRecord
  validates :operand1, presence: true
  validates :operand2, presence: true
  validates :operator, presence: true

  def result
    operand1 + operand2 if operator == "+"
  end

  def self.random
    new(
      operand1: rand(1..10),
      operand2: rand(1..10),
      operator: "+"
    )
  end
end
