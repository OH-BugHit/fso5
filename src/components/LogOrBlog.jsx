import Blog from "./Blog"
import CreateBlog from "./CreateBlog"
import Togglable from "./Togglable"

const renderLogin = ({ handleLogin, username, password, setUsername, setPassword }) => {

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

const renderBlogs = ({ blogs, user, setUser, createBlog, createBlogRef }) => {
    
    const handleLogOut = () => {
        window.localStorage.clear()
        setUser(null)
    }

    return (
        <div>
            <h2>blogs</h2>
            <p>{user.name} logged in
                <button className='logoutButton' onClick={handleLogOut}>logout</button> </p>
            <Togglable buttonLabel='new blog' ref={createBlogRef}>
                <CreateBlog
                    createBlog={createBlog}
                />
            </Togglable>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}

        </div>
    )
}

const LogOrBlog = ({ handleLogin, username, password, setUsername, setPassword, user, blogs, setUser, handleAddBlog, createBlog, createBlogRef }) => {
    if (user === null) {
        return renderLogin({ handleLogin, username, password, setUsername, setPassword })
    } else {
        return renderBlogs({ blogs, user, setUser, handleAddBlog, createBlog, createBlogRef })
    }
}

export default LogOrBlog