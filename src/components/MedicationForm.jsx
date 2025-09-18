import React from "react";
import { useForm } from "react-hook-form";
import "./MedicationForm.css";

export default function MedicationForm({ defaultValues = {}, onSubmit, buttonLabel = "Guardar" }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="medication-form">

      <div className="form-field">
        <label className="name-input">Nombre:</label>
        <input type="text" {...register("name", { required: "Este campo es obligatorio" })} />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>

      <div className="form-field">
        <label className="dosis-input">Dosis:</label>
        <input type="text" {...register("dose", { required: "Indica la dosis" })} />
        {errors.dose && <span className="error">{errors.dose.message}</span>}
      </div>

      <div className="form-field">
        <label className="frecuence-input">Frecuencia:</label>
        <input type="text" {...register("frequency", { required: "Indica la frecuencia" })} />
        {errors.frequency && <span className="error">{errors.frequency.message}</span>}
      </div>

      <div className="form-field">
        <label className="data-input">Fecha y Hora:</label>
        <input type="datetime-local" {...register("datetime", { required: "Selecciona fecha y hora" })} />
        {errors.datetime && <span className="error">{errors.datetime.message}</span>}
      </div>

        <div className="form-field">
        <label className="alergy-input">Alergias:</label>
        <input type="text" {...register("frequency", { required: "Indica la frecuencia" })} />
        {errors.frequency && <span className="error">{errors.frequency.message}</span>}
      </div>

    </form>
  );
}