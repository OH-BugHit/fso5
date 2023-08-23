import { useState, useEffect, useRef } from 'react'
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
  const [notifyMessage, setNotifyMessage] = useState(
    {
      message: null,
      messageType: 'success'
    }
  )
  const createBlogRef = useRef()


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

  const createBlog = async (blogObj) => {
    createBlogRef.current.toggleVisibility()
    try {
      const blog = await blogService.createBlog(
        user, blogObj
      )
      setBlogs(blogs.concat(blog))
      DisplayMessage(setNotifyMessage,
        {
          message: `a new blog "${blogObj.title}" by ${blogObj.author}, added`,
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
        setUser={setUser}
        blogs={blogs}
        createBlog={createBlog}
        createBlogRef={createBlogRef}
      />
    </div>
  )
}

export default App