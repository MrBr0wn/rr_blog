import { useNavigate } from "react-router-dom"
import { createPost } from "../../services/postService"
import PostForm from "./PostForm"

function NewPostForm() {
  const navigate = useNavigate()
  
  const handleCreateSubmit = async (rawData) => {
    const formData = new FormData()
    formData.append("post[title]", rawData.title)
    formData.append("post[body]", rawData.body)
    formData.append("post[image]", rawData.image)
    try {
      const response = await createPost(formData)
      navigate(`/posts/${response.id}`)
    } catch (e) {
      console.error("Failed to create post: ", e)
    }
  }

  return (
   <PostForm
    headerText="Create a New Post"
    onSubmit={handleCreateSubmit}
    buttonText="Create Post"
   />
  )
}

export default NewPostForm