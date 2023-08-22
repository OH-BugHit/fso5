import Blog from "./Blog"

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

const renderBlogs = ({ blogs, user, handleLogOut }) => {

    return (
        <div>
            <h2>blogs</h2>
            <p>{user.name} logged in
                <button className='logout' onClick={handleLogOut}>logout</button> </p>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

const LogOrBlog = ({ handleLogin, username, password, setUsername, setPassword, user, blogs, handleLogOut }) => {
    if (user === null) {
        return renderLogin({ handleLogin, username, password, setUsername, setPassword })
    } else {
        return renderBlogs({ blogs, user, handleLogOut })
    }
}

export default LogOrBlog