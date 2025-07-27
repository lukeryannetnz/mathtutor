require "test_helper"

class AdditionEquationTest < ActiveSupport::TestCase
  test "addition equation" do
    addition_equation = AdditionEquation.new(operand1: 1, operand2: 2, operator: "+")
    assert_equal 3, addition_equation.result

    addition_equation = AdditionEquation.new(operand1: 9, operand2: 9, operator: "+")
    assert_equal 18, addition_equation.result
  end

  test "random addition equation" do
    addition_equation = AdditionEquation.random
    assert_not_nil addition_equation.operand1
    assert_not_nil addition_equation.operand2
    assert_equal "+", addition_equation.operator
  end
end
