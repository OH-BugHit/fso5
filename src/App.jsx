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
  const [notifyMessage, setNotifyMessage] = useState(
    {
      message: null,
      messageType: 'success'
    }
  )

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

 

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      console.log(user);
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exeption) {
      DisplayMessage(setNotifyMessage,
        {
          message: 'wrong credentials',
          messageType: 'error'
        })
    }

  }

  return (
    <div>
      <Notification message={notifyMessage}></Notification>
      <h2>Login</h2>
      <LogOrBlog
      handleLogin = {handleLogin}
      username = {username}
      password = {password}
      setUsername = {setUsername}
      setPassword = {setPassword}
      user = {user}
      blogs = {blogs}
      />
    </div>
  )
}

export default App