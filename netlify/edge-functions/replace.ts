import { Context } from "netlify:edge";

export default async (request: Request, context: Context) => {

  // Just return what was requested without transforming it,
  // unless we fnd the query parameter for this demo
  const url = new URL(request.url);
  if (url.searchParams.get("replace") !== "canon") {
    return;
  }

  console.log("Replace canonical");

  // Get the page content
  const response = await context.next();
  const page = await response.text();

  // Search for the placeholder

  const canon = document.querySelector("link[rel='canonical']");
  const canonhref = document.querySelector("link[rel='canonical']").href;

  // Replace the content
  const updatedPage = page.replace(canonhref, canon);
  return new Response(updatedPage, response);
};
