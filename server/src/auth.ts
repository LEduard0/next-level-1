import jwt from "jsonwebtoken";
import { promisify } from "util";

async function validate({ req, res, next }: any) {
  if (!req) {
    return res.sendStatus(400);
  }

  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const [, token] = authorization.split(" ");

  try {
    await promisify(jwt.verify)(token, "PRIVATEKEY");

    return next();
  } catch (err) {
    return res.sendStatus(401);
  }
}

export default validate;
