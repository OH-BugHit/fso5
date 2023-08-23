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

const renderBlogs = ({ blogs, user, handleLogOut, handleAddBlog, title, author, url, setTitle, setAuthor, setUrl, createBlogRef }) => {

    return (
        <div>
            <h2>blogs</h2>
            <p>{user.name} logged in
                <button className='logoutButton' onClick={handleLogOut}>logout</button> </p>
            <Togglable buttonLabel='new blog' ref={createBlogRef}>
                <CreateBlog
                    handleAddBlog={handleAddBlog}
                    title={title}
                    author={author}
                    url={url}
                    setTitle={setTitle}
                    setAuthor={setAuthor}
                    setUrl={setUrl}
                />
            </Togglable>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}

        </div>
    )
}

const LogOrBlog = ({ handleLogin, username, password, setUsername, setPassword, user, blogs, handleLogOut, handleAddBlog, title, author, url, setTitle, setAuthor, setUrl, createBlogRef }) => {
    if (user === null) {
        return renderLogin({ handleLogin, username, password, setUsername, setPassword })
    } else {
        return renderBlogs({ blogs, user, handleLogOut, handleAddBlog, title, author, url, setTitle, setAuthor, setUrl, createBlogRef })
    }
}

export default LogOrBlog