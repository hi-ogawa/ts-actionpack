import type { Request, Response } from "express";

export abstract class AbstractController {
  constructor(protected req: Request, protected res: Response) {}
}
