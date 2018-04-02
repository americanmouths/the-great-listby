# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

fscott = Author.create(name: "F. Scott Fitzgerald")
fiction = Genre.create(name: "Fiction")
new_book = Book.create(title: "The Great Gatsby", author: fscott, genre: fiction)

murakami = Author.create(name: "Haruki Murakami")
Book.create(title: "Kafka On The Shore", author: murakami, genre: fiction)
Book.create(title: "1Q84", author: murakami, genre: fiction)
Book.create(title: "The Wind Up Bird Chronicle", author: murakami, genre: fiction)
Book.create(title: "Norweigan Wood", author: murakami, genre: fiction)

bukowski = Author.create(name: "Charles Bukowski")
poetry = Genre.create(name: "Poetry")
Book.create(title: "Love Is A Dog From Hell", author: bukowski, genre: poetry)
Book.create(title: "Burning in Water, Drowning in Flame", author: bukowski, genre: poetry)

steinbeck = Author.create(name: "John Steinbeck")
travel = Genre.create(name: "Travel")
Book.create(title: "The Grapes of Wrath", author: steinbeck, genre: fiction)
Book.create(title: "East of Eden", author: steinbeck, genre: fiction)
Book.create(title: "Cannery Row", author: steinbeck, genre: fiction)
Book.create(title: "Tortilla Flat", author: steinbeck, genre: fiction)
Book.create(title: "Travels with Charley", author: steinbeck, genre: travel)
