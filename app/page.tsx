"use client";

import { useState, useEffect, useRef } from "react";
import { Product } from "@/types/product";
import ProductForm from "@/components/ProductForm";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SideMenu from "@/components/SideMenu";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [filterText, setFilterText] = useState("");
  const [filterField, setFilterField] = useState<
    "name" | "supplierEmail" | "price" | "entryDate"
  >("name");
  const [filterOperator, setFilterOperator] = useState<
    "contains" | "equal" | "greater" | "less"
  >("contains");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) setProducts(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleSave = (product: Product) => {
    const updated = editingProduct
      ? products.map((p) => (p.id === product.id ? product : p))
      : [...products, product];

    setProducts(updated);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100); // Pequeño delay para asegurar que se monte primero
  };

  const handleDelete = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    toast.success("Producto eliminado con éxito");
  };

  const filterProduct = (product: Product) => {
    const val = product[filterField];

    if (filterField === "price") {
      const target = parseFloat(filterText);
      if (isNaN(target)) return true;

      if (filterOperator === "equal") return product.price === target;
      if (filterOperator === "greater") return product.price > target;
      if (filterOperator === "less") return product.price < target;
    }

    if (filterField === "entryDate") {
      if (!filterText) return true;
      if (filterOperator === "equal") return product.entryDate === filterText;
      if (filterOperator === "greater") return product.entryDate > filterText;
      if (filterOperator === "less") return product.entryDate < filterText;
    }

    return val.toString().toLowerCase().includes(filterText.toLowerCase());
  };

  const filteredProducts = products.filter(filterProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <div>
        <SideMenu />
      </div>

      <h1 className="text-3xl font-bold text-white">
        📦 Catálogo de Productos
      </h1>

      <Card ref={formRef}>
        <CardHeader>
          <CardTitle>
            {editingProduct ? "Editar Producto" : "Agregar Producto"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm
            onSave={handleSave}
            editingProduct={editingProduct}
            onCancelEdit={() => setEditingProduct(null)}
          />
        </CardContent>
      </Card>

      {products.length > 0 && (
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">
              📋 Lista de Productos
            </h2>

            <div className="flex flex-wrap gap-2 items-center">
              {filterField === "entryDate" ? (
                <Input
                  type="date"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  className="flex-1 text-white placeholder:text-white"
                  placeholder="Filtrar por fecha"
                />
              ) : (
                <Input
                  type="text"
                  inputMode={filterField === "price" ? "decimal" : undefined}
                  pattern={
                    filterField === "price" ? "[0-9]*[.,]?[0-9]*" : undefined
                  }
                  value={filterText}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (filterField === "price") {
                      const valid = /^[0-9]*[.,]?[0-9]*$/.test(value);
                      if (!valid && value !== "") return;
                    }
                    setFilterText(value);
                  }}
                  className="flex-1 text-white placeholder:text-white"
                  placeholder={
                    filterField === "name"
                      ? "Filtrar por nombre"
                      : filterField === "supplierEmail"
                      ? "Filtrar por proveedor"
                      : "Filtrar por precio"
                  }
                />
              )}

              <Select
                value={filterField}
                onValueChange={(val) => {
                  const typedVal = val as
                    | "name"
                    | "supplierEmail"
                    | "price"
                    | "entryDate";

                  setFilterText(""); // ⛔ Limpiar el input al cambiar el campo
                  setFilterField(typedVal);

                  if (typedVal === "price" || typedVal === "entryDate") {
                    setFilterOperator("equal");
                  } else {
                    setFilterOperator("contains");
                  }
                }}
              >
                <SelectTrigger className="w-[150px] text-white">
                  <SelectValue placeholder="Campo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nombre</SelectItem>
                  <SelectItem value="supplierEmail">Proveedor</SelectItem>
                  <SelectItem value="price">Precio</SelectItem>
                  <SelectItem value="entryDate">Fecha</SelectItem>
                </SelectContent>
              </Select>

              {(filterField === "price" || filterField === "entryDate") && (
                <Select
                  value={filterOperator}
                  onValueChange={(val) =>
                    setFilterOperator(val as "equal" | "greater" | "less")
                  }
                >
                  <SelectTrigger className="w-[130px]  text-white placeholder:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equal">Igual</SelectItem>
                    <SelectItem value="greater">Mayor</SelectItem>
                    <SelectItem value="less">Menor</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <Card key={product.id} className="transition hover:scale-[1.01]">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold ">{product.name}</h3>
                    <span className="bg-green-600/80 text-white text-sm font-medium px-3 py-1 rounded-full shadow-inner">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="text-sm space-y-1 ">
                    <p>
                      <span className="font-semibold">Proveedor:</span>{" "}
                      {product.supplierEmail}
                    </p>
                    <p>
                      <span className="font-semibold">Fecha de ingreso:</span>{" "}
                      {product.entryDate}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full">
                    <Button
                      variant="outline"
                      onClick={() => handleEdit(product)}
                      className="w-full sm:w-auto"
                    >
                      Editar
                    </Button>

                    <div className="w-full sm:w-auto">
                      <ConfirmDialog
                        title="Eliminar producto"
                        description={`¿Seguro que deseas eliminar el producto "${product.name}"?`}
                        onConfirm={() => handleDelete(product.id)}
                        trigger={
                          <Button
                            variant="destructive"
                            className="w-full sm:w-auto"
                          >
                            Eliminar
                          </Button>
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground">
              No se encontraron resultados.
            </p>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-4">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
