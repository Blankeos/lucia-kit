import type { HelperDelegate } from "handlebars";
type HandlebarsType = {
  registerHelper: (name: string, fn: HelperDelegate) => void;
};

export function handlebarsHelpers(handlebars: HandlebarsType) {
  handlebars.registerHelper("eq", function (a, b) {
    return a === b;
  });

  handlebars.registerHelper("or", function (..._args) {
    const args = _args.slice(0, -1); // last element is the 'or'
    return args.some((arg) => Boolean(arg));
  });
}
