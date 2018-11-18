import { Request, Response, NextFunction } from "express";
import express from "express";
import bodyParser from "body-parser";
import { getCheapestSupplierOptions } from "./helpers/cheapestSupplierOptions";
import { query, validationResult } from "express-validator/check";
import { locationValidator } from "./helpers/validators";

const app = express();

// Express configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/api', [
  query('pickup').exists().withMessage('Must be provided').custom(locationValidator),
  query('dropoff').exists().withMessage('Must be provided').custom(locationValidator),
  query('no_of_passengers').optional().isInt().withMessage('Must be an integer')
],async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  try {
    const pickup = req.query.pickup;
    const dropoff = req.query.dropoff;
    const no_of_passengers = parseInt(req.query.no_of_passengers);
    const result = await getCheapestSupplierOptions(pickup, dropoff, no_of_passengers);
    res.status(200).json(result)
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