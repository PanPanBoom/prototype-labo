import '../index.css';
import Tag from './Tag'

type SectionProps = {
    name: string;
    tags: string[];
}

const Section = (props: SectionProps) => {
    return (
        <section>
            <h3>{props.name}</h3>
            <ul className='inline-flex'>
                {props.tags.map((name, index) => <li key={index}><Tag name={name} color="gray"/></li>)}
            </ul>
        </section>
    )
}

export default Section