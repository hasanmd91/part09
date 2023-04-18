interface resultObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface exerciseInputType {
  target: number;
  array: number[];
}

const parseArgvValues = (args: string[]): exerciseInputType => {
  if (args.length < 4) {
    throw new Error("Invalid number of arguments");
  }
  const target = Number(args[2]);
  const array = args.slice(3).map(Number);

  if (isNaN(target) || array.some(isNaN)) {
    throw new Error(" provided number is not a number");
  }
  return {
    target,
    array,
  };
};
const ratingMessage: string[] = [
  "better luck next time",
  "not too bad but could be better",
  "success",
];

const calculateExercises = (array: number[], target: number): resultObject => {
  const periodLength = array.length;
  const trainingDays = array.filter((n) => n > 0).length;
  const success = array.every((n) => n >= target);
  const average = array.reduce((res, num) => res + num) / periodLength;
  const successFullTrainingDays = array.filter((num) => num >= target).length;
  let rating;
  if (successFullTrainingDays === periodLength) {
    rating = 3;
  } else if (successFullTrainingDays >= Math.ceil(periodLength / 2)) {
    rating = 2;
  } else {
    rating = 1;
  }
  const ratingDescription = ratingMessage[rating - 1];
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, array } = parseArgvValues(process.argv);
  const result = calculateExercises(array, target);
  console.log(result);
} catch (error: unknown) {
  let errorinfo = "something bad happend";
  if (error instanceof Error) {
    errorinfo += "Error:" + error.message;
  } else {
    console.log(errorinfo);
  }
}
