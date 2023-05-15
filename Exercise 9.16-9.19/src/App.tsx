import React, { useEffect, useState } from "react";
import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "./types";
import Entries from "./components/Entries";
import NewEntries from "./components/NewEntries";
import Header from "./components/Header";
const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>();
  const [newDiaries, setNewDiaries] = useState<NewDiaryEntry>();

  useEffect(() => {
    try {
      axios
        .get<DiaryEntry[]>("http://localhost:3000/api/diaries")
        .then((response) => setDiaries(response.data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Header title="Add new entry" />
      <NewEntries />
      <Header title="Diary entries" />
      {diaries && <Entries entries={diaries} />}
    </div>
  );
};

export default App;
