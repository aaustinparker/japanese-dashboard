'use client';

import { useEffect, useState } from "react";

export default function Bunpro() {
  const [bunproGrammarCount, setBunproGrammarCount] = useState<number>(20);
  const [bunproVocabCount, setBunproVocabCount] = useState<number>(15);

  useEffect(() => {
    async function fetchSummary() {
      const response = await fetch('/api/bunpro/summary')
      const json = await response.json();
      setBunproGrammarCount(json.grammarDue);
      setBunproVocabCount(json.vocabDue);
    }
    fetchSummary();
  }, []);
    
  return (
    <>
      <div id="bunpro-container">
        <div id="bunpro-grammar-box" className="bunpro-box bg-bunpro-red rounded-xl p-2 mr-2">
          <span>Bunpro Grammar: {bunproGrammarCount}</span>
        </div>
        <div id="bunpro-vocab-box" className="bunpro-box bg-bunpro-light rounded-xl p-2">
          <span>Bunpro Vocab: {bunproVocabCount}</span>
        </div>
      </div>

      <style jsx>{`
        .bunpro-box {
          width: 33.33%;
          height: 100px;
          display: inline-block;
          color: rgb(32, 32,32);
        }
      `}</style>

    </>
  );
}