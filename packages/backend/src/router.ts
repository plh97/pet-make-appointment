import express from 'express';
const app = express.Router();
import AppointmentModel, { IAppointment } from './model';

let list = [
  {
    id: 1,
    date: '2016-05-03',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 2,
    date: '2016-05-02',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 4,
    date: '2016-05-01',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 4,
    date: '2016-05-01',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 4,
    date: '2016-05-01',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 4,
    date: '2016-05-01',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 4,
    date: '2016-05-01',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 4,
    date: '2016-05-01',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 4,
    date: '2016-05-01',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 4,
    date: '2016-05-01',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 4,
    date: '2016-05-01',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 4,
    date: '2016-05-01',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 4,
    date: '2016-05-01',
    name: 'Tom',
    description: 'No. 189, Grove St, Los Angeles',
  },
];

app.delete('/list/:id', (req, res) => {
  list = list.filter(({ id }) => {
    return String(id) !== req.params.id;
  });
  res.send({ code: 0 });
  res.end();
});

// modify
app.patch('/list/:id', async (req, res) => {
  await AppointmentModel.updateOne(
    { _id: room._id },
    { $addToSet: { member: new Types.ObjectId(userIdFromToken) } }
  );
  console.log(req.params.id, req.params, req.body);
  list.forEach((e) => {
    if (String(e.id) === req.params.id) {
      Object.assign(e, req.body);
    }
  });
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
  list.push(
    Object.assign(req.body, {
      id: Math.random(),
      _id: Math.random(),
    })
  );
  res.send({ code: 0 });
  res.end();
});

app.get('/list', async (req, res) => {
  const list = await AppointmentModel.find();
  console.log(list);
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
