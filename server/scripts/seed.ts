import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { Salt, parseSalt } from "../src/auth/password.service";
import { hash } from "bcrypt";
import { EnumUserPriority } from "../src/user/base/EnumUserPriority";

if (require.main === module) {
  dotenv.config();

  const { BCRYPT_SALT } = process.env;

  if (!BCRYPT_SALT) {
    throw new Error("BCRYPT_SALT environment variable must be defined");
  }
  const salt = parseSalt(BCRYPT_SALT);

  seed(salt).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

async function seed(bcryptSalt: Salt) {
  console.info("Seeding database...");

  const client = new PrismaClient();

  const data = {
    email: "100484401+Shurtu-gal@users.noreply.github.com",
    username: "Shurtu-gal",
    name: "Ashish Padhy",
    password: await hash("password", bcryptSalt),
    roles: ["admin"],
    age: 20,
    bio: "I am a developer",
    birthDate: new Date("2003-12-31T23:00:00.000Z"),
    location: "India",
    extendedProperties: {
      "website": "https://ashishpadhy.com",
      "github": "https://github.com/Shurtu-gal",
      "twitter": "https://twitter.com/Shurtu_gal",
      "linkedin": "https://www.linkedin.com/in/ashish-padhy-3023/",
    },
    isCurious: true,
    priority: EnumUserPriority.High,
    score: 10,
  };

  await client.user.upsert({
    where: {
      username: data.username,
    },
    update: {},
    create: data,
  });

  void client.$disconnect();

  console.info("Seeding database with custom seed...");

  console.info("Seeded database successfully");
}
