import React, { useState, useEffect } from "react";
import EnhancedTable from "./EnhancedTable";

function VocabularyPage() {
  const [vocab, setVocab] = useState([]);
  const [newVocab, setNewVocab] = useState(false);


  useEffect(() => {
    fetchVocab();
  }, [newVocab]);

  const fetchVocab = () => {
    fetch("/flashcards", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setVocab(data));
  };


  const deleteVocabWord = (words) => {
    console.log("STATE BEFORE", vocab)
    console.log(words);
    console.log(vocab);

    const findWords = vocab.filter((v) => words.includes(v.term));
    console.log("NEW", findWords);

  deletePop(findWords)

    console.log("DELETEDHI", findWords);
    console.log("STATE AFTER", vocab);

    
    // const deletedWord = v.id !== id);
    setVocab(vocab)
    setNewVocab(!newVocab)
    //   setVocab(updatedVocab)

    

  };
  
  const deletePop = (array) => {
    const deletedWords = []
    for (let i = 0; i < array.length; i++) {
      console.log("HELLO", array[i])
      deleteFlashcard(array[i])

      const index = vocab.indexOf(array[i])

      console.log("BEFORE", index)

    
      const word = vocab.splice(index, 1)
      console.log("AFTER", word[0])
  
      deletedWords.push(word[0])
console.log("deletedWorrsd", deletedWords)
    }
    return deletedWords

  }
  const deleteFlashcard = (word) => {
    console.log(word)
    fetch(`flashcards/${word.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
        Accept: "application/json",
      },
    }).then((res) => {
      // if (res.ok) {
        console.log(res)
     
      
// BACKEND DELETES 1 OBJ
// console.log("WORD OBJ", word)

// const index = vocab.indexOf(word)
//       console.log("BEFORE", vocab)
// const newVocab= vocab.splice(index, 1)
// console.log("AFTER", vocab)

// setVocab(newVocab)

// vocab.indexOf
//       const deletedWord = v.id !== id);
//       setVocab(updatedVocab)
//       console.log("RENDERING")
//       // }
//     });
  }
    )
}

  // const handleGetDefinition = (e) => {
  //   e.preventDefault();
  //   Promise.all(
  //     inputField.map((input) =>
  //       fetch(
  //         `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${input.word}?key=b033b3b4-4766-4db1-8f40-6af316839bf5`
  //       )
  //     )
  //   )
  //     .then((results) => Promise.all(results.map((r) => r.json())))
  //     .then((results) =>
  //       setDefinitions(results.map((result) => result[0].shortdef[0]))
  //     );

  // };


  return (
    <>



      <EnhancedTable flashcards={vocab} deleteVocabWord={deleteVocabWord} />
    </>
  );
}

export default VocabularyPage;
