import { useState, useEffect } from "react"
import Events from "./Events";

export default function GetData(){

        const [data, setData] = useState([]);
    
        useEffect(() => {
            async function fetchData() {
                fetch("http://localhost:4000/events")
                    .then((res) => res.json())
                    .then((data) => 
            
            {
                console.log(data.events.length)
                setData(data.events)    
            });
            }
            fetchData();
        },[]);         
    

    return data && <Events data={data}></Events>
}
