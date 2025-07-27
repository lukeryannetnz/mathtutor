class CreateAdditionEquations < ActiveRecord::Migration[8.0]
  def change
    create_table :addition_equations do |t|
      t.integer :operand1
      t.integer :operand2
      t.string :operator

      t.timestamps
    end
  end
end
