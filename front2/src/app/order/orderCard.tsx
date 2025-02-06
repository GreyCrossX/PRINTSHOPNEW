export type VariantWithNames = {
  customInput: string | null;
  variantName: string;
  variantRenderName: string;
  optionName: string | null;
};

export type Order = {
  orderId: number;
  userName: string;
  lastName: string;
  productName: string;
  variantsWithNames: VariantWithNames[];
};

export default function OrderCard({
  order,
  index,
}: {
  order: Order;
  index: number;
}) {


  return (
    <div
      className="relative mb-4 p-4 border border-slate-800 rounded-lg bg-slate-200 hover:shadow-lg hover:border-white hover:bg-gradient-to-r hover:from-blue-200 hover:to-green-200 transition-transform duration-300"
    >
      {/* Card Header */}
      <div className="bg-slate-400/50 mt-1 p-4 rounded-lg flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-slate-950 font-semibold">
              Cliente: {`${order.userName} ${order.lastName}`}
            </p>
            <p className="text-slate-900">Producto: {order.productName}</p>
          </div>
          <div>
            <p className="text-slate-700">Orden:</p>
            <p className="text-slate-700 text-right">{index + 1}</p>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <h4 className="mt-2 font-semibold">Especificaciones:</h4>
      <ul className="list-disc pl-5 max-h-[15vh] overflow-y-scroll  bg-slate-400/50 mt-1 text-slate-800 rounded-lg text-sm transition-[max-height] duration-300">
        {order.variantsWithNames.map((variant, variantIndex) => (
          <li key={variantIndex}>
            {variantIndex + 1}: {variant.variantRenderName}, Opción:{" "}
            {variant.customInput == null ? variant.optionName : variant.customInput}
          </li>
        ))}
      </ul>

     
    </div>
  );
}
