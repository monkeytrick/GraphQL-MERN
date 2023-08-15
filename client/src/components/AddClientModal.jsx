import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function AddClientModal() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        // Code below updates cache so that screen is kept up to date. No idea how
        update(cache, { data: { addClient } }) {
          const { clients } = cache.readQuery({ query: GET_CLIENTS });
    
          cache.writeQuery({
            query: GET_CLIENTS,
            data: { clients: [...clients, addClient] },
          });
        },
      });

    const onSubmit = (e) => {
        e.preventDefault()
        if(name === "" || email === "" || phone === "" ) {
            alert('Please fill in all fields')
        }
        addClient(name, email, phone)

        setName('');
        setEmail('');
        setPhone('');

    }



  return (
    <>
            {/* <!-- Button trigger modal --> */}
        <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#addClientModal">
        <div className="d-flex align-items-center">
            <FaUser className="icon"/>
            <div>Add Client</div>
        </div>
        </button>

        {/* <!-- Modal --> */}
        <div className="modal fade" id="addClientModal" role="dialog" aria-labelledby="addClientModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="addClientModalLabel">Add Client</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <form onSubmit={onSubmit} action="">
                    <div className="mb-3">
                        <label className="form-lable">Name</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-lable">Email</label>
                        <input type="text" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-lable">Phone</label>
                        <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                    <button className="btn btn-secondary" type="submit" data-bs-dismiss="modal">Submit</button>
                </form>
            </div>
            </div>
        </div>
        </div>
    
    </>
  )
}
