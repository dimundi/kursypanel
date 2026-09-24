import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ShopProduct from './ShopProduct';
import FilterMenu from './FilterMenu';

const CourseShopList = () => {
  

  //get access token
  const token = sessionStorage.getItem('access_token');
  
  //get query parameters
  let { categoryId } = useParams();

  //define state variables
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [listIsEmpty, setListIsEmpty] = useState(false);
  const [items, setItems] = useState([]);

  //lista wszystkich obszarów tematycznych do dropdowna w menu filtrów
  const [areaTypes, setAreaTypes] = useState([]);

  //obsługujemy filtry
  let [cat, setCat] = useState(categoryId);
  let [areaTypeSelected, setAreaTypeSelected] = useState(0);
  let [courseTypeSelected, setCourseTypeSelected] = useState(0);
  
  function handleState(searchQuery) {
    console.log(searchQuery);
    setCat(searchQuery.cat);
    setAreaTypeSelected(searchQuery.area_type);
    setCourseTypeSelected(searchQuery.course_type);
  }



  useEffect(() => {

      fetch( process.env.REACT_APP_API_URL+"prod/"+cat+"/", {
      headers: {
        'Authorization': 'Bearer '+token,
      }})
        .then(res => res.json())
        .then(
          (result) => {
            
            if( ! result.hasOwnProperty('at') ) {
              setListIsEmpty(true);
              return;
            }

            setAreaTypes(result.at); //dla menu filtrów

            //stwórz tablicę z kolejnymi id=>areaType
            let areaTypeEnumTable = []; //id=>label
            result.at.forEach(at => {
              areaTypeEnumTable[at.id] = at.label;
            });


            
            //przypisz produktom areaTypes na podstawie tablicy
            let products = [];
            result.products.forEach(p => {
              
              let product = p;
              let inRightAreaType   = false;
              let inRightCourseType = false;
              let shouldBeVisible   = false;

              //przypisz etykiety słowne areaTypes do głownego produktu
              let currAreaTypeLabels = [];
              let matchAreaType = false; //do filtrowania po Area Type
              p.at.forEach(id => {
                if( id === areaTypeSelected ) {
                  matchAreaType = true;
                }
                currAreaTypeLabels.push( areaTypeEnumTable[ id ] );
              });
              p.atLabels = currAreaTypeLabels;

              if( parseInt(areaTypeSelected) === 0 || ( parseInt(areaTypeSelected) !== 0 && matchAreaType===true) )
                inRightAreaType = true;

              if( parseInt(courseTypeSelected) === 0 || ( parseInt(courseTypeSelected) === p.c) )
                inRightCourseType = true;
              
              shouldBeVisible = inRightAreaType && inRightCourseType;
              //TODO nie działa filtrowanie po Course Type

              if(shouldBeVisible)
                products.push( product );
              
            });

            setItems(products);
            setIsLoaded(true);
            console.log(products);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setError(error);
            setIsLoaded(true);
          }
        )
    }, [token, cat, areaTypeSelected]); //useEffect

      
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if(listIsEmpty) {
      return <div>Lista jest pusta.</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {

      if(items.length===0)
      return(
      <div>
        <FilterMenu areaTypes={areaTypes} query={{area_type:areaTypeSelected, cat: cat}} changeFilterQuery={handleState}></FilterMenu>
        <p className="block">Nie znaleziono żadnych kursów.</p>
      </div>
      );
      else
      return (

        <>
        
        <FilterMenu areaTypes={areaTypes} query={{area_type:areaTypeSelected, cat: cat}} changeFilterQuery={handleState}></FilterMenu>
        
        <div className="course-list">
        
        {items.map((shopProduct,index )=>

          <ShopProduct key={index} {...shopProduct}></ShopProduct>

        )}

        </div>

        </>
        );
      }
    
  }

  export default CourseShopList;