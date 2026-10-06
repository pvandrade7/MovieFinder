import { useState, useEffect } from "react";
import CardFilme from "./components/CardFilme";

function App() {
  const [busca, setBusca] = useState('');
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const token = import.meta.env.VITE_TMDB_TOKEN;

  useEffect(() => {
    async function buscarPopulares() {
      const url = `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1`;
      const resposta = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const dados = await resposta.json();
      setFilmes(dados.results);
    }

    buscarPopulares();
  }, []);

  async function buscarFilme(event) {
    event.preventDefault();
    if (!busca) {
      alert("campo vazio");
      return;
    }
    
    setCarregando(true);

    const url = `https://api.themoviedb.org/3/search/movie?query=${busca}`;
    const resposta = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    
    const dados = await resposta.json();
    
    setFilmes(dados.results);
    console.log(dados);

    setCarregando(false);
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-3xl text-yellow-400 font-bold mb-6">Movie Finder</h1>

        <form className="flex gap-1 mb-8" onSubmit={buscarFilme}>

          <input
            type="text"
            placeholder="digite o nome de um filme"
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            className="bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-gray-200 duration-100">
            Buscar
          </button>

        </form>

        <div className="flex flex-wrap gap-6 justify-center">

          {
          carregando == true ? (
            <h1>Carregando filmes</h1>
          ) : 
          
          filmes.length === 0 ? (
            <h1 className="mt-3">Filme não encontrado</h1>
          ) :

          filmes.map((filme) => (

            <CardFilme key={filme.id} filme={filme}/>

          ))
          }
            
        </div>

      </div>

    </div>
  )
}
export default App;