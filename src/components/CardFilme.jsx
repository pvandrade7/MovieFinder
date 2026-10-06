
function CardFilme(props) {
    const posterURL = `https://image.tmdb.org/t/p/w500/${props.filme.poster_path}`
    return (
        <div className="w-48 cursor-pointer transition-transform hover:scale-105">
            
            {props.filme.poster_path ? (
              <img 
                src={posterURL} 
                alt={props.filme.title} 
                className="w-48 rounded-lg"/>
             ) : (
                <div className="w-full h-72 bg-gray-800 rounded-lg flex flex-items justify-center">
                    <p>Sem Poster</p>
                </div>
            )} 
            

            <h2 className="font-bold text-lg" mt-2>{props.filme.title}</h2>

            <div className="flex justify-between mt-1`">
                <p>{props.filme.release_date.slice(0, 4)}</p>
                <p>⭐️ {props.filme.vote_average.toFixed(1)}</p>
            </div>

        </div>
    );
}
export default CardFilme;