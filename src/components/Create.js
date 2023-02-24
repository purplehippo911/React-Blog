import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Luigi');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };

        setIsPending(true);

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            setIsPending(false);
            history.push("/");
            
        }).catch(err => console.error(err))
    }

    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>

            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input 
                    type="text" 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Blog Body</label>
                <textarea 
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                >

                </textarea>

                <label>Blog author:</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e)}
                >
                    <option value="Mario">Mario</option>
                    <option value="Luigi">Luigi</option>
                    <option value="Thomas Shelby O.B.E">Thomas Shelby O.B.E</option>
                    <option value="Mary 'MJ' Jane">Mary 'MJ' Jane</option>
                    <option value="Professor Snape">Professor Snape</option>
                    <option value="Draco Malfoy">Draco Malfoy</option>
                    <option value="Attorney Woo-Young-Woo">Attorney Woo-Young-Woo</option>
                </select>

                { !isPending && <button> Add blog </button>}
                { isPending && <button disabled> Adding blog... </button>}
            </form>
        </div>
     );
}
 
export default Create;