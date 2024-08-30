export default function SuspenseView({ content }: Readonly<{ content: string }>) {
  return (
    <div className="flex h-10 items-center justify-center">
      <p className="f16 font-medium text-text_secondary">{content}</p>
    </div>
  );
}
