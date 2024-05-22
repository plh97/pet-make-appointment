import express from 'express';
import ViteExpress from 'vite-express';

const app = express();
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

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
app.patch('/list/:id', (req, res) => {
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
app.post('/list', (req, res) => {
  list.push(
    Object.assign(req.body, {
      id: Math.random(),
      _id: Math.random(),
    })
  );
  res.send({ code: 0 });
  res.end();
});

app.get('/list', (req, res) => {
  res.send({
    code: 0,
    data: {
      list: list.map((e) => {
        return {
          ...e,
          _id: e.id,
        };
      }),
      page: req.params?.page ?? 1,
      totalCount: list.length,
    },
  });
  res.end();
});

const port: number = +(process.env.BACKEND_PORT ?? 3000);

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
);
