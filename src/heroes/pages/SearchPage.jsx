import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm'
import { HeroCard } from '../components'
import querystring from 'query-string '
import { getHeroesByName } from '../helpers';

export const SearchPage = () => {
  const navigate = useNavigate();
  //para los parametros
  const location = useLocation();
  const { q = '' } = querystring.parse(location.search)

  const heroes = getHeroesByName(q);
  const showError = (q.length > 0 && heroes.length == 0) ? '' : 'none'

  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  const onSearchSubmit = (e) => {
    e.preventDefault();
    // if (searchText.trim().length <= 1) return;
    navigate(`?q=${searchText}`);


  };
  return (
    <>

      <h1>Search</h1>
      <hr />
      <div className="row search-container animate__animated animate__pulse">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-outline-warning mt-3">Search</button>
          </form>

        </div>
        <div className="col-7 search-card">
          <h4>Results</h4>
          <hr />
          
          

          {
            // (q === '') ? <div className="alert alert-primary">Search a hero</div> : (heroes.length === 0) && <div className="alert alert-danger">Not Results found with {q}</div>
          }
          
          <div className="alert alert-primary animate__animated animate__fadeIn" style={{display: (q !=='')? 'none': ''}}>Search a hero</div>
          <div className="alert alert-danger animate__animated animate__fadeIn" style={{display: showError}}>Not Results found with {q}</div>
          
          
          {
            heroes.map(hero => (
              <HeroCard key={hero.id} {...hero}/>
            ))
          }


        </div>
      </div>

    </>
  )
}
