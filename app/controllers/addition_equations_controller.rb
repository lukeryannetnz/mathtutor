class AdditionEquationsController < ApplicationController
  def index
    @addition_equation = AdditionEquation.random
  end

  def random
    @addition_equation = AdditionEquation.random
    respond_to do |format|
      format.turbo_stream { 
        render turbo_stream: turbo_stream.replace(
          "equation-container",
          partial: "equation",
          locals: { addition_equation: @addition_equation }
        )
      }
      format.html { render partial: 'equation', locals: { addition_equation: @addition_equation } }
    end
  end
end
