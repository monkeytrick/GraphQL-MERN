import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import ProjectCard from "./ProjectCard";

export default function Projects() {
    const { loading, error, data } = useQuery(GET_PROJECTS);

    if (error) return <p>Something wen wrong</p>;
    if (loading) return <Spinner />;

    return (
        <>
        { data.projects.length > 0 ? (
            <div className="row mt-4">
                { data.projects.map((project) => (
                    <ProjectCard key={project.id} project={project}/>
                ))}

            </div>
         ) : (
            <p>No projects</p>) 
        }      
    </>
    )
  
}
