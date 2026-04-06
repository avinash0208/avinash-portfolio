"use client";

type CommentNode = {
  id: string;
  author: string;
  message: string;
  children?: CommentNode[];
};

const dummyComments: CommentNode[] = [
  {
    id: "c1",
    author: "Asha",
    message: "Great architecture breakdown. How would you cache comment trees?",
    children: [
      {
        id: "c1-1",
        author: "Ravi",
        message: "Normalize by id and hydrate visible branches only.",
        children: [
          {
            id: "c1-1-1",
            author: "Asha",
            message: "Makes sense. Lazy loading replies should help too.",
          },
        ],
      },
    ],
  },
  {
    id: "c2",
    author: "Neha",
    message: "Thread indentation looks clean on mobile as well.",
  },
];

export function NestedCommentsDemo() {
  const renderNode = (node: CommentNode, depth = 0) => (
    <li key={node.id} className="space-y-2">
      <article className="rounded-lg border border-border bg-background/70 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">{node.author}</p>
        <p className="mt-1 text-xs sm:text-sm text-foreground/90">{node.message}</p>
      </article>
      {node.children?.length ? (
        <ul className="space-y-2 pl-3 sm:pl-4" style={{ marginLeft: `${Math.min(depth + 1, 3) * 4}px` }}>
          {node.children.map((child) => renderNode(child, depth + 1))}
        </ul>
      ) : null}
    </li>
  );

  return (
    <article className="section-card p-3 sm:p-4 lg:p-5">
      <h3 className="text-base sm:text-lg font-semibold">Nested Comments Demo</h3>
      <p className="mt-2 text-xs sm:text-sm text-muted">Dummy thread data rendered recursively.</p>
      <ul className="mt-3 space-y-2">{dummyComments.map((node) => renderNode(node))}</ul>
    </article>
  );
}
