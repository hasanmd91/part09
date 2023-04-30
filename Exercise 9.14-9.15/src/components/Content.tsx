export interface courseParts {
  name: string;
  exerciseCount: number;
  description?: string;
  backgroundMaterial?: string;
}

interface ContentProps {
  content: courseParts[];
}
const Content = ({ content }: ContentProps) => {
  return (
    <div>
      {content.map((con) => (
        <div key={con.name}>
          <strong>
            {con.name} {con.exerciseCount}
          </strong>
          <p> {con.description}</p>
          <p> {con.backgroundMaterial}</p>
        </div>
      ))}
    </div>
  );
};

export default Content;
