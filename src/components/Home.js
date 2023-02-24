import BlogList from "./BlogList";
import useFetch from "../useFetch";

const Home = () => {

    // custom hook

    const { data:blogs, setData:setBlogs ,isPending, error} = useFetch('http://localhost:8000/blogs');
    
    const handleDelete = (id) => {
        const newBlogs = blogs.filter((blog) => blog.id !== id);
        setBlogs(newBlogs);
    }

    return ( 
        <div className="home">
            { error && <div>{ error }</div> }
            {isPending && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs!"/>}
            {blogs && <BlogList blogs={blogs.filter((blog) => blog.author === "mario")} title="Mario's blogs!"/> }
        </div>
     );
}
 
export default Home;