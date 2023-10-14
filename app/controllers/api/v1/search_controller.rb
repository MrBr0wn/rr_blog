class Api::V1::SearchController < ApplicationController
  def posts
    query = params[:q]
    @posts = Post.where('title LIKE ? OR body LIKE ?', "%#{query}%", "%#{query}%")

    posts_with_images = @posts.map do |post|
      if post.image.attached?
        post.as_json.merge(image_url: url_for(post.image))
      else
        post.as_json.merge(image_url: nil)
      end
    end

    render json: posts_with_images
  end
end
