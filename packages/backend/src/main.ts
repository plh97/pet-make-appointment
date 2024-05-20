import express from "express";
import ViteExpress from "vite-express";

const app = express();


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
]

app.delete("/:id", (req, res) => {
  console.log(req.params.id);

  list = list.filter(({ id }) => { return String(id) !== req.params.id })
});

// modify
app.post("/:id", (req, res) => {
  console.log(req.params.id);

});
// create
app.put("/:id", (req, res) => {
  console.log(req.params.id);
});

app.get("/list", (_, res) => {
  res.send({
    code: 0,
    data: {
      list,
      page: 1,
      total: list.length,
    }
  });
  res.end();
});

const port: number = +(process.env.BACKEND_PORT ?? 3000);

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`),
);
