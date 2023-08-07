import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { GET_CLIENTS } from '../../queries/clientQueries'
import { DELTE_CLIENT } from '../../mutations/clientMutations';

export default function ClientRow( { client }) {
  //! Below function, deleteClient, does not work.
    const [deleteClient] = useMutation(DELTE_CLIENT, {
        variables: { id: client.id },
        refetchQueries: [{query: GET_CLIENTS}],
    });
  return (
    <tr>
        <td> { client.name } </td>
        <td> { client.email } </td>
        <td> { client.phone } </td>
        <td>
            {/* // Stuck here. Does not delete client */}
            <button className="btn btn-danger btn-sm" onClick={deleteClient}><FaTrash /></button>
        </td>
    </tr>
  )
}
