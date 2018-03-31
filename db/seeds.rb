# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

new_author = Author.create(name: "F. Scott Fitzgerald")
new_genre = Genre.create(name: "Fiction")
new_book = Book.create(title: "The Great Gatsby", author: new_author, genre: new_genre)

stephenking = Author.create(name: "Stephen King")
horror = Genre.create(name: "Horror")
Book.create(title: "It", author: stephenking, genre: horror)
Book.create(title: "The Shining", author: stephenking, genre: horror)
Book.create(title: "The Stand", author: stephenking, genre: new_genre)
