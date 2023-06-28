import { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";


const createAdmin = async (payload: IAdmin): Promise<Partial<IAdmin>| null> => {
  const admin = await Admin.create(payload)
  const { password, ...rest } = admin.toJSON();
  return rest;
};

export const AdminService = {
    createAdmin,
};
