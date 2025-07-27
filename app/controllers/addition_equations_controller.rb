class AdditionEquationsController < ApplicationController
  def index
    @addition_equations = AdditionEquation.all
  end
end
