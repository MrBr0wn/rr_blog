import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { fetchAllPosts, deletePost as deletePostService } from '../../services/postService'

function PostsList() {
  const [posts, setPosts] = useState([])
  const [, setLoading] = useState(true)
  const [, setError] = useState(null)
  
  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchAllPosts()
        setPosts(data)
        setLoading(false)
      } catch (e) {
        setError(e)
        setLoading(false)
        console.error("Failed to fetch posts: ", e)
      }
    }
    loadPosts()
  }, [])

  const deletePost = async (id) => {
    try {
      await deletePostService(id)
      setPosts(posts.filter((post) => post.id !== id))
    } catch (e) {
      console.error("Failed to delete the post: ", e)
    }
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post-container">
          <h2>
            <Link to={`posts/${post.id}`}>
              {post.title}
            </Link>
          </h2>
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