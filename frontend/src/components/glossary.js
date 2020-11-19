import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';

function Glossary() {
  const [expanded, setExpanded] = React.useState(false);  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };        
  return (
    <div className="top-margin">
      <Paper className="paper-margin" elevation={10}>
        <h2>Glosario</h2>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography >Microempresas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Por lo general, las personas que comienzan una microempresa lo hacen para tener un ingreso adicional, no requieren de mucho capital para comenzar y usualmente no necesitan de un local físico para vender su producto. Sigue esta línea si comenzaste tu negocio en tu área de expertise o talento como por ejemplo, consultoría, diseño o jardíneria; si tu negocio es un ecommerce o eres un “solopreneur” o “freelancer” que trabaja por cuenta propia.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography >Comerciantes</Typography>

          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Los comerciantes por lo general, cuentan con un local físico para vender su producto, tienen empleados que ayudan a operar el negocio y su enfoque es aumentar ventas. Algunos ejemplos de comerciantes son: los restaurantes, ferreterías tiendas físicas, entre otros.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography >Empresas basadas en Innovación</Typography>
          
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Las empresas basadas en innovación son las que han desarrollado un servicio o producto nuevo o una nueva forma de hacer algo. Por tanto, intentan mantenerse adelantados a las tendencias del mercado para crear productos o servicios que sean clave en el futuro. De igual forma, tienen una ventaja competitiva, requieren equipo especializado para crear su producto u ofrecer su servicio y tienen proyecciones de alto crecimiento en un mercado global. Estas empresas pasan por las mismas etapas que otras startups, pero a menudo a un ritmo más rápido. Y a veces necesitan ayuda con una prueba de concepto, recibiendo inversiones de capital y construyendo equipos de liderazgo.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography>Empresas en Crecimiento</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Las empresas en crecimiento son las que tienen entre 10-99 empleados, sus ingresos anuales se aproximan o sobrepasan el millón de dólares, ya están establecidas y están en busca de su próximo mercado, ya sea dentro del mismo país o fuera. Además, su enfoque está en expandir y crecer.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </div>
  );
}
export default Glossary;