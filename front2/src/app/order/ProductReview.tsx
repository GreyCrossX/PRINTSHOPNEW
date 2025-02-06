import React, { useEffect, useState } from "react";
import { LocalOrder, ProductType, Users } from '@/lib/schemas';
import HoverCard from "./hoverCard";
import OrderCard from "./orderCard";
import FormWrapper from "@/components/FormWrapper";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Info, Trash2 } from "lucide-react";

type LocalOrders = LocalOrder[];
type UsersType = Users[];
type Products = ProductType[];
type SetErrors = React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
type SetLocalOrders = React.Dispatch<React.SetStateAction<LocalOrder[]>>;
type CurrentOrder = {
  userName: string;
  lastName: string;
  productName: string;
  variantsWithNames: { variantName: string; variantRenderName:string; optionName: string | null; customInput:string | null  }[];
  orderId: number;
  clientID: number | null;
  productId: number | null;
  variantsIDs: {
    variant: number;
    option: number;
    custom_option_input?: string | null;
  }[];
}

export default function ProductReview2({
  localOrders,
  users,
  products,
  setErrors,
  setLocalOrders,
  goTo,
}: {
  localOrders: LocalOrders;
  users: UsersType;
  products: Products;
  setErrors: SetErrors;
  setLocalOrders: SetLocalOrders;
  goTo: (index: number) => void;
}) {
  const [hoveredOrderId, setHoveredOrderId] = useState<number | null>(null);
  const [currentOrders, setCurrentOrders] = useState<CurrentOrder[]>([])
  const [editOrder, setEditOrder] = useState<LocalOrder>()
  const [hoverOpen, setHoverOpen] = useState<Record<number,boolean>>({})
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<number | null>(null);


  const handleEdit = (orderId: number, newOrder: LocalOrder) => {
    setEditOrder({ ...newOrder, orderId });
    };
    
  

  const handleDelete = (orderId: number) => {
    const updatedOrders = localOrders.filter(order => order.orderId !== orderId)
    setLocalOrders(updatedOrders)
  };
  
  useEffect(() => {
    if (!editOrder) return; 
  
    const id = editOrder.orderId;
    const localOrder = localOrders.find((i) => i.orderId === id);
  
    if (!localOrder) return; 
  
    const updatedOrder = {
      orderId: id,
      clientID: localOrder.clientID,
      productId: localOrder.productId,
      variantsIDs: editOrder.variantsIDs,
    };
  
    setLocalOrders((prev) =>
      prev.map((order) =>
        order.orderId === id ? { ...order, ...updatedOrder } : order
      )
    );

    // Close the dialog for the edited order
    setHoverOpen((prev) => ({ ...prev, [id]: false }));
    setHoveredOrderId(null);
  
    // Reset editOrder state
    setEditOrder(undefined);
    
  }, [editOrder, localOrders, setLocalOrders]);
  
  

  useEffect(() => {
    const validOrders = (localOrders: LocalOrder[]) => {
      return localOrders.filter((o) => {
        const validUser = o.clientID !== null;
        const validID = o.orderId !== null;
        const validProduct = o.productId !== null;
        return validID && validUser && validProduct;
      });
    };
  
    const filteredOrders = validOrders(localOrders);
  
    const renderOrders = filteredOrders.map((order) => {
      const user = users.find((u) => u.id === order.clientID);
      console.log("buscando...",user)
      const product = products.find((p) => p.id === order.productId);
  
      const userName = user ? user.name : "Unknown name";
      const lastName = user ? user.last_name : "Unknown last name";
      const productName = product ? product.name : "Unknown product";

      const variantsWithNames = order.variantsIDs.map((variantObj) => {
        const variant = product?.variants.find((v) => v.id === variantObj.variant);
        const option = variant?.options.find((o) => o.id === variantObj.option);
        const variantName = variant ? variant.name : "Unknown variant";
        const variantRenderName = variant ? variant.render_name : "Unknown variant";
        const optionName = option?.description || null
        const customInput = variantObj.custom_option_input || null

  
        return {
          variantName,
          variantRenderName,
          optionName,
          customInput
        };
      });
  
      return {
        ...order,
        userName,
        lastName,
        productName,
        variantsWithNames,
      };
    });
  
    setCurrentOrders(renderOrders);
  }, [localOrders, users, products, setHoverOpen]);
  

  useEffect(() => {
    if (currentOrders.length > 0) {
        setErrors({3:false})
    } else {
        setErrors({3:true})
    }
  }, [currentOrders, setErrors])

  const handleDeleteClick = (orderId: number) => {
    setOrderToDelete(orderId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (orderToDelete !== null) {
      handleDelete(orderToDelete);
      setDeleteDialogOpen(false);
      setOrderToDelete(null);
    }
  };

  return (
    <FormWrapper
      title="Selección de Productos"
      description="Seleccione el producto que desea y podrá elegir entre una variedad de opciones:"
    >
      <div className="h-[580px] max-h-[45vh] overflow-auto">
        {currentOrders.length === 0 && (
             <div className="flex flex-col items-center justify-center h-full min-h-[300px] bg-white rounded-lg shadow-lg p-8 space-y-6 border border-gray-200">
             <div className="text-center space-y-2">
               <h3 className="text-2xl font-semibold text-gray-800">No hay órdenes para mostrar</h3>
               <p className="text-gray-600">Comienza añadiendo tu primera orden</p>
             </div>
             <Button
               type="button"
               onClick={() => goTo(1)}
               className="px-6 py-2"
             >
               Añadir Orden
             </Button>
           </div>
          )}
        {currentOrders.map((order, index) => (
          
          <div
            key={order.orderId}
            className="relative"
            onMouseEnter={() => setHoveredOrderId(order.orderId)}
            onMouseLeave={() => setHoveredOrderId(null)}
          >
                        <Dialog open={hoverOpen[order.orderId]} onOpenChange={(isOpen) => {
  setHoverOpen((prev) => ({ ...prev, [order.orderId]: isOpen }));
}}>
            <OrderCard {...{ order, index }} />
            {hoveredOrderId === order.orderId && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center transition-opacity duration-200 p-4">
                <div className="flex space-x-2 mb-2">
                  <DialogTrigger asChild>
                    <Button variant="secondary" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Editar orden
                    </Button>
                  </DialogTrigger>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteClick(order.orderId)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar orden
                  </Button>
                </div>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto sm:min-w-48 whitespace-nowrap">
                    <Info className="mr-2 h-4 w-full" />
                    Detalles
                  </Button>
                </DialogTrigger>
              </div>
            )}

                <HoverCard
                  order={order}
                  id={order.orderId}
                  onEdit={(newOrder:LocalOrder) => handleEdit(order.orderId, newOrder)}
                  onDelete={() => handleDelete(order.orderId)}
                  products={products}
                />
            </Dialog>
          </div>
        ))}

        {/* Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar eliminación</DialogTitle>
              <DialogDescription>
                ¿Está seguro que desea eliminar esta orden? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
              >
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </FormWrapper>
  );
}
