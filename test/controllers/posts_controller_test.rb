require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @post = posts(:one)
    @posts = Post.order(created_at: :desc)
  end

  test "should get index" do
    get api_v1_posts_path, as: :json
    assert_response :success
  end

  test "should get posts ordered by created_at" do
    get api_v1_posts_path, as: :json
    assert_equal @posts, assigns(:posts)
  end

  test "should create post" do
    assert_difference("Post.count") do
      post api_v1_posts_path, params: { post: { body: @post.body, title: @post.title } }, as: :json
    end

    assert_response :created
  end

  test "should show post" do
    get api_v1_post_path(@post), as: :json
    assert_response :success
  end

  test "should update post" do
    patch api_v1_post_path(@post), params: { post: { body: @post.body, title: @post.title } }, as: :json
    assert_response :success
  end

  test "should destroy post" do
    assert_difference("Post.count", -1) do
      delete api_v1_post_path(@post), as: :json
    end

    assert_response :no_content
  end
end
