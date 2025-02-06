import { useEffect, useState } from "react";
import { Order } from "./orderCard";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Dialog } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { LocalOrder, ProductType } from "@/lib/schemas";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { Button } from "@/components/ui/button";

type HoverCardProps = {
  order: Order;
  id: number;
  onEdit: (newOrder: LocalOrder) => void;
  onDelete: () => void;
  products: ProductType[];
};

export default function HoverCard({
  order,
  onEdit,
  onDelete,
  products,
}: HoverCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [originalOrder, setOriginalOrder] = useState(order);
  const [editedOrder, setEditedOrder] = useState<Order>(order);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleSpecChange = (newOption: string, variantName: string) => {
    const updatedVariants = editedOrder.variantsWithNames.map((variant) => {
      if (variant.variantName === variantName) {
        return { ...variant, optionName: newOption };
      }
      return variant;
    });
    setEditedOrder({ ...editedOrder, variantsWithNames: updatedVariants });
  };

  const onSaveChanges = () => {
    const newOrder = {
      orderId: 0,
      clientID: 0,
      productId: 0,
      variantsIDs: editedOrder.variantsWithNames.map((variant) => {
        const product = products.find((p) => p.name === editedOrder.productName);
        const variantMatch = product?.variants.find((v) => v.name === variant.variantName);
        const optionMatch = variantMatch?.options.find((o) => o.description === variant.optionName);

        return {
          variant: variantMatch?.id || 0,
          option: optionMatch?.id || 0,
          custom_option_input: variant.customInput || null
        };

      }),
    };

    onEdit(newOrder);
    setOriginalOrder(editedOrder)
    console.log(newOrder)
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    onDelete();
    setDeleteDialogOpen(false);
  };

  const sortOptions = (options: { id: number; description: string; is_optional: boolean }[]) => {
    return [...options].sort((a, b) => Number(a.is_optional) - Number(b.is_optional));
  };

  useEffect(() => {
    if (JSON.stringify(editedOrder) !== JSON.stringify(originalOrder)) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [editedOrder, originalOrder]);

  return (
    <>
      <DialogContent className="max-w-[425px] max-h-[80vh] bg-[#00579e]">
        <DialogTitle className="font-bold text-xl text-white">Resúmen de la orden</DialogTitle>
        <DialogHeader className="text-lg font-semibold bg-white p-2 rounded-md">Producto: {editedOrder.productName}</DialogHeader>
        <DialogDescription className="bg-white p-2 rounded-md">
          Si desea hacer cambios a su orden, seleccione un cambio dentro de la lista.
        </DialogDescription>
        <div className="grid gap-4 py-4 bg-slate-200 px-3 rounded-md max-h-[50vh] overflow-scroll">
          {editedOrder.variantsWithNames.map((variant, index) => {
            const product = products.find((p) => p.name === editedOrder.productName);
            const matchingVariant = product?.variants.find((v) => v.name === variant.variantName);
            const selectedOption = matchingVariant?.options.find((o) => o.description === variant.optionName)

            return (
              <div key={index} className="mb-4">
                <Select
                  value={variant.optionName || ""}
                  onValueChange={(newValue) => handleSpecChange(newValue, variant.variantName)}
                >
                  <SelectTrigger id={`variant-${index}`} className="bg-white">
                    {variant.optionName || "Seleccione una opción"}
                  </SelectTrigger>

                  <SelectContent>
                    {matchingVariant?.options &&
                      sortOptions(matchingVariant.options).map((option) => (
                        <div key={option.id}>
                          <SelectItem value={option.description}>
                            {option.description}
                          </SelectItem>
                        </div>
                      ))}
                  </SelectContent>
                </Select>

                {selectedOption?.is_optional && (
                  <input
                    type="text"
                    className="mt-2 block w-full border border-gray-300 rounded-md p-2"
                    placeholder={variant.customInput == undefined ? "Ingrese un valor para la opción seleccionada" : variant.customInput}
                    onChange={(e) => {
                      const updatedVariants = editedOrder.variantsWithNames.map((v) =>
                        v.variantName === variant.variantName
                          ? { ...v, customInput: e.target.value }
                          : v
                      );
                      setEditedOrder({ ...editedOrder, variantsWithNames: updatedVariants });
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-end gap-4">
          {isEditing && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  disabled={!isEditing}
                >
                  Guardar Cambios
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Está seguro que desea modificar su orden?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                  Esta acción modificará la orden existente.
                </AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={onSaveChanges}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <Button
            variant="destructive"
            onClick={handleDeleteClick}
          >
            Eliminar orden
          </Button>
        </div>
      </DialogContent>

      {/* Delete Confirmation Dialog */}
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
    </>
  );
}
