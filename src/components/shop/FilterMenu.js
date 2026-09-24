import React, {useState, useRef} from 'react';

function FilterMenu({ areaTypes, query, changeFilterQuery }) {
    

    //Bieżące i zawsze aktualne Area Type, CourseType i Category
    var area_type = useRef(query.area_type); 
    var course_type = useRef(query.course_type); 
    var cat = useRef(query.cat);

    //Wyszukaj etykietę aktualnie wybranego obszaru tematycznego
    let A_label = "Dowolny obszar tematyczny";
    areaTypes.forEach(i => {
        if(i.id === area_type.current) A_label=i.label;
    });
    const [aLabel, set_a] = useState(A_label);

    //Course Type nie musimy mapować, bo wystarczy nam id do radio buttons
    const [courseTypeId, setCourseTypeId] = useState(course_type);

    //Wyszukaj eykietę kategorii szkoleń
    let C_Map = JSON.parse(process.env.REACT_APP_PRO_CAT_MAP);
    const [cLabel, set_c] = useState(C_Map[cat.current]);


    
    /*Gdy zmienia się jakiś filtr, przeładuj wszystko*/
    const filterBy = (event) => {
        
        let key = event.target.dataset.key;
        let val = event.target.dataset.value;

        if(key==='area_type')    area_type.current = val;
        if(key==='course_type')  course_type.current = val;
        if(key==='cat')          cat.current = val;

        areaTypes.forEach(i => {
            if(i.id === area_type.current) set_a(i.label);
        });
        setCourseTypeId(course_type.current);
        set_c(C_Map[cat.current]);
       
        changeFilterQuery({
            area_type: area_type.current,
            course_type: course_type.current,
            cat: cat.current
        });

    }//filterBy()



    return (
    <div>
        <div className="box is-flex is-justify-content-space-between is-align-items-center mb-6 mx-2">

        <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <span>{aLabel}</span>
                <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                <a  key="0"
                    onClick={filterBy}
                    className={`dropdown-item ${ 0 === area_type.current ? "is-active" : ""}` }
                    data-key="area_type"
                    data-value="0">Dowolny obszar tematyczny</a>
                
                {areaTypes.map((areaType,index )=>
                <a  key={index}
                    onClick={filterBy}
                    className={`dropdown-item ${ areaType.id === area_type.current ? "is-active" : ""}` }
                    data-key="area_type"
                    data-value={areaType.id}>{areaType.label}</a>
                )}

                </div>
            </div>
        </div>

        <div className="control">
            
            <label className="radio">
                <input
                    onClick={filterBy}
                    className="mr-2"
                    type="radio"
                    name="answer"
                    data-key="course_type"
                    data-value="0"/>
                Wszystkie
            </label>
            <label className="radio">
                <input
                    onClick={filterBy}
                    {... process.env.REACT_APP_COURSE_TYPE_STATIONARY === course_type.current ? "checked" : ""}
                    className="mr-2"
                    type="radio"
                    name="answer"
                    data-key="course_type"
                    data-value={process.env.REACT_APP_COURSE_TYPE_STATIONARY}/>
                Stacjonarne
            </label>
            <label className="radio">
                <input
                    onClick={filterBy}
                    {... process.env.REACT_APP_COURSE_TYPE_WEBINAR === course_type.current ? "checked" : ""}
                    className="mr-2"
                    type="radio"
                    name="answer"
                    data-key="course_type"
                    data-value={process.env.REACT_APP_COURSE_TYPE_WEBINAR}/>
                Webinar
            </label>
        </div>

        <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <span>{cLabel}</span>
                <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                <a  onClick={filterBy}
                    className={`dropdown-item ${ process.env.REACT_APP_PROD_CAT_IND === cat.current ? "is-active" : ""}` }
                    data-key="cat"
                    data-value={process.env.REACT_APP_PROD_CAT_IND}>
                    Indywidualne
                </a>
                <a  onClick={filterBy}
                    className={`dropdown-item ${ process.env.REACT_APP_PROD_CAT_OPEN === cat.current ? "is-active" : ""}` }
                    data-key="cat"
                    data-value={process.env.REACT_APP_PROD_CAT_OPEN}>
                    Rady Pedagogiczne
                </a>
                <a  onClick={filterBy}
                    className={`dropdown-item ${ process.env.REACT_APP_PROD_CAT_ECOURSE === cat.current ? "is-active" : ""}` }
                    data-key="cat"
                    data-value={process.env.REACT_APP_PROD_CAT_ECOURSE}>
                    eKursy
                </a>
                </div>
            </div>
        </div>

        </div>
    </div>
    );
}

export default FilterMenu;