import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { API_URL } from '../../constants'

function PostsList() {
  const [posts, setPosts] = useState([])
  const [, setLoading] = useState(true)
  const [, setError] = useState(null)
  
  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch(API_URL)

        if (response.ok) {
          const json = await response.json()
          setPosts(json)
        } else {
          throw response
        }
      } catch (e) {
        setError("An error occurred. Awkward...")
        console.log("An error occurred: ", e)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  const deletePost = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      })

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id))
      } else {
        throw response
      }
    } catch (e) {
      console.error("An error occurred: ", e)
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