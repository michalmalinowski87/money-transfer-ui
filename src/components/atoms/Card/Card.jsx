import { Card as MuiCard, CardContent, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(MuiCard)(() => ({
  borderRadius: '8px',
  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  overflow: 'hidden',
  border: '1px solid rgb(229, 231, 235)',
}));

const StyledCardHeader = styled(CardHeader)(() => ({
  backgroundColor: 'rgb(249, 250, 251)',
  borderBottom: '1px solid rgb(229, 231, 235)',
  padding: '16px',
  '& .MuiCardHeader-title': {
    fontSize: '18px',
    fontWeight: 600,
    color: 'rgb(17, 24, 39)',
  },
}));

const Card = ({ 
  children, 
  title, 
  subtitle, 
  action, 
  headerProps = {}, 
  contentProps = {},
  ...props 
}) => {
  return (
    <StyledCard {...props}>
      {title && (
        <StyledCardHeader
          title={title}
          subheader={subtitle}
          action={action}
          {...headerProps}
        />
      )}
      <CardContent {...contentProps}>
        {children}
      </CardContent>
    </StyledCard>
  );
};

export default Card;