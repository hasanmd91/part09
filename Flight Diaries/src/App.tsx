import React, { FormEvent, useEffect, useState } from "react";
import { DiaryEntry, Weather, Visibility } from "./types";
import Entries from "./components/Entries";
import NewEntries from "./components/NewEntries";
import Header from "./components/Header";
import Error from "./components/Error";
import axios, { AxiosError } from "axios";

const App = () => {
  const [error, setError] = useState<AxiosError | string>();
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiaries, setNewDiaries] = useState({
    date: "",
    weather: Weather.Sunny,
    visibility: Visibility.Good,
    comment: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDiaries((prevNewDiaries) => ({
      ...prevNewDiaries,
      [name]: value,
    }));
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newEntry: DiaryEntry = {
      ...newDiaries,
      id: diaries.length + 1,
    };

    setDiaries((prevDiaries) => [...prevDiaries, newEntry]);
  };

  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3000/api/diaries")
      .then((response) => {
        setDiaries(response.data);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          setError(axiosError);
        } else {
          console.error(error);
          setError(error);
        }
      });
  }, []);

  return (
    <div>
      <Header title="Add new entry" />
      {error && <Error error={error} />}
      <NewEntries
        onChangeHandler={onChangeHandler}
        onSubmitHandler={onSubmitHandler}
      />
      CreateNewDiaryObject
      <Header title="Diary entries" />
      {diaries && <Entries entries={diaries} />}
    </div>
  );
};

export default App;
