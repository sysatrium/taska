import { normalizeDocument } from "./goalsDocument";
import type { RichTextDocument } from "./types";

type Props = {
  document: RichTextDocument;
};

export function GoalsPreview({ document }: Props) {
  const goals = normalizeDocument(document);
  if (goals.content.length === 0) return <p className="muted-text">Goals пока не заданы.</p>;

  return (
    <section className="goals-preview" aria-label="Предпросмотр goals">
      {goals.content.map((block, index) => {
        if (block.type === "heading") return <h3 key={index}>{block.text}</h3>;
        if (block.type === "listItem") return <p key={index}>- {block.text}</p>;
        return <p key={index}>{block.text}</p>;
      })}
    </section>
  );
}
