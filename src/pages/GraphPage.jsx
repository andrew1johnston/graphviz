import React, {useState} from "react";
import './GraphPage.css';

import { getErrors, mapData  } from "../utils/graphUtils";
import DirectedGraph from "../components/DirectedGraph/DirectedGraph";
import lang from "./GraphPage.lang";
import samplePayload from './samplePayload.json';

function GraphPage() {
    const stringifiedSamplePayload = JSON.stringify(samplePayload);
    const mappedSamplePayload = mapData(samplePayload);

    const [input, setInput] = useState(stringifiedSamplePayload);
    const [mappedData, setMappedData] = useState(mappedSamplePayload);
    const [jsonError, setJsonError] = useState('');

    const handleTextAreaChange = (e) => {
        const newInput = e.target.value;
        setInput(newInput);
        
        try {
            const parsed = JSON.parse(newInput);
            
            const errors = getErrors(parsed);
            if (errors?.length > 0) {
                setJsonError(errors.join(', '));
                setMappedData(null);
            } else {
                setJsonError(''); 

                const newMappedInput = mapData(parsed);
                setMappedData(newMappedInput);
            } 
         
         } catch(err) {
            if (newInput === '') {
                setJsonError('No input provided');
            } else {      
                setJsonError(err.message);
            }

            setMappedData(null);
         }
    }
    
    return (
        <div>
            <h1>{lang.title}</h1>
            <section>
                <label htmlFor="textarea">{lang.jsonInputLabel}</label>
                <p>
                    {jsonError ? 
                        <textarea id="textarea" placeholder={lang.placeholder} rows={10} cols={100} onChange={handleTextAreaChange} value={input} aria-invalid></textarea>
                        : <textarea id="textarea" placeholder={lang.placeholder} rows={10} cols={100} onChange={handleTextAreaChange} value={input}></textarea>
                    }
                </p>
                {jsonError && 
                    <span className="errorMessage">Error: {jsonError}</span>}
            </section>
            <section>
                <div className="graphContainer">
                    <p>{lang.graphLabel}</p>
                    {mappedData ? 
                        <>
                            <DirectedGraph data={mappedData} />
                        </>
                        : <p>Graph cannot be generated :-(</p> 
                        }
                </div>
            </section>
        </div>
    );
}
  
export default GraphPage;