import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";


const signUp = async (userData: IUser): Promise<IUser | null> => {
  const newUSer = await User.create(userData);
  return newUSer;
};

export const AuthService = {
     signUp,
};
