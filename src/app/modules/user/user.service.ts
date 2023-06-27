import { IUser } from "./user.interface";
import { User } from "./user.model";

const getUsers = async (): Promise<IUser[] | null> => {
  const users = await User.find();
  return users;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const users = await User.findById(id);
  return users;
};


const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const newUSer = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return newUSer;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserService = {
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
