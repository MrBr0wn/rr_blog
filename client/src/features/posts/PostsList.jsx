import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { deletePost as deletePostService } from '../../services/postService'
import "../../assets/stylesheets/PostImage.css"

import SearchBar from "./SearchBar"
import usePostsData from "../../hooks/usePostsData"
import useURLSearchParam from "../../hooks/useURLSearchParam"

function PostsList() {
  const [posts, setPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useURLSearchParam("search")
  const {
    posts: fetchedPosts,
    loading,
    error
  } = usePostsData(debouncedSearchTerm); // Note the change here

  
  useEffect(() => {
    if (fetchedPosts) {
      setPosts(fetchedPosts); // Update the posts state once fetchedPosts is available
    }
  }, [fetchedPosts])
  console.log("Test")

  const deletePost = async (id) => {
    try {
      await deletePostService(id)
      setPosts(posts.filter((post) => post.id !== id))
    } catch (e) {
      console.error("Failed to delete the post: ", e)
    }
  }

  const handleImmediateSearchChange = (searchValue) => {
    setSearchTerm(searchValue)
  }

  const handleDebouncedSearchChange = (searchValue) => {
    setDebouncedSearchTerm(searchValue)
  }

  return (
    <div>
      <SearchBar
        value={searchTerm}
        onSearchChange={handleDebouncedSearchChange}
        onImmediateChange={handleImmediateSearchChange}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error loading posts.</p>}
      {posts.map((post) => (
        <div key={post.id} className="post-container">
          <h2>
            <Link to={`posts/${post.id}`}>
              {post.title}
            </Link>
          </h2>
          <div className="post-image-container">
            {post.image_url ? (
              <img src={post.image_url} alt={post.title} className="post-image" />
            ) : (
              <div className="post-image-stub" data-testid="post-image-stub" />
            )}
          </div>
          <div className="post-links">
            <Link to={`/posts/${post.id}/edit`}>Edit</Link>
            {" | "}
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostsList