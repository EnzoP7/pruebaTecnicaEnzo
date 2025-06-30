"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Product } from "@/types/product";
import { ProductFormData, productSchema } from "@/types/productSchema";
import { notify } from "@/components/Notifier"; // ✅ importamos la función

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

type ProductFormProps = {
  onSave: (product: Product) => void;
  editingProduct?: Product | null;
  onCancelEdit?: () => void;
};

export default function ProductForm({
  onSave,
  editingProduct,
  onCancelEdit,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const [openConfirm, setOpenConfirm] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (editingProduct) {
      setValue("name", editingProduct.name);
      setValue("price", editingProduct.price);
      setValue("supplierEmail", editingProduct.supplierEmail);
      setValue("entryDate", editingProduct.entryDate);
    } else {
      reset();
    }
  }, [editingProduct, setValue, reset]);

  const onSubmit = (data: ProductFormData) => {
    const product: Product = {
      id: editingProduct?.id || crypto.randomUUID(),
      ...data,
    };
    setPendingProduct(product);
    setOpenConfirm(true);
  };

  const onInvalid = () => {
    notify("Por favor completá todos los campos correctamente.", "error");
  };

  const confirmSave = () => {
    if (!pendingProduct) return;

    notify(
      editingProduct ? "Producto actualizado" : "Producto agregado",
      "success"
    );

    onSave(pendingProduct);
    setPendingProduct(null);
    reset();
    setOpenConfirm(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-4">
        <div>
          <Label>Nombre del producto</Label>
          <Input {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label>Precio</Label>
          <Input
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        <div>
          <Label>Correo del proveedor</Label>
          <Input type="email" {...register("supplierEmail")} />
          {errors.supplierEmail && (
            <p className="text-red-500 text-sm">
              {errors.supplierEmail.message}
            </p>
          )}
        </div>

        <div>
          <Label>Fecha de ingreso</Label>
          <Input type="date" {...register("entryDate")} />
          {errors.entryDate && (
            <p className="text-red-500 text-sm">{errors.entryDate.message}</p>
          )}
        </div>

        <div className="flex gap-2">
          <Button type="submit">
            {editingProduct ? "Actualizar producto" : "Agregar producto"}
          </Button>
          {editingProduct && onCancelEdit && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                onCancelEdit();
              }}
            >
              Cancelar
            </Button>
          )}
        </div>
      </form>

      <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar acción</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro que deseas{" "}
              {editingProduct ? "actualizar" : "agregar"} este producto?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button variant="destructive" onClick={confirmSave}>
              Confirmar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
