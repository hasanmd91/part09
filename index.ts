import express from "express";
import calculateBmi from "./bmiCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello full stack");
});
app.get("/bmi", (req, res) => {
  const height = Number(req.query?.height);
  const weight = Number(req.query?.weight);

  console.log(height, weight);

  if (!height || !weight) {
    res.json({
      error: "malformatted parameters",
    });
  } else {
    try {
      const bmi = calculateBmi(weight, height);
      res.json({ weight, height, bmi });
    } catch (error) {
      res.json({ error: "malformatted parameters" });
    }
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
