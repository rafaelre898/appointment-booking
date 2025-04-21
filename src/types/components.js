import PropTypes from 'prop-types';

export const ButtonProps = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'text']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
};

export const InputProps = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  helpText: PropTypes.string,
  className: PropTypes.string,
};

export const SelectProps = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  helpText: PropTypes.string,
  className: PropTypes.string,
};

export const DoctorProps = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  specialty: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  available: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  availableSlots: PropTypes.arrayOf(PropTypes.string),
};

export const AppointmentProps = {
  id: PropTypes.string.isRequired,
  doctorId: PropTypes.string.isRequired,
  doctorName: PropTypes.string.isRequired,
  specialty: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['pending', 'approved', 'rejected']).isRequired,
  notes: PropTypes.string,
}; 