import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { getCustomRepository, getRepository } from "typeorm";
import { User } from "../entity/User";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "process.env.JWT_SECRET,",
};

export default new Strategy(opts, async (payload, done) => {
  console.log(payload);
  const user = await getRepository(User).findOne({
    email: payload.email.toLowerCase(),
  });
  try {
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    console.log(error);
  }
});
