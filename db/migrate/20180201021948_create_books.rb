class CreateBooks < ActiveRecord::Migration[5.1]
  def change
    create_table :books do |t|
      t.string :title
      t.text :blurb
      t.datetime :date_started
      t.datetime :date_completed
      t.integer :author_id
      t.integer :genre_id

      t.timestamps
    end
  end
end
