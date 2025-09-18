import './MedicationItem.css'

const MedicationItem = ({ medication }) => {
  const getTypeClass = (type) => {
    switch(type.toLowerCase()) {
      case 'cronico': return 'cronic';
      case 'eventual': return 'eventual';
      case 'reciente': return 'reciente';
      default: return 'eventual';
    }
  };

  const getTypeColor = (type) => {
    switch(type.toLowerCase()) {
      case 'cronico': return '#E0A870';
      case 'eventual': return '#BEE7AC';
      case 'reciente': return '#F2D2B7';
      default: return '#BEE7AC';
    }
  };

  const indicatorStyle = {
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    marginRight: '10px',
    backgroundColor: getTypeColor(medication.type)
  };

  return (
    <div className="itemStyle">
      <div style={indicatorStyle}></div>
      <div className="contentStyle">
        <h4 className="titleStyle">
          {medication.name}
        </h4>
        <p className="dosageStyle">
          {medication.dosage} - {medication.frequency}
        </p>
        {medication.notes && (
          <p className="notesStyle">
            {medication.notes}
          </p>
        )}
      </div>
    </div>
  );
};

export default MedicationItem;