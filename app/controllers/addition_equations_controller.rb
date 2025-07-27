class AdditionEquationsController < ApplicationController
  def index
    @addition_equation = AdditionEquation.random
  end
end
