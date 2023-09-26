import Card from "./Card"

export default function Events({data}){

    data.map((e) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        e.devis = e.attachments[0].fileUrl;
        e.debut = new Date(e.start.dateTime).toLocaleDateString('fr-FR', options)
        e.fin = new Date(e.end.dateTime).toLocaleDateString('fr-FR', options);
        e.titre = e.description.split("Adresse")[0];

    })
    return (
        <>
        {data.map((e) => <Card key={e.id} event={e}></Card>)}
        </>
    )
}