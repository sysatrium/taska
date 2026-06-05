import type { RichTextDocument } from "./types";

type GoalsBlock = {
  type: "heading" | "listItem" | "paragraph";
  text: string;
};

type GoalsDocument = {
  type: "doc";
  content: GoalsBlock[];
};

export function textToGoalsDocument(value: string): RichTextDocument {
  return {
    type: "doc",
    content: value
      .split("\n")
      .map(toBlock)
      .filter((block) => block.text.trim().length > 0)
  };
}

export function goalsDocumentToText(document: RichTextDocument): string {
  const goals = normalizeDocument(document);
  return goals.content.map(fromBlock).join("\n");
}

export function goalsPlainText(document: RichTextDocument): string {
  return normalizeDocument(document).content.map((block) => block.text).join(" ");
}

export function isGoalsDocumentEmpty(document: RichTextDocument): boolean {
  return goalsPlainText(document).trim().length === 0;
}

export function normalizeDocument(document: RichTextDocument): GoalsDocument {
  if (document.type === "doc" && Array.isArray(document.content)) {
    return { type: "doc", content: document.content.map(normalizeBlock).filter(Boolean) as GoalsBlock[] };
  }
  return { type: "doc", content: [] };
}

function toBlock(line: string): GoalsBlock {
  if (line.startsWith("# ")) return { type: "heading", text: line.slice(2).trim() };
  if (line.startsWith("- ")) return { type: "listItem", text: line.slice(2).trim() };
  return { type: "paragraph", text: line.trim() };
}

function fromBlock(block: GoalsBlock): string {
  if (block.type === "heading") return `# ${block.text}`;
  if (block.type === "listItem") return `- ${block.text}`;
  return block.text;
}

function normalizeBlock(value: unknown): GoalsBlock | null {
  if (!isRecord(value) || typeof value.text !== "string") return null;
  if (value.type === "heading" || value.type === "listItem" || value.type === "paragraph") return value as GoalsBlock;
  return { type: "paragraph", text: value.text };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
