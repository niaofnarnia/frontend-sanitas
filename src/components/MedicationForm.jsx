import React from "react";
import { useForm } from "react-hook-form";
import "../components/MedicationForm.css"; 

export default function MedicationForm({ defaultValues = {}, onSubmit, buttonLabel = "Guardar" }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="medication-form">
      <h2>{buttonLabel === "Guardar" ? "Añadir Medicación" : "Editar Medicación"}</h2>

      <div>
        <label>Nombre:</label>
        <input type="text" {...register("name", { required: "Este campo es obligatorio" })} />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>

      <div>
        <label>Dosis:</label>
        <input type="text" {...register("dose", { required: "Indica la dosis" })} />
        {errors.dose && <p className="error">{errors.dose.message}</p>}
      </div>

      <div>
        <label>Frecuencia:</label>
        <input type="text" {...register("frequency", { required: "Indica la frecuencia" })} />
        {errors.frequency && <p className="error">{errors.frequency.message}</p>}
      </div>

      <div>
        <label>Fecha y Hora:</label>
        <input type="datetime-local" {...register("datetime", { required: "Selecciona fecha y hora" })} />
        {errors.datetime && <p className="error">{errors.datetime.message}</p>}
      </div>

      <button type="submit">{buttonLabel}</button>
    </form>
  );
}