import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Test from '../components/lesson_blocks/Test';
import { NavLink } from 'react-router-dom';
import helpersFetch from '../components/helpersFetch';

const Lesson = () => {

    //get query parameters
    let { courseId, lessonId } = useParams();

    //get access token
    const token = sessionStorage.getItem('access_token');
        
    //define state variables
    // const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [msg, setMsg] = useState('Ładowanie...');

    const [lessonName, setLessonName] = useState("");
    const [prevLesson, setPrev] = useState(0);
    const [nextLesson, setNext] = useState(0);

    useEffect(() => {
        
      var requestUrl = process.env.REACT_APP_API_URL+"lesson/"+lessonId+"/";
      
      var myHeaders = new Headers();
      myHeaders.append("Authorization", 'Bearer '+token);
    
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };

      const callback = (result) => {
        let filteredBlocks = [];
        for (let index = 0; index < result.lesson.blocks.length; index++) {
          filteredBlocks[index] = result.lesson.blocks[index];
          let regex1 = /(\/promedia\/.+\.[A-Za-z]+)/gi
          filteredBlocks[index].txt = filteredBlocks[index].txt.replace(regex1, "$1?token="+token);
          let regex2 = /(\/usermedia\/.+\.[A-Za-z]+)/gi
          filteredBlocks[index].txt = filteredBlocks[index].txt.replace(regex2, "$1?token="+token);
        }

        setLessonName(result.lesson.name);
        setPrev(result.lesson.prevLesson);
        setNext(result.lesson.nextLesson);
        setItems(filteredBlocks);
        setIsLoaded(true);
      }

      return helpersFetch.makeRequest(requestUrl, requestOptions, callback, setMsg);
              
    }, [lessonId, token])


    //output
    if (!isLoaded) {
        return <div>{msg}</div>;
      } else {
        
        return (

        <section className="hero is-medium is-bold">
        <div className="hero-body">
            
        <div className="container readable">
        
        <header className="block">
          <h2 className="subtitle">Jesteś w lekcji:</h2>
          <h1 className="title is-2">{lessonName}</h1>
          <NavLink to={'/course/' + courseId }>
            <i className="fas fa-chevron-left mr-3"></i> Wróć do spisu treści
          </NavLink>
        </header>


        <div className="lesson-container block pt-5">
        <div className="blocks-wrap">
        {items.map(block => (
        <div key={block.blockId} className={'block block-'+block.type}>

            { block.txt !== null && 
              <div className="block-content" dangerouslySetInnerHTML={{__html: block.txt}}></div>
            }

            { block.type === 3 && block.test.testId !== null && block.test !== false &&
              <Test testId={block.test.testId} status={block.test.status} result={block.test.result}></Test>
            }

            { block.type === 3 && block.test === false &&
              <div>😅 <small>Ups... Trener nie przygotował jeszcze testu. <br/>Zajrzyj później lub skontaktuj się z biurem obsługi.</small></div>
            }


        </div>
        ))}
        </div>

        
        <nav className="nav-controls buttons field is-centered">
          { prevLesson !== undefined && prevLesson > 0  &&
          <p className="control">
            <NavLink key={prevLesson} to={'/course/'+courseId+'/lesson/' + prevLesson } className="button is-primary">
              <i className="fas fa-chevron-left mr-3"></i> Poprzednia lekcja 
            </NavLink>
          </p>
           }
          { nextLesson !== undefined && nextLesson > 0  &&
          <p className="control">
            <NavLink key={nextLesson} to={'/course/'+courseId+'/lesson/' + nextLesson } className="button is-primary">
              Następna lekcja <i className="ml-3 fas fa-chevron-right"></i>
            </NavLink>
          </p>
          }
        </nav>
        
        </div>

        </div>
        </div>
        </section>
        )

      }//output


}

export default Lesson;