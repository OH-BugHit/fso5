import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {

  const [visible, setVisible] = useState('view')
  const [likes, setLikes] = useState(blog.likes)

  const handleButton = () => {
    if (visible === 'hide') {
      setVisible('view')
    } else {
      setVisible('hide')
    }
  }

  const handleLikeButton = () => {
    setLikes(likes + 1)
    blog.likes++
    blogService.addLike(user, blog)
  }

  const additionalInfo = (blog) => {
    if (visible === 'hide') {
      return (
        <div>
          {blog.url}
          <br />
          likes: {likes}
          <button onClick={handleLikeButton}>like</button>
          <br />
          {blog.user.name}
        </div>
      )
    }
    return null
  }

  return (
    <li>
      <div>
        {blog.title} {blog.author}
        <button onClick={handleButton}>{visible}</button>
        {additionalInfo(blog)}
      </div>
    </li>
  )
}

export default Blog