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

                let allData = [];
                let dataDebut = [];
                let dataFin = [];
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


                data.events.map((e, i) => {
                    dataDebut[i] = {debut: e.start.dateTime, titre: e.description.split("Adresse")[0], devis: e.attachments[0].fileUrl, location: e.location, ID: e.id, type : "Livraison"};;
                    dataFin[i] = {debut: e.end.dateTime, titre: e.description.split("Adresse")[0], devis: e.attachments[0].fileUrl, location: e.location, ID: e.id + 'f', type: "Reprise"}
                })
                
                allData = dataDebut.concat(dataFin);
                allData = allData.sort((a,b) => new Date(a.debut) - new Date(b.debut));
                allData.map((e) => {e.debut= new Date (e.debut).toLocaleDateString('fr-FR', options)})
                setData(allData); 
            });
            }
            fetchData();
        },[]);         
    

    return data && <Events data={data}></Events>
}
