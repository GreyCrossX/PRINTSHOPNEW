interface ProductCardProps {
    title: string;
    color: string;
    items: string[];
  }
  
  export default function ProductCard({ title, color, items }: ProductCardProps) {
    return (
      <div
        className=" md:w-[200px] p-4 bg-[#f9f9f9] shadow-[rgba(0,0,15,0.5)_10px_5px_4px_0px] border-r-2 border-black my-2 hover:scale-105"
        style={{ borderColor: color }}
      >
        <h2
          className="font-bold mb-3 uppercase text-md h-8"
          style={{
            color: color,
            background: `linear-gradient(to right, transparent, ${color.replace("rgb", "rgba").replace(")",",0.5")})`,
          }}
        >
                    <div
          className="relative right-0 float-end w-4 h-8 mb-3 rounded-s-full"
          style={{
            backgroundColor: color,
          }}
        />
          {title}
        </h2>

        <ul className="list-none p-0">
          {items.map((item, index) => (
            <li key={index} className="text-sm mb-2 text-slate-950">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  