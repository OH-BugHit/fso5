import { useState } from "react"

const Blog = ({ blog }) => {

  const [visible, setVisible] = useState('view')

  const handleButton = () => {
    if (visible === 'hide') {
      setVisible('view')
    } else {
      setVisible('hide')
    }
  }

  const handleLikeButton = () => {
    return null
  }

  const additionalInfo = (blog) => {
    if (visible === 'hide') {
      return (
        <div>
          {blog.url}
          <br />
          likes: {blog.likes}
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