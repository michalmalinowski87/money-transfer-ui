import Card from './Card';

// Use simple div and text instead of MUI components
const SimpleContent = () => (
  <div style={{ padding: '8px' }}>
    This is a basic card with content. Cards can contain any content you want to display.
  </div>
);

// Simple action button without MUI IconButton
const SimpleActionButton = () => (
  <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>⋮</button>
);

const CardStories = {
  title: 'Atoms/Card',
  component: Card,
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
};

// Basic template
const Template = (args) => <Card {...args} />;

// Basic card
export const Basic = Template.bind({});
Basic.args = {
  children: <SimpleContent />
};

// Card with title
export const WithTitle = Template.bind({});
WithTitle.args = {
  title: 'Card Title',
  children: <SimpleContent />
};

// Card with title and subtitle
export const WithTitleAndSubtitle = Template.bind({});
WithTitleAndSubtitle.args = {
  title: 'Card Title',
  subtitle: 'Card Subtitle',
  children: <SimpleContent />
};

// Card with action
export const WithAction = Template.bind({});
WithAction.args = {
  title: 'Settings',
  action: <SimpleActionButton />,
  children: <SimpleContent />
};

// Complex card
export const ComplexCard = Template.bind({});
ComplexCard.args = {
  title: 'Payment Summary',
  subtitle: 'February 27, 2025',
  action: <SimpleActionButton />,
  children: (
    <div style={{ padding: '16px' }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '14px', color: '#666' }}>Amount</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff7043' }}>$2,500.00</div>
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '14px', color: '#666' }}>Recipient</div>
        <div>Global Suppliers Ltd.</div>
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '14px', color: '#666' }}>Payment Method</div>
        <div>Bank Transfer</div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
        <button 
          style={{ 
            backgroundColor: '#ff7043', 
            color: 'white', 
            border: 'none', 
            padding: '8px 16px', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          View Details
        </button>
      </div>
    </div>
  )
};

export default CardStories;