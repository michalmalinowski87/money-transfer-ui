import React from 'react';
import { 
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
}));

const StyledLabel = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 500,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(0.5),
  display: 'flex',
  alignItems: 'center',
}));

// Orange asterisk for required fields
const RequiredAsterisk = styled('span')(({ theme }) => ({
  color: '#ff7043', // Orange color to match the theme
  marginLeft: '4px',
  fontWeight: 'bold',
}));

const FormField = ({
  id,
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  helperText,
  error,
  required = false,
  fullWidth = true,
  select = false,
  selectOptions = [],
  optionLabels = {},
  disabled = false,
  InputProps = {},
  ...props
}) => {
  // Render a select field
  if (type === 'select') {
    return (
      <StyledFormControl error={error} required={required} fullWidth={fullWidth}>
        <StyledLabel component="label" htmlFor={id}>
          {label}
          {required && <RequiredAsterisk>*</RequiredAsterisk>}
        </StyledLabel>
        <Select
          id={id}
          value={value || ''}
          onChange={onChange}
          displayEmpty={!required}
          disabled={disabled}
          variant="outlined"
          fullWidth={fullWidth}
          error={error}
          {...props}
        >
          {!required && (
            <MenuItem value="">
              <em>{placeholder || 'None'}</em>
            </MenuItem>
          )}
          {selectOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {optionLabels[option] || option}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
      </StyledFormControl>
    );
  }

  // Render a standard text field (text, password, email, etc.)
  return (
    <StyledFormControl error={error} required={required} fullWidth={fullWidth}>
      <StyledLabel component="label" htmlFor={id}>
        {label}
        {required && <RequiredAsterisk>*</RequiredAsterisk>}
      </StyledLabel>
      <TextField
        id={id}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        type={type}
        variant="outlined"
        fullWidth={fullWidth}
        error={error}
        helperText={helperText}
        disabled={disabled}
        size="medium"
        InputProps={InputProps}
        {...props}
      />
    </StyledFormControl>
  );
};

export default FormField;