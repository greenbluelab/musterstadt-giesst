interface SliderTooltipProps {
  children: React.ReactNode;
  theme: any;
}

const SliderTooltip: React.FC<SliderTooltipProps> = ({ children, theme={} }) => {
    
    const themeTooltip = {
        ...theme,
        color: theme.color || "red",
        fontSize: theme.fontSize || "14px",
        fontFamily: theme.fontFamily || "Source Sans Pro, mono",
        whiteSpace: theme.whiteSpace || "nowrap",
        position: "relative",
        bottom: "100%",
        transform: "translate(-50%, -10px)",
      }
  

  return (
    <div style={themeTooltip}>
      {children}
    </div>
  );
};

export default SliderTooltip;