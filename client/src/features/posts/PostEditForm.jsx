import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { fetchPost, updatePost } from "../../services/postService"
import PostForm from "./PostForm"
import { objectToFormData } from "../../utils/formDataHelper"

function PostEditForm() {
  const [post, setPost] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const json = await fetchPost(id)  
        setPost(json)
      } catch (e) {
        console.error("Failed to fetch the post: ", e);
      }
    }
    fetchCurrentPost()
  }, [id])

  const handleEditSubmit = async (rawData) => {
    const sanitizedData = {
      title: rawData.title,
      body: rawData.body,
      image: rawData.image
    }

    const formData = objectToFormData({ post: sanitizedData })
    try {
      await updatePost(id, formData);
      navigate(`/posts/${id}`);
    } catch (e) {
      console.error("Failed to update the post: ", e)
    }
  }

  if (!post) return <h2>Loading...</h2>
  
  return (
    <PostForm
    post={post}
    headerText="Edit Post"
    onSubmit={handleEditSubmit}
    buttonText="Save"
   />
  )
}

export default PostEditForm