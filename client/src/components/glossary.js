import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';

function Glossary() {

  //Setter and Handler
  const [expanded, setExpanded] = React.useState(false);  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };        
  return (
    <div className="top-margin">
      <Paper className="paper-margin" elevation={10}>
        <h1>Glosario</h1>
        <h2 style={{marginTop: "50px"}}>Tipos de Empresa</h2>
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
        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography>Acceso a Capital</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Es la accesibilidad a distintos recursos económicos que pueden encontrar los empresarios para facilitar el comienzo o crecimiento del negocio. Esto incluye préstamos, inversión, “crowdfunding”, entre otros.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <h2 style={{marginTop: "50px"}}>Etapas de Desarrollo de Negocio</h2>
        <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography >Idea/Concepto</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Etapa inicial de negocio donde el emprendedor cuenta con una idea o concepto de negocio pero todavía no ha comenzado a desarrollar su prototipo.            
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography >Prueba de Concepto</Typography>

          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Las pruebas de concepto evalúan la mercadeabilidad / comerciabilidad de una idea de producto antes de su desarrollo. El objetivo de la prueba de concepto es valorar el concepto de producto antes de comenzar su desarrollo a nivel técnico / físico.           
             </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography >Prototipo</Typography>
          
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Etapa de negocio donde el emprendedor se encuentra desarrollando la versión básica de su producto o servicio.           
             </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography>Entrada al Mercado</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            En esta etapa, el empresario desarrolla la estrategia para acceder sus mercados y obtiene su primer cliente.            
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography>Lanzamiento</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            En esta etapa, el empresario desarrolla la estrategia para acceder sus mercados y obtiene su primer cliente.            
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel11'} onChange={handleChange('panel11')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography>Crecimiento</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            En esta etapa, el negocio tiene un desarrollo sostenido y profesionalizado, aumentan sus ingresos, se mejoran los productos o servicios, y se fortalece la base de clientes.              </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel12'} onChange={handleChange('panel12')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography>Expansión</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Etapa de negocio en la cual los emprendedores tienen su negocio establecido y están en busca de su próximo mercado, ya sea local o global.             </Typography>
          </AccordionDetails>
        </Accordion>




        <h2 style={{marginTop: "50px"}}>Sub-etapas de Idea / Concepto</h2>
        <Accordion expanded={expanded === 'panel13'} onChange={handleChange('panel13')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography >Idea/Concepto</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            En esta etapa, las personas usualmente van a eventos como Hackathons o Startup Weekends. Tienen una idea o un concepto para un negocio, y están buscando espacios para compartirlos, orientarse sobre recursos y cuáles serían sus primeros pasos para hacer de este sueño o idea una realidad.            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel14'} onChange={handleChange('panel14')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography >Viabilidad</Typography>

          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            La viabilidad o validación de un producto o servicio es de las etapas más importantes cuando estás desarrollando tu negocio porque ayuda al empresario a identificar la audiencia que estaría dispuesto a comprarte tu producto o pagar por el servicio. Además, es la etapa donde se desarrolla el modelo de negocio y elementos esenciales para desarrollar exitosamente el negocio. En esta sub-etapa pueden encontrar recursos como I-Corps Puerto Rico, incubadoras de microempresas u organizaciones como los SBTDC’s (Small Business and Technology Development Centers).          
               </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel15'} onChange={handleChange('panel15')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography >Networking Social</Typography>
          
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            En este momento, se recomienda que los empresarios o emprendedores comiencen a participar de eventos de networking con el fin de conectar con potenciales clientes, suplidores, colaboradores y hasta posibles nuevos miembros para tu equipo. Algunos de estos eventos son: aquellos convocados por las Cámaras de Comercio, por organizaciones como Ponce Young Entrepreneurs Initiative (PYEI) o Mujer Emprende Latina.          
               </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel16'} onChange={handleChange('panel16')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography> Preparación Financiera</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Este es el momento donde los empresarios o emprendedores trabajan para estar preparados financieramente para comenzar su empresa y posteriormente poder tener acceso a capital.            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel17'} onChange={handleChange('panel17')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography>Startup</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            En esta etapa se trata de manos a la obra. Aquí se profundiza sobre los pasos a seguir para comenzar un negocio. Por ejemplo, las organizaciones que brindan apoyo en este espacio son aquellas que ayudan a los empresarios y emprendedores a hacer su plan de negocio, les ofrecen consejería 1-on-1 en temas como asuntos legales, registros, licencias, permisos, etc.       
                 </Typography>
          </AccordionDetails>
        </Accordion>




         <h2 style={{marginTop: "50px"}}>Sub-etapas de Prueba de Concepto/Prototipo/Entrada al Mercado</h2>
         <Accordion expanded={expanded === 'panel18'} onChange={handleChange('panel18')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography >Capital para Prueba de Concepto</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Para comenzar esta segunda etapa de desarrollo, los empresarios y emprendedores pueden identificar opciones de capital o dinero para probar su concepto. Algunas opciones para obtener capital en esta etapa son esfuerzos de crowdfunding, como Antrocket, competencias de planes de negocios, o , si es una empresa basada en innovación, solicitar subvenciones para investigación o SBIR/STTR (Small Business Innovation Research / Small Business Technology Transfer) del Puerto Rico Science, Technology & Research Trust.              </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel19'} onChange={handleChange('panel19')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography >Desarrollo de Prototipo</Typography>

          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Para desarrollar el prototipo del producto, el empresario o emprendedor puede tocar las puertas de organizaciones que poseen el espacio y el equipo necesario, como Neeuko en la Universidad del Sagrado Corazón, Fab Lab Puerto Rico, o Startup.pr.             </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel20'} onChange={handleChange('panel20')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography >Entrada al Mercado</Typography>
          
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Para obtener sus primeros clientes y acceder sus mercados, el empresario o emprendedor busca formar parte de programas como EnterPRize y el IDEA Seed Fund, ambos de Grupo Guayacán, Inc., donde pueden recibir capacitación y mentoría. En caso de ser una compañía con un componente de innovación y que procura crecer globalmente, pueden solicitar a programas de aceleración como Parallel18.             </Typography>
          </AccordionDetails>
        </Accordion>




        <h2 style={{marginTop: "50px"}}>Sub-etapas de Lanzamiento</h2>      
        <Accordion expanded={expanded === 'panel21'} onChange={handleChange('panel21')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography> Capital para Entrar al Mercado</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            En esta sub-etapa se encuentran recursos de acceso a capital para el lanzamiento de la compañía como inversión ángel (Ausubo Ventures, PR Capital Network) y préstamos (Lendreams, BADECO, BDE, Kiva, Pathstone, Banca y Cooperativas de Ahorro y Crédito).                
             </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel22'} onChange={handleChange('panel22')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography>Coworking</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Empresarios y emprendedores en esta etapa necesitan espacio de oficina y tienen la oportunidad de acceder un espacio físico de oficina compartida e intercambiar ideas con otros empresarios y emprendedores. Algunos de estos espacios son Piloto 151, co.co.haus, Cospazio, La Colmena, Oceana Hub, coespacios, Engine-4, entre otros).             </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel23'} onChange={handleChange('panel23')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography>Incubación</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Compañías basadas en innovación pueden formar parte de incubadoras como Vitec 2 (PRTEC), INTECO, Kingbird Innovation Center o Incubadora REDI.              </Typography>
          </AccordionDetails>
        </Accordion>




        <h2 style={{marginTop: "50px"}}>Sub-etapas de Crecimiento/Expansión</h2>      
        <Accordion expanded={expanded === 'panel24'} onChange={handleChange('panel24')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography>  Desarrollo de Propiedad Física</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            En esta sub-etapa, se encuentran recursos que asisten con la ubicación física del sitio o local donde se establecerá el negocio, o aquellos recursos que proveen créditos contributivos para el desarrollo de la propiedad.             </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel25'} onChange={handleChange('panel25')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography> Capital para Crecimiento</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            En este momento, también se pueden acceder a diversas fuentes de inversión y capital como Acrecent, Advent Morro, Parliament Capital, Bluhaus Capital, Semillero Ventures, bancos y cooperativas de ahorro y crédito, entre otros.             </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel26'} onChange={handleChange('panel26')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography> Mentoría</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Para empresarios y emprendedores en esta etapa, existen redes locales y globales de apoyo, mentoría y networking como Entrepreneurs Organization PR.             </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel27'} onChange={handleChange('panel27')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography>Penetración del Mercado</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            En este momento, los empresarios y emprendedores pueden expandir sus mercados locales a través de los contactos e iniciativas de las cámaras de comercio y organizaciones como: Asoc. de Productos de Puerto Rico, Centro Unido de Detallistas, Puerto Rico Minority Supplier Council, entre otros.             </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel28'} onChange={handleChange('panel28')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography>Eficiencias Operacionales</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            En este momento, los empresarios y emprendedores procuran alcanzar la combinación correcta de personas, procesos y tecnologías para mejorar su productividad, reducir los costos operacionales e impulsar su crecimiento.             </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel29'} onChange={handleChange('panel29')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography>Capital para Expansión</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            En este momento, empresarios y emprendedores tienen la oportunidad de recibir capital de riesgo de programas como Parallel18 Ventures y Morro Ventures.             </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel30'} onChange={handleChange('panel30')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography>Capacitación</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            La capacitación es vista como un proceso educativo a corto plazo, el cual emplea unas técnicas especializadas y planificadas por medio del cual el personal de la empresa, obtendrá los conocimientos y las habilidades necesarias, para incrementar su eficacia en el logro de los objetivos que haya planificado la organización para la cual se desempeña.             </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel31'} onChange={handleChange('panel31')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography>Capital Semilla</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Dinero que se ofrece en las etapas tempranas de un negocio.             </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel32'} onChange={handleChange('panel32')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography>Ecosistema Empresarial</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Se compone de seis pilares: política pública, finanzas, cultura, apoyo empresarial, capital humano y mercado. Estos pilares apoyan a los emprendedores que aspiran a comenzar o hacer crecer sus negocios y cada uno es importante para desarrollar el empresarismo.

Está compuesto por emprendedores que aspiran a comenzar o crecer sus negocios, personas, instituciones y recursos que apoyan a los empresarios y emprendedores, y una cultura rica en capital social que fomenta el emprendimiento. El ecosistema permite un flujo rápido de talento, información y recursos para que los empresarios puedan encontrar rápidamente lo que necesitan en cada etapa de crecimiento.             </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel33'} onChange={handleChange('panel33')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography>Financiamiento</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Es una de las alternativas de acceso a capital. Una empresa u organización pide financiamiento en la forma de un préstamo con el fin de  llevar a cabo un proyecto, adquirir bienes o servicios, cubrir los gastos de una actividad u obra, o cumplir sus compromisos con sus proveedores.             </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel34'} onChange={handleChange('panel34')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography>Innovación</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            El concepto de innovación se refiere a empresas que desarrollen un producto o servicio nuevo o una forma nueva de hacer algo. Puede hacer referencia a la introducción de nuevos productos o servicios en el mercado y también a la organización y gestión de una empresa.             </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel35'} onChange={handleChange('panel35')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography>Inversionista</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Los inversionistas son todas aquellas personas y/o empresas, nacionales o extranjeras, que invierten en compañías con el fin de obtener ganancias.             </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel36'} onChange={handleChange('panel36')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography>Mercado global</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            En términos empresariales, se refiere a cuando la empresa vende su producto o servicio más allá de su región inmediata.             </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel37'} onChange={handleChange('panel37')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography>Recurso</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Ayuda que puede llegar de una organización u otro medio del que un empresario se sirve para conseguir un fin, ya sea comenzar o crecer su negocio, o satisfacer una necesidad. Puede ser en la forma de un programa o servicio de una organización sin fines de lucro, academia, sector público o privado.             </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </div>
  );
}
export default Glossary;