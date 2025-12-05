type OfferPageProps = {
    title: string;
    description: string;
    value: number;
}

const OfferPage = (props: OfferPageProps) => {
    return (
        <>
            <h1>{props.title}</h1>
            <p>{props.description}</p>

            <div>
                <div>
                    <h3>Avantages</h3>
                    <ul>
                        <li>Point 1</li>
                        <li>Point 1</li>
                        <li>Point 1</li>
                        <li>Point 1</li>
                    </ul>
                </div>
                <div>
                    <h3>Inconvenients</h3>
                    <ul>
                        <li>Point 1</li>
                        <li>Point 1</li>
                        <li>Point 1</li>
                        <li>Point 1</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default OfferPage;