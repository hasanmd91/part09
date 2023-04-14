interface BmiValues {
  height: number;
  weight: number;
}

function BmiCategory(bmi: number) {
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
}

const calculateBmi = (height: number, weight: number, printText: string) => {
  const heightMeters = height / 100;
  const bmi = weight / heightMeters ** 2;
  const bmiCategory = BmiCategory(bmi);
  return bmiCategory;
};

try {
} catch (error: unknown) {
  let errorMessage = "something bad happend";

  if (error instanceof Error) {
    errorMessage += "Error:" + error.message;
  } else {
    console.log(errorMessage);
  }
}

const parsevalue = (args: string[]): BmiValues => {
  if (args.length > 4) throw new Error(" Too many arguments");
  if (args.length < 4) throw new Error(" Not Enough arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else throw new Error(" Provided value is not a number ");
};

const { height, weight } = parsevalue(process.argv);
