import { courseParts } from "./Content";

interface TotalProps {
  total: courseParts[];
}
const Total = ({ total }: TotalProps) => {
  return (
    <p>
      Number of exercises{" "}
      {total.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;
