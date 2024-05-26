import { Schema, Model, model } from "mongoose";

export interface IAppointment {
  name: string;
  description: string;
  date: Date;
}

const schema = new Schema<IAppointment>({
  name: { type: String, default: "匿名" },
  date: { type: Date, default: Date.now },
  description: { type: String, default: "" },
});

class ModelClass extends Model {}

schema.loadClass(ModelClass);

export default model("Appointment", schema);