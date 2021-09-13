import React  from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getDetailCountry } from "../actions/index";
import { useDispatch , useSelector } from "react-redux";
import Activity from "./Activity";
import Loading from "./Loading"
import "./DetailCountry.css"

export default function DetailCountry (props){
    console.log(props)
    // const [loading, setLoading] = useState(false)
    const {id} = props.match.params;
    const dispatch = useDispatch()
    const country = useSelector ((state) => state.detailCountry)


    useEffect(() => {
      dispatch(getDetailCountry(id));
    }, [dispatch, id]);



return (
    <div >
      {country && country.id !== id ? (
       <Loading/>
      ) : (
        <div className="detailcountry">
         <div className="left">
          <h1>{country.name}</h1>
          <h2>({country.id})</h2>
          </div>
          <div className="center">
          <img src={country.flag} alt= "no hay imagen" width="350px" height="200px"/>
          </div>
          <div className="rigth">
          {country.capital ? <h2>Capital: {country.capital}</h2> : null}
          {country.subregion || country.continent ? <h3>Continent: {country.continent} ({country.subregion})</h3> : null}
           <h4> </h4> 
          <h3>Population: {new Intl.NumberFormat('es-ES').format(country.population)} hab.</h3>
          <h3>Area: {new Intl.NumberFormat('es-ES').format(country.area)} km2. </h3>
          </div>
          <h3>
            Activities:
            {country.activities && country.activities.length > 0
                ? country.activities.map((el) => (
                    <Activity
                      name={el.name}
                      duration={el.duration}
                      season={el.season}
                      difficulty={el.difficulty}
                    />
                  ))
                : "  no registered activities"}
          </h3>
        </div>
      ) 
        
      }
      <Link to="/countries">
        <button>Back</button>
      </Link>
    </div>
  );
}
