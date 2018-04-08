class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :rating
end
