import React, { FormEvent } from "react";
import { Weather, Visibility } from "../types";

type NewEntriesprops = {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => void;
};

const NewEntries = ({ onChangeHandler, onSubmitHandler }: NewEntriesprops) => {
  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        <label>date</label>
        <input type="date" name="date" onChange={onChangeHandler} />
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <label>weather</label>
        {Object.values(Weather).map((value) => (
          <div key={value}>
            <input
              type="radio"
              name="weather"
              value={value}
              onChange={onChangeHandler}
            />
            <label>{value}</label>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <label>visibility</label>
        {Object.values(Visibility).map((value) => (
          <div key={value}>
            <input
              type="radio"
              name="visibility"
              value={value}
              onChange={onChangeHandler}
            />
            <label>{value}</label>
          </div>
        ))}
      </div>

      <div>
        <label>comment</label>
        <input type="text" name="comment" onChange={onChangeHandler} />
      </div>

      <button type="submit">add</button>
    </form>
  );
};

export default NewEntries;
