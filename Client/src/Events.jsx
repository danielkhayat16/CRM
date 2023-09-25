export default function Events({data}){
    return (
        <>
        {data.map((e) => <div key={e.id}>{e.description}</div>)}
        </>
    )
}