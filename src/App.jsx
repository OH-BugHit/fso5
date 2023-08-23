import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import DisplayMessage from './components/DisplayMessage'
import Notification from './components/Notification'
import LogOrBlog from './components/LogOrBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notifyMessage, setNotifyMessage] = useState(
    {
      message: null,
      messageType: 'success'
    }
  )

  useEffect(() => {
    async function getAllBlogs() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getAllBlogs()
  }, [])

  useEffect(() => {
    const loggedUserSTRING = window.localStorage.getItem('loggedUser')
    if (loggedUserSTRING) {
      const user = JSON.parse(loggedUserSTRING)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exeption) {
      DisplayMessage(setNotifyMessage,
        {
          message: exeption.response.data.error,
          messageType: 'error'
        })
    }
  }

  const handleLogOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    try {
      const blog = await blogService.createBlog(
        user, newBlog
      )
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
      DisplayMessage(setNotifyMessage,
        {
          message: `a new blog "${newBlog.title}" by ${newBlog.author}, added`,
          messageType: 'success'
        })
    } catch (exeption) {
      DisplayMessage(setNotifyMessage,
        {
          message: exeption.response.data.error,
          messageType: 'error'
        })
    }
  }

  return (
    <div>
      <Notification message={notifyMessage}></Notification>
      <LogOrBlog
        handleLogin={handleLogin}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        user={user}
        blogs={blogs}
        handleLogOut={handleLogOut}
        handleAddBlog={handleAddBlog}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
      />
    </div>
  )
}

export default App