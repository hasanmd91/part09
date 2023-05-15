import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello full stack");
});

// bmi calculator

app.get("/bmi", (req, res) => {
  const height = Number(req.query?.height);
  const weight = Number(req.query?.weight);

  if (!height || !weight) {
    res.json({
      error: "malformatted parameters",
    });
  } else {
    try {
      const bmi = calculateBmi(height, weight);
      res.json({ weight, height, bmi });
    } catch (error) {
      res.json({ error: "malformatted parameters" });
    }
  }
});

//

app.post("/exercises", (req, res) => {
  const daily_exercises = req.body.daily_exercises;
  const target = req.body.target;

  if (
    !target ||
    !daily_exercises ||
    isNaN(target) ||
    daily_exercises.length < 1
  ) {
    res.json({ error: "malformatted parameters" });
  }

  try {
    res.json(calculateExercises(daily_exercises, target));
  } catch (error) {
    console.log(error);
    res.json({ error: "malformatted parameters" });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
