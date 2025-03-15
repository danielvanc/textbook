import { type Post } from "@prisma/client";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";

export function generateSlug(str: string, id: string) {
  const trimmedId = id.slice(-5);
  const stringToSlug = `${trimmedId}-${str}`;
  return stringToSlug
    .toLocaleLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function formatDate(date: Date) {
  return date
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    })
    .replace(/(\d{2}) /, "$1, "); // Add comma after day
}

export function sortPostsByDateDesc(posts: Post[]) {
  return posts.sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

export function formatValue(value: string) {
  try {
    // Check if value looks like JSON
    const parsedValue = JSON.parse(value);
    // Generate HTML from JSON content if it has the expected structure
    if (parsedValue && parsedValue.type === "doc") {
      return generateHTML(parsedValue, [StarterKit]);
    }
    return value; // Return as-is if parsed but not proper doc format
  } catch {
    return value;
  }
}
