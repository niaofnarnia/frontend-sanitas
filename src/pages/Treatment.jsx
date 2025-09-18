import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Treatment.css'
import MedicationItem from '../components/MedicationItem'
import AddMedicationButton from '../components/addMedicationButton/AddMedicationButton';

// Componente para un medicamento individual
const MedicationItemTreatment = ({ medication, onToggle, showCheckbox = true }) => {
  const getTypeColor = (type) => {
    switch(type?.toLowerCase()) {
      case 'cronico': return '#E0A870';
      case 'eventual': return '#BEE7AC'; 
      case 'reciente': return '#F2D2B7';
      default: return '#BEE7AC';
    }
  };

  const colorIndicatorStyle = {
    width: '16px',
    height: '16px',
    borderRadius: '3px',
    backgroundColor: getTypeColor(medication.type)
  };

  return (
    <div className='item-style-treatment'>
      <div className='left-content-style'>
        <div style={colorIndicatorStyle}></div>
        <div className='medication-info-style'>
          <p className='name-style'>{medication.name}</p>
          <p className='dosage-style'>{medication.dosage}</p>
        </div>
      </div>
      <div className='right-content-style'>
        {showCheckbox && (
          <input
            type="checkbox"
            className='checkbox-style'
            checked={medication.taken}
            onChange={() => onToggle(medication.id)}
          />
        )}
        {!showCheckbox && (
          <button
            className='delete-btn-treatment'
            onClick={() => onToggle(medication.id)}
            title="Eliminar de tomados"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

// Componente para cada sección (Por tomar / Tomada)
const MedicationSection = ({ title, medications, onToggle, showCheckbox = true, isEmpty = false }) => {
  const sectionStyle = {
    backgroundColor: '#5dade2',
    borderRadius: '8px',
    marginBottom: '16px',
    overflow: 'hidden',
    minHeight: isEmpty ? '120px' : 'auto',
    with: '500px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  };

  const contentStyle = {
    padding: medications.length > 0 ? '12px' : '40px 16px',
    minHeight: medications.length === 0 ? '60px' : 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: medications.length === 0 ? 'center' : 'flex-start'
  };

  return (
    <div style={sectionStyle}>
      <h3 className='header-style'>{title}</h3>
      <div className='content-style' style={contentStyle}>
        {medications.length > 0 ? (
          medications.map(medication => (
            <MedicationItemTreatment
              key={medication.id}
              medication={medication}
              onToggle={onToggle}
              showCheckbox={showCheckbox}
            />
          ))
        ) : (
          <p className='empty-style'>
            {showCheckbox ? 'No hay medicamentos por tomar' : 'No has tomado medicamentos'}
          </p>
        )}
      </div>
    </div>
  );
};

// Componente principal Treatment
const Treatment = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simular carga de datos inicial
  useEffect(() => {
    // Simulación de datos - reemplaza con tu API
    const mockData = [
      {
        id: 1,
        name: 'Paracetamol',
        dosage: '500mg - Cada 8h',
        type: 'eventual',
        taken: false,
        takenAt: null
      },
      {
        id: 2,
        name: 'Lorazepam',
        dosage: '1mg - Al acostarse',
        type: 'cronico',
        taken: false,
        takenAt: null
      },
      {
        id: 3,
        name: 'Nortil',
        dosage: '25mg - 1 vez al día',
        type: 'reciente',
        taken: false,
        takenAt: null
      }
    ];

    setTimeout(() => {
      setMedications(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  // Función para alternar el estado de tomado/no tomado
  const toggleMedication = (medicationId) => {
    setMedications(prev => prev.map(med => {
      if (med.id === medicationId) {
        return {
          ...med,
          taken: !med.taken,
          takenAt: !med.taken ? new Date().toLocaleTimeString() : null
        };
      }
      return med;
    }));
  };

  // Filtrar medicamentos por estado
  const medicationsToTake = medications.filter(med => !med.taken);
  const takenMedications = medications.filter(med => med.taken);

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center'
  };

  if (loading) {
    return (
      <div className='container-style-treatment'>
        <p style={{ textAlign: 'center', padding: '40px' }}>
          Cargando tratamiento...
        </p>
      </div>
    );
  }

  return (
    <>
    <div className='container-style-treatment'>
      <h1 style={titleStyle}>Tratamiento diario</h1>
      
      {/* Sección: Medicación por tomar */}
      <MedicationSection
        title="Medicación por tomar"
        medications={medicationsToTake}
        onToggle={toggleMedication}
        showCheckbox={true}
      />
      
      {/* Sección: Medicación tomada */}
      <MedicationSection
        title="Medicación tomada"
        medications={takenMedications}
        onToggle={toggleMedication}
        showCheckbox={false}
      />
    </div>
    
    <AddMedicationButton></AddMedicationButton>
    </>
  );
};

export default Treatment;