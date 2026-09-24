import React from 'react';

const QuestionRadio = ({ q, onChange }) => {
   
    return(
        <div className="control radio-list">
            {q.a.map(a => (
            <label key={a.testAId} className="radio">
                <input type="radio" name={"question_"+q.testQId} value={a.testAId} onChange={onChange}/><span dangerouslySetInnerHTML={{__html: a.txt}}></span>
            </label>
            ))}
        </div>
    );
}

export default QuestionRadio;