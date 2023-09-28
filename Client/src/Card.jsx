import "./Card.css"

export default function Card({ event }) {

   

    return (
        <>
            <div className="Card" >Date de {event.type}: {event.debut}
                <br></br>Adresse: {event.location}
                <br></br>Description: {event.titre}
                <br></br><a href={event.devis}>Voire devis</a>
            </div>
            

        </>
    )
}