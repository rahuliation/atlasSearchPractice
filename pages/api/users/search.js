import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const users = await User.aggregate([]);
      res.status(200).json({ users });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  }
}
