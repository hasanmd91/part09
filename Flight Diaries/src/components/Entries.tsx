import React from "react";
import { DiaryEntry } from "../types";

type EntriesProps = {
  entries: DiaryEntry[];
};

const Entries = ({ entries }: EntriesProps) => {
  return (
    <div>
      {entries.map((entry) => (
        <div key={entry.id}>
          <p>
            <strong>{entry.date}</strong>
          </p>
          <p>{entry.weather}</p>
          <p> {entry.visibility}</p>
        </div>
      ))}
    </div>
  );
};

export default Entries;
