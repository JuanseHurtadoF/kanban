export default interface IUser {
  name: string;
  email: string;
  password: string;
  admin: "user" | "admin";
};
