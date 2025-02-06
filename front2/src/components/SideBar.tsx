import React from "react";
import { Info, ShoppingCart, ClipboardList } from "lucide-react"; // Example icon library

type NavProps = {
  currentStepIndex: number;
  goTo: (index: number) => void;
  deniedNext: boolean;
  errors: Record<number, boolean>;
  setDeniedNext: React.Dispatch<boolean>
};

const steps = [
  { index: 0, label: "Info Cliente", icon: <Info className="md:w-5 w-4 h-4 md:h-5" /> },
  { index: 1, label: "Producto", icon: <ShoppingCart className="md:w-5 w-4 h-4 md:h-5" /> },
  { index: 2, label: "Resumen", icon: <ClipboardList className="md:w-5 w-4 h-4 md:h-5" /> },
];

const SideBar: React.FC<NavProps> = ({
  currentStepIndex,
  deniedNext,
  goTo,
  errors,
  setDeniedNext,
}) => {
  const handleGoTo = (step: { index: number }) => {
    if (errors[step.index - 1]) {
      setDeniedNext(true);
    } else {
      goTo(step.index);
      setDeniedNext(false);
    }
  };

  return (
    <div className="flex flex-col mx-auto md:w-[25%] w-[95%] p-2 md:p-4 text-slate-200">
      {/* Progress Bar */}
      <div className="w-full bg-slate-600 h-2 mb-4 rounded">
        <div
          className="bg-blue-500 h-2 rounded transition-all duration-300"
          style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="py-5 text-slate-200 bg-[#00579e] h-[80%] rounded-md border border-slate-500 md:p-5">
        <ul className="flex justify-center gap-2 md:flex-col">
          {steps.map((step) => (
            <li key={step.index} className="flex flex-col items-start font-medium">
              {/* Step Indicator */}
              <span
                className={`hidden ${currentStepIndex === step.index
                    ? "text-slate-100 uppercase text-xs text-md md:flex"
                    : "text-slate-200 uppercase text-xs md:flex"
                  }`}
              >
                Paso {step.index + 1}
              </span>

              {/* Step Button */}
              <button
                tabIndex={0}
                onClick={() => {
                  handleGoTo(step);
                }}
                onKeyDown={(e) => e.key === "Enter" && goTo(step.index)}
                className={`flex flex-col md:flex-row items-center gap-1 w-full p-2 rounded-lg transition-all duration-300 text-sm md:text-base ${currentStepIndex === step.index
                    ? "bg-blue-500 text-white font-semibold shadow-md"
                    : "text-slate-200 hover:bg-slate-700"
                  }`}
              >
                {step.icon}
                <span>{step.label}</span>
              </button>

            </li>
          ))}
        </ul>

      </nav>
      {deniedNext && <p className="text-red-500 mt-4">Ingrese toda la información y vuelva a intentarlo</p>}
    </div>
  );
};

export default SideBar