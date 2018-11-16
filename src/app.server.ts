import { Request, Response, NextFunction } from "express";
import express from "express";
import bodyParser from "body-parser";
import { getCheapestSupplierOptions } from "./helpers/cheapestSupplierOptions";

const app = express();

// Express configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/api', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pickup = req.query.pickup;
    const dropoff = req.query.dropoff;
    const no_of_passengers = parseInt(req.query.no_of_passengers);
    const result = await getCheapestSupplierOptions(pickup, dropoff, no_of_passengers);
    res.json(result)
  } catch (err) {
    next(err)
  }
})

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  res.json({
    message: "Not Found"
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.json({
    message: err.message
  });
});

export default app;