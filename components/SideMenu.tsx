"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Product } from "@/types/product";

export default function SideMenu() {
  const handleLoadData = () => {
    const dummyProducts: Product[] = [
      {
        id: crypto.randomUUID(),
        name: "Notebook Lenovo IdeaPad 3",
        price: 459.99,
        supplierEmail: "ventas@tecnoshop.com",
        entryDate: "2025-06-20",
      },
      {
        id: crypto.randomUUID(),
        name: "Monitor LG 24'' Full HD",
        price: 189.5,
        supplierEmail: "distribuidor@visualtech.com",
        entryDate: "2025-06-18",
      },
      {
        id: crypto.randomUUID(),
        name: "Mouse Logitech MX Master 3",
        price: 99.99,
        supplierEmail: "contacto@perifericosuy.com",
        entryDate: "2025-06-25",
      },
      {
        id: crypto.randomUUID(),
        name: "Teclado Redragon K552 RGB",
        price: 59.9,
        supplierEmail: "ventas@hardstore.uy",
        entryDate: "2025-06-27",
      },
      {
        id: crypto.randomUUID(),
        name: "Disco SSD Kingston 1TB NVMe",
        price: 89.0,
        supplierEmail: "almacen@digitalexpress.uy",
        entryDate: "2025-06-19",
      },
      {
        id: crypto.randomUUID(),
        name: "Auriculares Sony WH-CH520",
        price: 65.75,
        supplierEmail: "soporte@sonyaudio.com",
        entryDate: "2025-06-21",
      },
      {
        id: crypto.randomUUID(),
        name: "Impresora HP DeskJet 2720e",
        price: 105.0,
        supplierEmail: "ventas@printshop.com",
        entryDate: "2025-06-23",
      },
      {
        id: crypto.randomUUID(),
        name: "Silla Gamer Cougar Armor One",
        price: 259.0,
        supplierEmail: "distribuidor@gamingworld.uy",
        entryDate: "2025-06-26",
      },
      {
        id: crypto.randomUUID(),
        name: "Router TP-Link Archer AX23",
        price: 74.99,
        supplierEmail: "soporte@tplinkuy.com",
        entryDate: "2025-06-22",
      },
      {
        id: crypto.randomUUID(),
        name: "Tablet Samsung Galaxy Tab A8",
        price: 219.0,
        supplierEmail: "contacto@samsunguy.com",
        entryDate: "2025-06-24",
      },
    ];

    localStorage.setItem("products", JSON.stringify(dummyProducts));
    toast.success("Datos de prueba cargados");

    // 🔁 Forzar refresh real de la página
    window.location.reload();
  };

  const handleClearData = () => {
    localStorage.removeItem("products");
    toast.success("Datos eliminados");

    // 🔁 Forzar refresh real de la página
    window.location.reload();
  };

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          ☰ Menú
        </Button>
      </DrawerTrigger>

      <DrawerContent className="p-4 space-y-4">
        <DrawerTitle className="text-lg font-semibold px-2">
          Menú de opciones
        </DrawerTitle>

        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleLoadData}
        >
          📤 Cargar Datos de Prueba
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start text-red-600"
          onClick={handleClearData}
        >
          🗑️ Eliminar Datos de Prueba
        </Button>

        <DrawerClose asChild>
          <Button variant="secondary" className="w-full mt-4">
            Cerrar menú
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}
