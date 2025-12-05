import Section from "../components/Section"
import '../index.css';
import OpenAI from "openai";
import AIForm from "../components/AIForm";
import { useEffect, useState } from "react";

const UserData = [
    {
        "competences": [
            "Python",
            "Java",
            "React",
            "Javascript",
            "Base de données",
            "DevOps"
        ],
        "formations": [
            'DUT Informatique',
            "Bac S",
            "Bachelor Dev Full Stack"
        ],
        "experiences": [
            "Alternant développeur full stack pendant 1 an"
        ],
        "languages": [
            "Français",
            "Anglais"
        ]
    },

    {
        "competences": [
            "Marketing digital",
            "SEO/SEA",
            "Réseaux sociaux",
            "Emailing",
            "Création de contenus",
            "Analyse de données marketing"
        ],
        "formations": [
            "BTS Communication",
            "Licence Marketing",
            "Master Marketing Digital"
        ],
        "experiences": [
            "Stage en agence de communication pendant 6 mois",
            "Chargé de projet marketing junior pendant 1 an"
        ],
        "languages": [
            "Français",
            "Anglais",
            "Espagnol"
        ]
    }
];

const client = new OpenAI({
    baseURL: "https://router.huggingface.co/v1",
    apiKey: "<api-key>",
    dangerouslyAllowBrowser: true
  });

const User = () => {
    const [output, setOutput] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [currentCompetences, setCurrentCompetences] = useState([]);
    const [currentFormations, setCurrentFormations] = useState([]);
    const [currentExperiences, setCurrentExperiences] = useState([]);
    const [currentLanguages, setCurrentLanguages] = useState([]);
    const [currentData, setCurrentData] = useState(0);

    useEffect(() => {
        setCurrentCompetences(UserData[currentData].competences);
        setCurrentFormations(UserData[currentData].formations);
        setCurrentExperiences(UserData[currentData].experiences);
        setCurrentLanguages(UserData[currentData].languages);
    }, [])

    const launchAIform = async () => {
        setLoading(true);

        const res = await fetch("/prompt.txt");
        const text = await res.text();

        const prompt = text + "\n- Compétences : " + currentCompetences.map((tag) => tag) + "\n- Formations : " + currentFormations.map((tag) => tag) + "\n- Expériences professionnelles : " + currentExperiences.map((tag) => tag) + "\n- Langues : " + currentLanguages.map((tag) => tag);

        const chatCompletion = await client.chat.completions.create({
            model: "MiniMaxAI/MiniMax-M2:novita",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        setOutput(JSON.parse(chatCompletion.choices[0].message.content?.split("</think>")[1]!));
        setLoading(false);
    }

    const onSubmit = (newTags: {}) => {
        console.log(newTags);
        setCurrentCompetences([...currentCompetences, ...newTags.competences]);
        setCurrentFormations([...currentFormations, ...newTags.formations]);
        setCurrentExperiences([...currentExperiences, ...newTags.experiences]);
        setCurrentLanguages([...currentLanguages, ...newTags.languages]);
        setOutput(null);
    }

    const changeData = () => {
        setCurrentData(currentData >= 1 ? 0 : 1);
        setCurrentCompetences(UserData[currentData].competences);
        setCurrentFormations(UserData[currentData].formations);
        setCurrentExperiences(UserData[currentData].experiences);
        setCurrentLanguages(UserData[currentData].languages);
        console.log(currentData);
    }

    return (
        <div className="py-2">
            <button onClick={changeData}>Changer de data</button>
            <button onClick={launchAIform}>{isLoading ? "Création du formulaire..." : "Générer un formulaire personnalisé"}</button>
            { output && <AIForm data={output} onSubmit={onSubmit}/>}
            <h1>Profil de Jean DUPONT</h1>
            <div>
                <Section name="Compétences" tags={currentCompetences}/>
                <Section name="Formations" tags={currentFormations}/>
                <Section name="Expériences professionnelles" tags={currentExperiences}/>
                <Section name="Langues" tags={currentLanguages}/>
            </div>
        </div>
    )
}

export default User