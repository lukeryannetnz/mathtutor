require "application_system_test_case"

class AdditionEquationsSystemTest < ApplicationSystemTestCase
  test "math game UI renders with Tailwind classes" do
    visit additionequations_path
    assert_selector "h1.text-2xl.font-bold.text-center.my-8", text: "Math Game"
    assert_selector "#show-answer-btn", text: "Show Answer"
    click_button "Show Answer"
    assert_selector "form button.bg-gray-600.text-white", text: "New Equation"
  end
end 