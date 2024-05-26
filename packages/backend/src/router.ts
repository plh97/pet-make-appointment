import express from 'express';
import AppointmentModel from './model';
import { Types } from 'mongoose';
// import {} from 'mongoose';

const app = express.Router();

app.delete('/list/:id', async (req, res) => {
  await AppointmentModel.deleteOne({ _id: req.params.id })
  res.send({ code: 0 });
  res.end();
});

// modify
app.patch('/list/:id', async (req, res) => {
  await AppointmentModel.updateOne(
    { _id: req.params.id },
    { $set: { name: req.body.name, description: req.body.description, date: new Date(req.body.date) } },
  );
  res.send({ code: 0 });
  res.end();
});

// create
app.post('/list', async (req, res) => {
  await AppointmentModel.create({
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
  });
  res.send({ code: 0 });
  res.end();
});

app.get('/list', async (req, res) => {
  const list = await AppointmentModel.find();
  res.send({
    code: 0,
    data: {
      list: list,
      page: req.params?.page ?? 1,
      totalCount: list.length,
    },
  });
  res.end();
});

export default app;
