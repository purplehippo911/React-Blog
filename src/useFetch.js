import { useState, useEffect } from "react";

// this is a custom hook
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);


     // this function fires for every render and rerendering or based on when the state in the dependency (array) changes
     useEffect(() => {
        // this is for aborting when component that is using this data is unmounted
        const abortCont = new AbortController();

        setTimeout(() => {
             fetch(url, {signal:abortCont.signal})
             .then(res => {
                 if(!res.ok)
                     throw Error('Could not fetch the data for that rescourse')
                 return res.json()
             })
             .then((data) => {
                 setData(data);
                 setIsPending(false);
                 setError(null)
             })
             .catch((err) => {  
                if(err.name === 'AbortError')
                    console.log('fetch aborted')
                setError(err.message);
                setIsPending(false);
             })
        }, 1000);

        return () => abortCont.abort();
     }, [url]);

     return { data, setData, isPending, error };
};

export default useFetch;
