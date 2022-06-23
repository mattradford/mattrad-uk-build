import type { Context } from "netlify:edge";

export default async (request: Request, context: Context) => {
  return context.feed("/feed/index.xml");
};
