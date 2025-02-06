"use client"
import { useEffect, useState } from "react";
import { useMultiplestepForm } from "@/hooks/useMultiForm";
import { Button } from "@/components/ui/button";
import SideBar from "@/components/SideBar";
import { AnimatePresence } from "framer-motion";
import UserInfoForm from "@/app/order/UserInfoForm";
import ProductSelect from "./ProductSelect";
import ProductReview from "./ProductReview";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {  
  LocalOrder, ProductType, Users, 
  defaultLocalOrder, defaultProducts,
  defaultUser, defaultUsers
} from "@/lib/schemas";

export default function MainComponent() {

  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goTo,
  } = useMultiplestepForm(3);

  const [products, setProducts] = useState<ProductType[]>(defaultProducts);
  const [clientID, setClientID] = useState<number | null>(null);
  const [user, setUser] = useState<Users[]>(defaultUsers);
  const [errors, setErrors] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
  });
  const [localOrder, setLocalOrder] = useState<LocalOrder>(defaultLocalOrder);
  const [localOrders, setLocalOrders] = useState<LocalOrder[]>([]);
  const [sendData, setSendData] = useState(false);
  const [orderCounter, setOrderCounter] = useState(0);
  const [deniedNext, setDeniedNext] = useState(false)
  const [currentUser, setCurrentUser] = useState<Users>(defaultUser)
  const [orderSent, setOrderSent] = useState(false)


  const {toast} = useToast()

  const router = useRouter()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const request = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/`
        );
        if (request.ok) {
          const userData: Users[] = await request.json();

          setUser(userData);
        } else {
          console.log("User not found. Server status:", request.status);
        }
      } catch (error) {
        console.log("Error fetching users. Error:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const request = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/`
        );
        if (request.ok) {
          const productData: ProductType[] = await request.json();
          setProducts(productData);
        } else {
          console.log("Products not found. Server status:", request.status);
        }
      } catch (error) {
        console.log("Error fetching products. Error:", error);
      }
    };
    fetchProducts();
  }, []);

  

  useEffect(() => {
    if (typeof window !== "undefined" && sendData) {
      const validOrders = localOrders.filter(
        (order) =>
          order.productId &&
          order.variantsIDs &&
          order.variantsIDs.length > 0
      );
  
      const promises = validOrders.map((order) => {
        const product = products.find((p) => p.id === order.productId);
        const productName = product ? product.name : "Producto Desconocido";
  
        const formattedVariants = order.variantsIDs.map((variant) => {
          const variantInfo = product?.variants.find((v) => v.id === variant.variant);
          const variantName = variantInfo ? variantInfo.render_name : "Variante desconocida";
          const optionInfo = variantInfo?.options.find((o) => o.id === variant.option);
          const optionDescription = optionInfo ? optionInfo.description : "Opción desconocida";
          
          return `- ${variantName}: ${optionDescription}${variant.custom_option_input ? ` (${variant.custom_option_input})` : ""}`;
        }).join("\n");
  
        const orderSummary = `🛒 **Orden #${order.orderId}**\n**Producto:** ${productName}\n${formattedVariants}`;
  
        const postData = {
          order: {
            user: clientID,
            product: order.productId,
          },
          specs: order.variantsIDs.map((variant) => ({
            variant: variant.variant,
            option: variant.option,
            custom_option_input: variant.custom_option_input,
          })),
        };
  
        return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create_order/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        })
          .then((response) => {
            if (response.ok) {
              toast({
                title: "Orden enviada con éxito",
                description: orderSummary,
              });
              console.log(`Orden ${order.orderId} creada correctamente`);
            } else {
              console.error(`Error al enviar la orden ${order.orderId}. Respuesta del servidor: ${response.status}`);
            }
          })
          .catch((error) => {
            toast({
              title: "Error al enviar la orden",
              description: "Por favor, intente nuevamente más tarde",
              variant: "destructive",
            });
            console.error(`Error al enviar la orden ${order.orderId}:`, error);
          });
      });
  
      Promise.all(promises).then(() => {
        setOrderCounter(0);
        setLocalOrders([]);
        setClientID(0);
        goTo(0);
        setTimeout(() => {
          setOrderSent(true);
        }, 2000);
      });
    }
  }, [sendData, clientID, localOrders, products, toast, goTo]);
  

  useEffect(() => {
    if(orderSent) {
        window.location.href ="/order"
    }
  },[orderSent, router])


  useEffect (() => {
    if (!errors[currentStepIndex]) {
      setDeniedNext(false)
    }
  }, [currentStepIndex, errors])

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate current step errors
    if (errors[currentStepIndex]) {
        setDeniedNext(true);
        console.error('Errors found:', errors[currentStepIndex]);
        return;
    }

    // If on step 2 (currentStepIndex == 1)
    if (currentStepIndex === 1) {
        if (!localOrder || Object.keys(localOrder).length === 0) {
            console.error('No local order to save.');
            return;
        }

        console.log('Saving Local Order:', localOrder);

        setLocalOrders((prevOrders) => [
            ...prevOrders, // Keep existing orders
            {
                ...localOrder,
                clientID,
                orderId: orderCounter,
            }
        ]);

        setOrderCounter((prev) => prev + 1); // Increment order counter
        nextStep(); // Move to the next step
        return;
    }

    // If on the last step
    if (isLastStep) {
        console.log('Finalizing submission...');
        setSendData(true);
    } else {
        nextStep();
        setDeniedNext(false);
    }
};




  useEffect(() => {console.log(errors)},[errors])

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-160px)] p-4 min-w-full">
      <div className="min-h-12 text-6xl text-slate-800 font-bold mb-6 text-center hidden md:block">
      {currentUser.name !== "" && <h1 className="absolute w-fit mx-auto">¡Hola, {currentUser.name}!</h1>}
      </div>
    <div className="flex justify-center items-center  text-slate-950 p-2 min-w-[65%]">
      
    {/* Wrapper Container */}
    <div
      className={`flex flex-col md:flex-row md:justify-between overflow-hidden max-h-[80vh] w-full md:w-11/12 max-w-4xl relative rounded-lg border border-slate-500 bg-slate-300 shadow-md shadow-black/30 p-4 ${
        deniedNext ? "border-red-500 border-4" : "border-transparent"
      }`}
    >
      {/* Sidebar */}

        <SideBar
          currentStepIndex={currentStepIndex}
          goTo={goTo}
          deniedNext={deniedNext}
          errors={errors}
          setDeniedNext={setDeniedNext}
        />
  
      {/* Main Content */}
      <main 
        className="flex-1 flex flex-col overflow-auto bg-[#00579e] p-4 rounded-lg"
        role="main"
        aria-label="Formulario de órdenes"
      >
          <form className="flex flex-col justify-between h-full" onSubmit={handleOnSubmit}>
            <AnimatePresence mode="wait">
              {/* Steps */}
              {currentStepIndex === 0 && (
                <UserInfoForm
                  users={user}
                  setClientID={setClientID}
                  setErrors={setErrors}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              )}
              {currentStepIndex === 1 && (
                <ProductSelect
                  products={products}
                  setLocalOrder={setLocalOrder}
                  setErrors={setErrors}
                />
              )}
              {currentStepIndex === 2 && (
                <ProductReview
                  localOrders={localOrders}
                  users={user}
                  products={products}
                  setErrors={setErrors}
                  setLocalOrders={setLocalOrders}
                  goTo={goTo}
                />
              )}
            </AnimatePresence>
  
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4">
              <Button
                onClick={previousStep}
                type="button"
                variant="ghost"
                className={`${isFirstStep ? 'invisible' : 'visible relative text-slate-800 shadow-lg bg-green-500 border border-black/20 shadow-black/20 rounded-xl hover:text-white hover:bg-green-700'}`}
              >
                {currentStepIndex === 1 ? 'Atrás' : 'Añadir nueva orden'}
              </Button>
              <Button
                type="submit"
                className="relative text-slate-800 bg-green-500 shadow-black/20 shadow-lg hover:bg-green-700 border border-black/20 rounded-xl hover:text-white"
              >
                {isLastStep ? "Enviar" : "Siguiente"}
              </Button>
            </div>
          </form>
      </main>
    </div>
  </div>
  </div>
  )}  