// UseParams allows id in URL param to be retrieved
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: {id} }) 
  if (loading) return Spinner;
  if (error) return <p>Something went wrong</p>
  return (
    <>
      {!loading && !error && (
        // Error! Requesting all projects instead of one 2:29 in vid
        <div className="mx-auto w-75 card p-5">
          <Link  to="/" className="btn btn-sm w-25 d-inline ms-auto">Back</Link>
          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>
          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{data.project.status}</p>
          
          {/* !Client info not being displayed. Probably due to Graphql issue */}
          <ClientInfo client={data.project.client} />
          <DeleteProjectButton ProjectId={data.project.id}/>
        </div>
      )}
    </>
  )
}
