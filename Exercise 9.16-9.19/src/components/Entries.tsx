import React from "react";
import { DiaryEntry, Weather, Visibility } from "../types";

type EntriesProps = {
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
};

const Entries = ({ date, weather, visibility, comment }: EntriesProps) => {
  return <div>Entries</div>;
};

export default Entries;
