class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :rating
  belongs_to :user
  belongs_to :book, Serializer: BookReviewSerializer
end
