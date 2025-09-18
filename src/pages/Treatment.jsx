import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Treatment.css'
import MedicationItem from '../components/MedicationItem'

// const Treatment = () => {
//     return (
//         <>
           
//         </>
//     )
// }

// export default Treatment
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
    with: '500px'
  };

  const contentStyle = {
    padding: medications.length > 0 ? '12px' : '40px 16px',
    minHeight: medications.length === 0 ? '60px' : 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: medications.length === 0 ? 'center' : 'flex-start'
  };

  const emptyStyle = {
    textAlign: 'center',
    color: '#fff',
    fontSize: '14px',
    fontStyle: 'italic'
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
          <p className='empty-style' style={emptyStyle}>
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

//   const containerStyle = {
//     padding: '20px',
//     maxWidth: '400px',
//     margin: '0 auto',
//     fontFamily: 'Arial, sans-serif'
//   };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center'
  };

  if (loading) {
    return (
      <div className='containerStyle-treatment'>
        <p style={{ textAlign: 'center', padding: '40px' }}>
          Cargando tratamiento...
        </p>
      </div>
    );
  }

  return (
    <div className='containerStyle-treatment'>
      <h1 style={titleStyle}>Tratamiento</h1>
      
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
      
      {/* Estadísticas opcionales */}
      {/* <div style={{ 
        textAlign: 'center', 
        marginTop: '20px', 
        padding: '16px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
          Progreso: {takenMedications.length}/{medications.length} medicamentos tomados
        </p>
        {medications.length > 0 && (
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#e0e0e0',
            borderRadius: '4px',
            marginTop: '8px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${(takenMedications.length / medications.length) * 100}%`,
              height: '100%',
              backgroundColor: '#4caf50',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Treatment;