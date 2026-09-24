import React, { useState, useEffect } from 'react';
import helpersTabs from './helpersTabs';
import helpersFetch from './helpersFetch';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const Course2 = () => {

  //get query parameters
  let { courseId } = useParams();

  //get access token
  const token = sessionStorage.getItem('access_token');

  //define state variables
  const [loadError, setLoadError] = useState('');
  const [items, setItems] = useState([]);

  const [certMessage, setCertMessage] = useState("Brak informacji o certyfikacie.");


  const handleCertTabs = (event) => {
    checkForCertificate(courseId);
    helpersTabs.handleCourseTabs(event);
  }
  

  const checkForCertificate = (courseId) => {

    var requestUrl = process.env.REACT_APP_API_URL+"course/"+courseId+"/cert/";

    var myHeaders = new Headers();
        myHeaders.append("Authorization", 'Bearer '+token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    const callback = (result) => {
      if(result.cert === ""){
        setCertMessage(
          <>
          <span className="has-text-primary"><i class="fas fa-clipboard-check fa-3x mb-4"></i></span>
          <h3 className="title">Aby otrzymać certyfikat:</h3>
          <ul className="mb-6">
          {result.cond.map(cond => ( 
            <li key={cond.testId} className="mb-6"><span className="cert-cond"><span className="cond-icon mr-2"><i class="fas fa-tasks"></i></span> zdaj "{cond.testName}" na co najmniej {cond.minOK}%</span></li>  
          ))}
          </ul>
          </>
        );
      }
      else
      {
        setCertMessage(
          <>
            <p className="block">Gratulujemy ukończenia kursu!</p>
            <a className="button is-link" href={result.cert} target="_blank" rel="noreferrer">Pobierz certyfikat PDF <i className="ml-2 fas fa-download"></i></a>
          </>
        );
      }
    }//callback

    return helpersFetch.makeRequest(requestUrl, requestOptions, callback, setCertMessage);

  }


    
  
    useEffect(() => {

      var requestUrl = process.env.REACT_APP_API_URL+"course/"+courseId+"/";

      var myHeaders = new Headers();
          myHeaders.append("Authorization", 'Bearer '+token);
  
      var requestOptions = {
          method: 'GET',
          headers: myHeaders,
      }
  
      const callback = (result) => {
        result.courses[0].lessons.forEach(func1);
        function func1(word, index, arr) {
          if(index > 0 )
            arr[index]['prevLesson'] = arr[(index-1)]['lessonId'];
          else
          arr[index]['prevLesson'] = 0;
          if(index < arr.length-1)
            arr[index]['nextLesson'] = arr[(index+1)]['lessonId'];
          else
            arr[index]['nextLesson'] = 0;
        }

        setItems(result.courses);
      }
      
      return helpersFetch.makeRequest(requestUrl, requestOptions, callback, setLoadError);

    }, [courseId, token])

        
        return (

          <section className="hero is-medium is-bold">
            <div className="hero-body">

              {loadError}

              {items.map(course => (
              
              <div key={course.courseId} className="container">
              <header>
                <h2 className="subtitle">Jesteś w kursie:</h2>
                <h1 className="title is-2">{course.name}</h1>
              </header>
              
              <nav className="panel mt-5">
              <p className="panel-tabs">
                <a className="panel-tab-item is-active" onClick={helpersTabs.handleCourseTabs} data-target="tabLessons">Lekcje</a>
                <a className="panel-tab-item"           onClick={handleCertTabs} data-target="tabCert">Certyfikat</a>
                <a className="panel-tab-item"           onClick={helpersTabs.handleCourseTabs} data-target="tabDetails">Szczegóły</a>
              </p>

              <div id="tabLessons" className="panel-content table-of-contents mt-5 is-active">
                {course.lessons.map(lesson => (

                  <NavLink key={lesson.lessonId} to={'/course/'+courseId+'/lesson/' + lesson.lessonId + "/" + lesson.prevLesson + "/" + lesson.nextLesson} className="panel-block is-active">
                    <span className="panel-icon">
                      <i className="fas fa-book" aria-hidden="true"></i>
                    </span>
                    {lesson.name}
                  </NavLink>
                 
                ))}
              </div>

              <div id="tabCert" className="panel-content table-of-contents mt-5">
                <div className="p-3 has-text-centered">
                  {certMessage}
                </div>
              </div>

              <div id="tabDetails" className="panel-content table-of-contents mt-5">
                <div className="p-3">
                  Szczególowy opis kursu
                </div>
              </div>

              </nav>
            </div>

            ))}  
              
            </div>
          </section>

        );

}

export default Course2;