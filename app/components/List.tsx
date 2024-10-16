interface ListProps {
  items: string[];
}

const List = ({ items }: ListProps) => {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2 p-2 bg-zinc-800 text-white"
        >
          <div>{item}</div>
        </div>
      ))}
    </div>
  );
};
