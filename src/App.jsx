import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import DisplayMessage from './components/DisplayMessage'
import Notification from './components/Notification'
import LogOrBlog from './components/LogOrBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
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
      console.log(blogs);
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

  const loginUser = async ({ username, password }) => {

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
    } catch (exeption) {
      DisplayMessage(setNotifyMessage,
        {
          message: exeption.response.data.error,
          messageType: 'error'
        })
    }
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
        loginUser={loginUser}
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