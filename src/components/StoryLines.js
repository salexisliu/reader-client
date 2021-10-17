import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";

function StoryLines({ lineObj, highlightLine}) {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [hasNote, setNote] = useState(false);
  const [note, setShowNote] = useState(false);

  const checkIfHighlighted = () => {
    if (lineObj.highlighted == true) {
      setIsHighlighted(true);
    }
    else {
      console.log("no")
    }
  }

  const checkNote = () => {
    if (lineObj.note) {
      console.log(lineObj.note.content);
      setNote(true)
    }
    else {
      console.log("no")
    }
  }

  const showNote = () => {

    setShowNote(!note)
   
  }

  useEffect(() => {

    checkIfHighlighted()
    checkNote()
  
  }, []);



  function highlight() {
    setIsHighlighted((isHighlighted) => !isHighlighted);
  }

  const handleClick = () => {


    highlight()
    
    
    highlightLine({id: lineObj.id,
      highlighted: !isHighlighted})


  };

  return (<>

    {isHighlighted ? <h3 onClick={handleClick} style={{ color: "violet" }}>{lineObj.id} {lineObj.content}</h3> : <h3 onClick={handleClick}>{lineObj.id} {lineObj.content}</h3>}
    {hasNote ? <Button onClick={showNote}>see note</Button> : <></>}
    {note ? <h5 style={{ color: "red" }}>{lineObj.note.content}</h5> : <></>}

    
  </>
  );
}

export default StoryLines;
