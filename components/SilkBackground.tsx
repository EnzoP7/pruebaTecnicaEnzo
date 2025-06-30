"use client";
import { cn } from "@/lib/utils"; // Si no usás esta función, podés eliminarla o usar clsx
import Silk from "./ui/slik";

type Props = {
  className?: string;
};

export default function SilkBackground({ className }: Props) {
  return (
    <div
      className={cn("fixed inset-0 -z-10 min-h-screen", className)}
      style={{ width: "100%", height: "100dvh" }}
    >
      <Silk
        speed={5}
        scale={1}
        color="#7B7481"
        noiseIntensity={1.5}
        rotation={0}
      />
    </div>
  );
}
