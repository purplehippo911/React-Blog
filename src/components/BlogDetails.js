import { useParams, useHistory } from "react-router-dom";
import useFetch from "../useFetch";

const BlogDetails = () => {
    const { id } = useParams();
    const history = useHistory();
    const { data:blog ,isPending, error} = useFetch('http://localhost:8000/blogs/' + id);
    
    const handleClick = () => {
        fetch('http://localhost:8000/blogs/' + id, {
            method: 'DELETE',
        }).then(() => {
            history.push("/");
        }).catch(err => console.error(err))
    }

    return ( 

        <div className="blog-details">
            { isPending && <div>Loading...</div>}
            { error && <div>{ error }</div>}

            { blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <i>Written by { blog.author } </i>
                    <div> { blog.body } </div>
                    <button onClick={handleClick}>Delete Page</button>
                </article>
            )}

        </div>
     );
}
 
export default BlogDetails;