import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./PopUp.css";

export default function PopUp({
  nextDoseAt,
  preAlertMinutes = 5,
  medName = "",
  onTaken,
  onSnooze,
  closeOnOverlayClick = true,
}) {
  const target = useMemo(
    () => (nextDoseAt instanceof Date ? nextDoseAt : new Date(nextDoseAt)),
    [nextDoseAt]
  );

  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState("idle");
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const preTriggeredRef = useRef(false);
  const dueTriggeredRef = useRef(false);

  useEffect(() => {
    const tick = () => {
      const msLeft = target.getTime() - Date.now();

      if (msLeft <= 0 && !dueTriggeredRef.current) {
        dueTriggeredRef.current = true;
        setPhase("due");
        setIsOpen(true);
        return;
      }

      const preWindowMs = preAlertMinutes * 60 * 1000;
      if (msLeft <= preWindowMs && msLeft > 0 && !preTriggeredRef.current) {
        preTriggeredRef.current = true;
        setPhase("pre");
        setIsOpen(true);
        return;
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target, preAlertMinutes]);

  useEffect(() => {
    if (!isOpen) return;
    lastFocusedRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      const firstBtn = dialogRef.current?.querySelector(".btn-primary");
      (firstBtn || dialogRef.current)?.focus?.();
    }, 0);

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
      lastFocusedRef.current?.focus?.();
    };
  }, [isOpen]);

  const handleOverlayMouseDown = (e) => {
    if (closeOnOverlayClick && e.target === overlayRef.current) setIsOpen(false);
  };

  if (!isOpen) return null;

  const title =
    phase === "due"
      ? "¡Tienes que tomarte la medicación!"
      : "Quedan 5 minutos para tomar la medicación";

  const subtitle = medName ? `(${medName})` : "";

  return createPortal(
    <div
      className="popup__overlay"
      ref={overlayRef}
      onMouseDown={handleOverlayMouseDown}
      data-testid="popup-overlay"
    >
      <div
        className="popup__dialog popup__dialog--med"
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        ref={dialogRef}
        tabIndex={-1}
      >
        <button
          className="popup__close"
          aria-label="Cerrar"
          onClick={() => setIsOpen(false)}
          title="Cerrar"
        >
          ×
        </button>

        <h2 id="popup-title" className="popup__title">
          {title} <span className="popup__subtitle">{subtitle}</span>
        </h2>

        <div className="popup__content">
          {phase === "pre" ? (
            <p>Prepara tu medicación. Cuando llegue la hora te avisaré de nuevo.</p>
          ) : (
            <p>Toma tu medicación.</p>
          )}
        </div>

        <div className="popup__actions">
          {phase === "due" ? (
            <>
              <button
                className="btn btn-primary"
                onClick={() => {
                  onTaken?.();
                  setIsOpen(false);
                }}
              >
                Hecho
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  const snoozeMins = 5;
                  onSnooze?.(snoozeMins);
                  setIsOpen(false);
                }}
              >
                Posponer 5 min
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-ghost" onClick={() => setIsOpen(false)}>
                Entendido
              </button>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
