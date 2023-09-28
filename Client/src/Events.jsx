import Card from "./Card"

export default function Events({data}){

    
    return (
        <>
        {data.map((e) => <Card event={e} key={e.ID}></Card>)}
        </>
    )
}