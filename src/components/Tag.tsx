type TagProps = {
    name: string;
    color: string;
}

const Tag = (props: TagProps) => {
    const className = "mx-2 my-3 px-4 py-2 bg-gray-500 rounded-lg";

    return (
        <article className={className}>
            <h4>{props.name}</h4>
        </article>
    )
}

export default Tag;