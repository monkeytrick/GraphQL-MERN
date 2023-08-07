import Header from "./components/assets/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Clients from "./components/assets/Clients";
import AddClientModal from "./components/assets/AddClientModal";

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <Header/>
        <div className="container">
          <AddClientModal />
          <Clients />
        </div>
    </ApolloProvider>
    </>
  );
}

export default App;
