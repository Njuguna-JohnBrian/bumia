import { Response, Request } from "express";
import { ControllerMessages } from "../interfaces/error.interface";
import { seedAdminUser, seedProducts } from "../utils/seeder.utils";

/**
 * Seed Bumia Data
 *
 * /seed
 * @param {*} req request body
 * @param {*} res response body
 */
const seedData = async (req: Request, res: Response) => {
  try {
    const seedPromise: Promise<any>[] = [];
    seedPromise.push(seedProducts());
    seedPromise.push(seedAdminUser());

    await Promise.all(seedPromise);

    return res.status(200).json({
      success: true,
      message: ControllerMessages.SEED_MESSAGE,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "An error occurred while seeding data.",
    });
  }
};


export { seedData };
