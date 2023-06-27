import { Schema, model } from "mongoose";
import { ICow, CowModel, Label, Location, Category } from "./cow.interface";

const cowSchema = new Schema<ICow>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, enum: Object.values(Location), required: true },
    breed: {
      type: String,
      enum: [
        "Brahman",
        "Nellore",
        "Sahiwal",
        "Gir",
        "Indigenous",
        "Tharparkar",
        "Kankrej",
      ],
      required: true,
    },
    weight: { type: Number, required: true },
    label: {
      type: String,
      enum: Object.values(Label),
      required: true,
      default: Label.ForSale,
    },
    category: { type: String, enum: Object.values(Category), required: true },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Cow = model<ICow, CowModel>("Cow", cowSchema);
