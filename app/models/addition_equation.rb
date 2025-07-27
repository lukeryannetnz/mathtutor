class AdditionEquation < ApplicationRecord
  validates :operand1, presence: true
  validates :operand2, presence: true
  validates :operator, presence: true

  def result
    operand1 + operand2 if operator == "+"
  end
end
