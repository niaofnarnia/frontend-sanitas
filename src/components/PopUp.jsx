import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./PopUp.css";

function ModalPopUp({
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
    preTriggeredRef.current = false;
    dueTriggeredRef.current = false;
    setIsOpen(false);
    setPhase("idle");
  }, [target.getTime(), preAlertMinutes]);

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
                }}
              >
                Hecho
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  const snoozeMins = 5;
                  onSnooze?.(snoozeMins);
                }}
              >
                Posponer 5 min
              </button>
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

function getNextOccurrence(timeStr, from = new Date()) {
  const [h, m] = timeStr.split(":").map(Number);
  const next = new Date(from);
  next.setSeconds(0, 0);
  next.setHours(h, m, 0, 0);
  if (next <= from) next.setDate(next.getDate() + 1);
  return next;
}

export default function ReminderPopUps({ pollMs = 60000, preAlertMinutes = 5 }) {
  const [reminders, setReminders] = useState([]);
  const [snoozedUntil, setSnoozedUntil] = useState({});

  const load = async () => {
    try {
      const res = await fetch("/api/reminders/active");
      if (!res.ok) return;
      const data = await res.json();
      setReminders(Array.isArray(data) ? data : []);
    } catch (err) {
      void err;
    }
  };

  useEffect(() => {
    load();
    const id = setInterval(load, pollMs);
    return () => clearInterval(id);
  }, [pollMs]);

  const handleTaken = async (id) => {
    try {
      await fetch(`/api/reminders/${id}/taken`, { method: "PUT" });
    } catch (err) {
      void err;
    }
    setReminders((rs) => rs.map((r) => (r.id === id ? { ...r, taken: true } : r)));
    setSnoozedUntil((m) => {
      const n = { ...m };
      delete n[id];
      return n;
    });
  };

  const handleSnooze = (id, mins) => {
    const until = new Date(Date.now() + mins * 60 * 1000);
    setSnoozedUntil((m) => ({ ...m, [id]: until.toISOString() }));
  };

  const active = reminders.filter((r) => !r.taken);

  return (
    <>
      {active.map((r) => {
        const medStr =
          r?.medication?.dose
            ? `${r.medication.name} (${r.medication.dose})`
            : r?.medication?.name || "";
        const snoozedISO = snoozedUntil[r.id];
        const nextAt = snoozedISO ? new Date(snoozedISO) : getNextOccurrence(r.time);
        return (
          <ModalPopUp
            key={r.id}
            nextDoseAt={nextAt}
            preAlertMinutes={preAlertMinutes}
            medName={medStr}
            onTaken={() => handleTaken(r.id)}
            onSnooze={(mins) => handleSnooze(r.id, mins)}
            closeOnOverlayClick
          />
        );
      })}
    </>
  );
}

export { ModalPopUp };
