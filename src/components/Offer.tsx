type OfferProps = {
    name: string;
    description: string;
    correspondingValue: number;
}

const Offer = (props: OfferProps) => {
    const color = (props.correspondingValue > 66 ? "bg-green-500" : "bg-orange-500")

    return (
        <article className="bg-white rounded-md text-black my-4">
            <div className="p-4">
                <h2 className="font-bold text-2xl">{props.name}</h2>
                <p>{props.description}</p>  
            </div>
            <div className={"h-3 rounded-md text-[0.625rem] " + color + " "} style={{ width: `${props.correspondingValue}%` }}>{props.correspondingValue}%</div>
        </article>
    )
}

export default Offer;