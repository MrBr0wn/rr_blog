class Api::V1::SearchController < ApplicationController
  def posts
    posts_per_page = 2
    query = params[:q]
    @posts = Post.where('title LIKE ? OR body LIKE ?', "%#{query}%", "%#{query}%")

    posts_with_images = paginate_posts(@posts, posts_per_page)
    total_posts_count = @posts.count

    render json: {
      posts: posts_with_images,
      total_count: total_posts_count,
      per_page: posts_per_page
    }
  end
end
