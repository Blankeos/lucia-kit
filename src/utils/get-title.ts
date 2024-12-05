const TITLE_TEMPLATE = "%s | Lucia Kit";

export default function getTitle(title: string = "Home") {
  return TITLE_TEMPLATE.replace("%s", title);
}
