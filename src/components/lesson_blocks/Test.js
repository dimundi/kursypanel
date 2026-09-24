import React, { useState, useRef } from 'react';
import QuestionDropdown from './QuestionDropdown';
import QuestionRadio from './QuestionRadio';
import QuestionCheckbox from './QuestionCheckbox';
import {Notification} from '../Notification';
import helpersFetch from '../helpersFetch';

const Test = (props) => {

  /**
   * ajaxQuest()
   * Wysłanie zapytania do api o pytanie i/lub zapisanie odpowiedzi na bieżące pytanie.
   * @param {*} dataToSend 
   */
  const ajaxQuest = (dataToSend) => {

    var requestUrl = process.env.REACT_APP_API_URL+"test/"+props.testId+"/q/";

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(dataToSend),
      redirect: 'follow'
    };
          
    const callback = (result) => {
      ansList.current = [];
      questCountRef.current = questCountRef.current+1;
      setQuestCurrentPos( questCountRef.current+"/"+questTotalRef.current );
      
      if(questCountRef.current===questTotalRef.current){
        setTestProgressState('finalQuestion');
      }
      else
      {
        setTestProgressState('singleQuestion');
      }
      
      setQest(result.q);
      setIsLoaded(true);
      setHideQuery('');
    }   
          
    return helpersFetch.makeRequest(requestUrl, requestOptions, callback, setMessage);

  };// ajaxQuest()


  //OnClick function to get next question
  const handleNextQuest = (event) => {

    if(questList.current.length <= 1){
      setMessage(<Notification type="danger" msg="Brak pytań do wyświetlenia."></Notification>);
      return;
    }
    
    //get next question of the line
    questList.current.shift();
    let nextQestId = questList.current[0].testQId;

    //what is the answer given by user?
    //console.log("Answer given by user: "+ansList.current);
    let ans = ansList.current;
    let ansArray = [];
    ans.forEach(element => {
      ansArray.push( {'testAId': element} );
    });

    //wysyłanie udzielonej odpowiedzi
    let ansData = {
      testId: props.testId,
      q: [
        {
          testQId: nextQestId,
        }
      ],
      a: ansArray,
    };
    
    ajaxQuest(ansData);

  };// handleNextQuest()


  /**
   * handleAnsPick()
   * Modyfikuje tablicę z odpowiedziami na bieżące pytanie (checkboxes).
   */
  const handleAnsPick = (event) => {

    let check = event.target.checked;
    let val   = parseInt(event.target.value);

    //zaznaczamy nową odpowiedź
    if(check && ansList.current.indexOf(val) === -1 )
    {
      ansList.current.push( parseInt(val) );
    }
    //odznaczamy obecną odpowiedź
    else if (!check && ansList.current.indexOf(val) > -1)
    {
      const index = ansList.current.indexOf(val);
      ansList.current.splice(index, 1);
    }
  }//handleAnsPick()

  /**
   * handleSingleAnsPick()
   * Modyfikuje tablicę z odpowiedziami na bieżące pytanie (radio).
   */
  const handleSingleAnsPick = (event) => {

    ansList.current = [ parseInt(event.target.value) ];
  
  }//handleSingleAnsPick()


/**
   * handleCloseTest()
   * Modyfikuje tablicę z odpowiedziami na bieżące pytanie.
   */
 const handleCloseTest = (testId) => (event) => {
  
  var requestUrl = process.env.REACT_APP_API_URL+"test/"+props.testId+"/c/";

  var myHeaders = new Headers();
      myHeaders.append("Authorization", 'Bearer '+token);

  var requestOptions = {
      method: 'GET',
      headers: myHeaders,
  }

  const callback = (result) => {
    setHideQuery('is-hidden');
    setTestProgressState('testFinished');
    setTestResult(result.test.result);
  }
  
  return helpersFetch.makeRequest(requestUrl, requestOptions, callback, setMessage);

 }//handleCloseTest()
  

  //get access token
  const token = sessionStorage.getItem('access_token');

  //define state variables
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const questList = useRef([]);
  const [quest, setQest] = useState(null);          //current question
  const questTotalRef = useRef(0);                  //total number of questions in this test
  const questCountRef = useRef(0);                  //number of questions that already have been answered
  const [questCurrentPos, setQuestCurrentPos] = useState(null); 
  const ansList = useRef([]); //stores answers to currently displaying question
  const [hideQuery, setHideQuery] = useState('');

 const [testResult, setTestResult] = useState();

  const [message, setMessage] = useState("");
  const [testProgressState, setTestProgressState] = useState(null); //visibility of the button "Dalej"

  const displayQuestion = (result, testId) => {
  questList.current = result.test.q;
  questTotalRef.current = result.test.q.length;
  if(questTotalRef.current===0){
    setMessage(<Notification type="danger" msg="Ten test nie ma żadnych pytań." />);
    return;
  }



  //przygotowujemy pytanie, o które chcemy zapytać API
  let dataToSend = {
    testId: testId,
    q: [
      {
        testQId: result.test.q[0].testQId,
      }
    ]
  };

  ajaxQuest(dataToSend);
  setTestResult(props.result);

}


const retryTest = (event) => {
  
  var testId = event.target.value;
  
  var requestUrl = process.env.REACT_APP_API_URL+"test/"+testId+"/r/";

  var myHeaders = new Headers();
      myHeaders.append("Authorization", 'Bearer '+token);

  var requestOptions = {
      method: 'GET',
      headers: myHeaders,
  }

  const callback = (result) => {
    questCountRef.current = 0;
    setMessage(""); 
    displayQuestion(result, testId);
  }
  
  return helpersFetch.makeRequest(requestUrl, requestOptions, callback, setMessage);
 
}//retryTest()


  const handleTestBtn = (event) => {

    setMessage('');

    var testId = props.testId;

    var requestUrl = process.env.REACT_APP_API_URL+"test/"+testId+"/";

    var myHeaders = new Headers();
      myHeaders.append("Authorization", 'Bearer '+token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    }

    const callback = (result) => {
      if(result.test.status===2){
        setMessage(<Notification type="danger" msg="Test został już zakończony." />);
        return;
      }

      displayQuestion(result, testId);
    }

    return helpersFetch.makeRequest(requestUrl, requestOptions, callback, setMessage);

  }

    //output
    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return (
        <div className="test-controls box">

        { props.status === 0 &&
          <button className="button is-primary" value={props.testId} onClick={handleTestBtn}>Rozpocznij test</button>
        }

        { props.status === 1 &&
          <button className="button is-primary" value={props.testId} onClick={handleTestBtn}>Kontynuuj test</button>
        }

        { props.status === 2 &&
        <div className="is-flex is-align-items-center">
          <button className="button is-info is-light is-outlined" value={props.testId} onClick={retryTest}>Rozpocznij ponownie</button>
          <span  className="has-text-info ml-4">Test zakończony ({props.result})</span>
        </div> 
        }
        
        {message}
        </div>
        );
      } else {
    
      return(
        <div className="test-content box">
        <div className="query">

        {message}

            
            {quest?.map(q => (
                
              <div key={q.testQId}>
                
                <div className={hideQuery}>
                <strong>Pytanie {questCurrentPos}</strong>
                <p dangerouslySetInnerHTML={{__html: q.txt}}></p>

                { q.type === 1 &&
                  <QuestionRadio onChange={handleSingleAnsPick} q={q}></QuestionRadio>
                }

                { q.type === 2 &&
                  <QuestionDropdown testQId={q.testQId}></QuestionDropdown>
                }

                { q.type === 3 &&
                  <QuestionCheckbox onChange={handleAnsPick} q={q}></QuestionCheckbox>
                }
                </div>

                { testProgressState === 'singleQuestion' &&
                  <button className="button is-primary" onClick={handleNextQuest}>Dalej</button>
                }
                { testProgressState === 'finalQuestion' &&
                  <button className="button is-primary" onClick={handleCloseTest(q.testQId)}>Zakończ test</button>
                }
                { testProgressState === 'testFinished' &&
                  <div className="is-flex is-align-items-center">
                  <button className="button is-info is-light is-outlined" value={props.testId} onClick={retryTest}>Rozpocznij ponownie</button>
                  <span  className="has-text-info ml-4">Test zakończony ({testResult})</span>
                </div> 
                }

                </div>

            ))}

        </div>

        

        </div>
        )
    
    }

}

export default Test;