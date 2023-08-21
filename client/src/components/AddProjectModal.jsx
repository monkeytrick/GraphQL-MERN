import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import { ADD_PROJECT } from "../mutations/projectMutations";

export default function AddClientModal() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('');
    const [clientId, setClientID] = useState('');
    const [status, setStatus] = useState('new');

    //Gets all clients for select drop down 
    const {error, loading, data } = useQuery(GET_CLIENTS);

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, clientId, status },
        update(cache, { data: { addProject } }) {
          const { projects } = cache.readQuery({ query: GET_PROJECTS });
          cache.writeQuery({
            query: GET_PROJECTS,
            data: { projects: [...projects, addProject] },
          });
        },
      });

    // const [addClient] = useMutation(ADD_CLIENT, {
    //     variables: { name, description, clientId },
    //     // Code below updates cache so that screen is kept up to date. No idea how
    //     update(cache, { data: { addClient } }) {
    //       const { clients } = cache.readQuery({ query: GET_CLIENTS });
    
    //       cache.writeQuery({
    //         query: GET_CLIENTS,
    //         data: { clients: [...clients, addClient] },
    //       });
    //     },
    //   });

    const onSubmit = (e) => {
        e.preventDefault()
        if(name  === "" || description === "" || status === "" ) {
            alert('Please fill in all fields')
        }

        addProject(name, description, clientId, status)

        setName('');
        setDescription('');
        setStatus('new');
        setClientID('');

    }

    if(loading) return null;
    if(error) return "Error with data";

  return (
    <>
    { !loading && !error && (
    
    <>
      {/* <!-- Button trigger modal --> */}
    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addPrjectModal">
        <div className="d-flex align-items-center">
            <FaList className="icon"/>
            <div>New Project</div>
        </div>
        </button>

        {/* <!-- Modal --> */}
        <div className="modal fade" id="addPrjectModal" role="dialog" aria-labelledby="addPrjectModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="addPrjectModalLabel">Add Project</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <form onSubmit={onSubmit} action="">
                <div className='mb-3'>
                      <label className='form-label'>Name</label>
                      <input type='text' className='form-control' id='name' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="new">Not Started</option>
                            <option value="progress">Started</option>
                            <option value="completed">Completed</option>    
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Client</label>
                        <select name="clientId" id="client" className="form-select" value={clientId.Id} onChange={(e) => setClientID(e.target.value)}>
                            <option value="">Select Client</option>
                            { data.clients.map((client) =>(
                                <option key={client.id} value={client.id}>{client.name}</option>
                            )) }
                        </select>
                    </div>
                    <button className="btn btn-primary" type="submit" data-bs-dismiss="modal">Submit</button>
                </form>
            </div>
            </div>
        </div>
        </div>   
    </>)}    
    </>
  )
}
