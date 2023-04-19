interface BmiValues {
  height: number;
  weight: number;
}

const BmiCategory = (bmi: number): string => {
  console.log(bmi);
  switch (true) {
    case bmi < 15:
      return "Very severely underweight";
    case bmi < 16:
      return "Severely underweight";
    case bmi < 18.5:
      return "Underweight";
    case bmi < 25:
      return "Normal (healthy weight)";
    case bmi < 30:
      return "Overweight";
    case bmi < 35:
      return "Obese Class I (Moderately obese)";
    case bmi < 40:
      return "Obese Class II (Severely obese)";
    default:
      return "Obese Class III (Very severely obese)";
  }
};

const calculateBmi = (height: number, weight: number): string => {
  console.log("weight", weight);
  const heightMeters = height / 100;
  const bmi = weight / heightMeters ** 2;
  const bmiCategory = BmiCategory(bmi);
  return bmiCategory;
};

const parsevalue = (args: string[]): BmiValues => {
  if (args.length !== 4) {
    throw new Error("Invalid number of arguments");
  }

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return { height: Number(args[2]), weight: Number(args[3]) };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const { height, weight } = parsevalue(process.argv);
  calculateBmi(height, weight);
} catch (error: unknown) {
  let errorMessage = "something bad happend";
  if (error instanceof Error) {
    errorMessage += "Error:" + error.message;
    console.log(errorMessage);
  } else {
    console.log(errorMessage);
  }
}

export default calculateBmi;
