export interface courseParts {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  content: courseParts[];
}
const Content = ({ content }: ContentProps) => {
  return (
    <div>
      <p>
        {content[0].name} {content[0].exerciseCount}
      </p>
      <p>
        {content[1].name} {content[1].exerciseCount}
      </p>
      <p>
        {content[2].name} {content[2].exerciseCount}
      </p>
    </div>
  );
};

export default Content;
