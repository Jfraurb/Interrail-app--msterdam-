const normas = [
  { t: "Carril bici siempre", d: "Circula por el carril bici (fietspad) cuando exista. Nunca por la acera: es habitual y está mal visto." },
  { t: "Semáforos de bici", d: "Los semáforos para bicis son redondos y más pequeños que los de coches. Respétalos aunque veas a otros saltárselos." },
  { t: "Señaliza los giros", d: "Extiende el brazo hacia el lado al que vas a girar, unos metros antes. Aquí se espera y se sobreentiende." },
  { t: "Raíles de tranvía", d: "Cruza las vías del tranvía siempre en un ángulo lo más perpendicular posible. En paralelo, la rueda puede quedar atrapada y hacerte caer." },
  { t: "Luces si oscurece", d: "Luz blanca delantera y roja trasera son obligatorias desde el anochecer. La ruta incluye el atardecer: llévalas encendidas ya al final del día." },
  { t: "No pares en el carril", d: "Si te detienes a mirar el móvil o hacer una foto, apártate del carril bici por completo. Es la queja número uno de los locales." },
  { t: "Cuidado con motos y scooters", d: "Comparten carril con las bicis y van más rápido. Mira atrás antes de cambiar de línea." },
  { t: "Aparca y candado", d: "Usa siempre un candado de aro (U-lock) en la rueda y el cuadro, enganchado a un soporte fijo. No la dejes bloqueando un carril o una puerta." },
  { t: "Evita saturación si hay opción", d: "En calles muy llenas de peatones (Nueve Calles, Bloemenmarkt), es más seguro y más rápido caminar la bici que intentar circular." },
  { t: "Sin móvil circulando", d: "Consulta el mapa parado, no en marcha. Un vistazo rápido aquí puede acabar en el canal." },
];

export default function ConsejosScreen() {
  return (
    <div className="min-h-screen bg-stone-50 pt-safe">
      <header className="px-5 pt-5 pb-3">
        <h2 className="font-display font-bold text-2xl text-ink">Normas de bici</h2>
        <p className="text-ink/50 text-[13px] mt-0.5">Lo esencial para circular como un local, no como un turista</p>
      </header>

      <div className="px-5 pb-safe space-y-3">
        {normas.map((n, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-card p-4 flex gap-3">
            <span className="font-mono text-xs text-fiets-dark font-semibold pt-0.5 shrink-0 w-6">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display font-semibold text-[15px] text-ink">{n.t}</h3>
              <p className="text-[13.5px] text-ink/70 leading-relaxed mt-0.5">{n.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
