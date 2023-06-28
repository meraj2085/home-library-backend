export const isUserExist = async function (phoneNumber: string, UserDb: any) {
  return await UserDb.findOne(
    { phoneNumber },
    { _id: 1, password: 1, role: 1 }
  ).lean();
};
