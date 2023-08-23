const CreateBlog = ({ handleAddBlog, title, author, url, setTitle, setAuthor, setUrl }) => {
    return (<div>
        <h2>create new</h2>

        <form onSubmit={handleAddBlog}>
            <div>
                title:
                <input
                    type="text"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author:
                <input
                    type="text"
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                />

            </div>
            <div>
                url:
                <input
                    type="text"
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <div>
                <button className='createButton' type='submit'>create</button>
            </div>
        </form>
    </div>
    )
}

export default CreateBlog