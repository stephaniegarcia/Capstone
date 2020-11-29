--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- Name: signup_log(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.signup_log() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
   IF (TG_OP = 'INSERT') then
       INSERT INTO signup_log(
	user_id, date)
	VALUES (NEW.user_id, current_timestamp);
	END IF;
	RETURN NEW;
END;
$$;


ALTER FUNCTION public.signup_log() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    admin_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- Name: admin_admin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_admin_id_seq OWNER TO postgres;

--
-- Name: admin_admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_admin_id_seq OWNED BY public.admin.admin_id;


--
-- Name: business_step; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.business_step (
    bs_id integer NOT NULL,
    description character varying(90) NOT NULL,
    bt_id integer NOT NULL
);


ALTER TABLE public.business_step OWNER TO postgres;

--
-- Name: business_step_bs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.business_step_bs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.business_step_bs_id_seq OWNER TO postgres;

--
-- Name: business_step_bs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.business_step_bs_id_seq OWNED BY public.business_step.bs_id;


--
-- Name: business_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.business_type (
    bt_id integer NOT NULL,
    description character varying(90) NOT NULL
);


ALTER TABLE public.business_type OWNER TO postgres;

--
-- Name: business_type_bt_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.business_type_bt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.business_type_bt_id_seq OWNER TO postgres;

--
-- Name: business_type_bt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.business_type_bt_id_seq OWNED BY public.business_type.bt_id;


--
-- Name: login_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.login_log (
    log_id integer NOT NULL,
    login_date date NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.login_log OWNER TO postgres;

--
-- Name: login_log_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.login_log_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.login_log_log_id_seq OWNER TO postgres;

--
-- Name: login_log_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.login_log_log_id_seq OWNED BY public.login_log.log_id;


--
-- Name: organization; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organization (
    org_id integer NOT NULL,
    name character varying(90) NOT NULL,
    description character varying(90) NOT NULL,
    email public.citext NOT NULL,
    phone_number character varying(11) NOT NULL,
    bt_id integer NOT NULL,
    bs_id integer NOT NULL,
    is_active boolean NOT NULL
);


ALTER TABLE public.organization OWNER TO postgres;

--
-- Name: organization_org_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.organization_org_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.organization_org_id_seq OWNER TO postgres;

--
-- Name: organization_org_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.organization_org_id_seq OWNED BY public.organization.org_id;


--
-- Name: organization_rating; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organization_rating (
    rating integer NOT NULL,
    user_id integer NOT NULL,
    organization_id integer NOT NULL,
    rating_comment character varying(255),
    CONSTRAINT stars CHECK (((rating >= 1) AND (rating < 5)))
);


ALTER TABLE public.organization_rating OWNER TO postgres;

--
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    question_id integer NOT NULL,
    description character varying(240) NOT NULL
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- Name: questions_question_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questions_question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.questions_question_id_seq OWNER TO postgres;

--
-- Name: questions_question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questions_question_id_seq OWNED BY public.questions.question_id;


--
-- Name: record; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.record (
    answer boolean NOT NULL,
    user_id integer NOT NULL,
    question_id integer NOT NULL
);


ALTER TABLE public.record OWNER TO postgres;

--
-- Name: signup_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.signup_log (
    signup_id integer NOT NULL,
    date date NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.signup_log OWNER TO postgres;

--
-- Name: test_date_test_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.test_date_test_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.test_date_test_id_seq OWNER TO postgres;

--
-- Name: test_date_test_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.test_date_test_id_seq OWNED BY public.signup_log.signup_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    first_name character varying(90) NOT NULL,
    last_name character varying(90) NOT NULL,
    email public.citext NOT NULL,
    user_password character varying(90) NOT NULL,
    business_status boolean NOT NULL,
    phone_number character varying(12) NOT NULL,
    bt_id integer,
    bs_id integer,
    is_active boolean NOT NULL,
    is_verified boolean NOT NULL,
    assistance_required character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: admin admin_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin ALTER COLUMN admin_id SET DEFAULT nextval('public.admin_admin_id_seq'::regclass);


--
-- Name: business_step bs_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business_step ALTER COLUMN bs_id SET DEFAULT nextval('public.business_step_bs_id_seq'::regclass);


--
-- Name: business_type bt_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business_type ALTER COLUMN bt_id SET DEFAULT nextval('public.business_type_bt_id_seq'::regclass);


--
-- Name: login_log log_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login_log ALTER COLUMN log_id SET DEFAULT nextval('public.login_log_log_id_seq'::regclass);


--
-- Name: organization org_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization ALTER COLUMN org_id SET DEFAULT nextval('public.organization_org_id_seq'::regclass);


--
-- Name: questions question_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions ALTER COLUMN question_id SET DEFAULT nextval('public.questions_question_id_seq'::regclass);


--
-- Name: signup_log signup_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.signup_log ALTER COLUMN signup_id SET DEFAULT nextval('public.test_date_test_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin (admin_id, user_id) FROM stdin;
13	2
18	5
\.


--
-- Data for Name: business_step; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.business_step (bs_id, description, bt_id) FROM stdin;
1	Viabilidad	1
2	Social Networking	1
3	Preparacion Financiera	1
4	Startup	1
5	Capital para Prueba de Concepto	1
6	Desarrollo de Prototipo	1
7	Viabilidad	2
8	Networking Social	2
9	Preparacion Financiera	2
10	Startup	2
11	Concepto	3
12	Viabilidad	3
13	Networking Social	3
14	Preparacion Financiera	3
15	Eficiencias Operacionales	3
16	Capital para Expansion	3
17	Preparacion Financiera	3
18	Startup	5
19	Preparacion Financiera	5
\.


--
-- Data for Name: business_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.business_type (bt_id, description) FROM stdin;
1	Microempresa
2	Comerciante
3	Empresa Basada en Innovacion
4	Empresa en Crecimiento
5	Acceso a Capital
\.


--
-- Data for Name: login_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.login_log (log_id, login_date, user_id) FROM stdin;
\.


--
-- Data for Name: organization; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organization (org_id, name, description, email, phone_number, bt_id, bs_id, is_active) FROM stdin;
1	Testing Micro	Testing for query	Testing	123	1	1	t
2	Testing Comerciante	Testing for query	Testing	123	2	1	t
3	Testing Emp Basada en Innovacion	Testing for query	Testing	123	3	1	t
4	Testing Emp en Crecimiento	Testing for query	Testing	123	4	1	t
5	Testing Acceso a Capital	Testing for query	Testing	123	5	1	t
6	Casa Sin Fronteras	Testing for query	Testing	123	1	1	t
7	Centro Empresarial Para la Mujer	Testing for query	Testing	123	1	1	t
8	Animus Women	Test	Testing	123	1	2	t
9	Consumer Credit	Test	Testing	123	1	3	t
10	ASOPYMES	Testing for query	Testing	123	1	7	t
11	Bad Compania	Testing for query	Testing	123	4	7	t
12	Second Bad Compania	Testing for query	Testing	123	4	3	f
13	Final	It worked again!	changingemail@example.com	7879236	1	1	f
\.


--
-- Data for Name: organization_rating; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organization_rating (rating, user_id, organization_id, rating_comment) FROM stdin;
3	2	1	Thank you for your service.
4	2	2	Thank you!!
4	2	3	Great service!
4	2	4	Best service ever.
3	2	5	Ok Service.
3	2	6	:)
4	2	10	Would contact again!
1	2	11	Please improve service. 
2	2	12	Ok.
3	4	1	:)
2	4	2	Thank you.
2	4	3	Hello.
2	4	4	Not contacting again.
2	4	5	Not contacting again. 
2	4	6	Test.
4	4	10	Perfect service!
1	4	11	Poor service. 
2	4	12	:)
4	5	10	Wow. Great service!
1	5	11	Contacted Mr Alvarez and his help was appreciated.
2	5	12	Ok.
4	6	10	Thank you!!!!
1	6	11	Please report this company.
2	6	12	Ok
4	7	10	Great!!
1	7	11	Resources for this company were poor. 
2	7	12	Thank you, but please improve service.
1	24	11	Mal servicio
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions (question_id, description) FROM stdin;
1	¿Comenzaste un negocio en tu área de expertise o talento como por ejemplo, consultoría, diseño o jardinería?
2	¿Comenzaste un negocio para tener un ingreso personal adicional?
3	¿Trabajas por tu cuenta, por servicios profesionales o tienes una tienda online?
4	¿Tienes un local físico? ¿Como por ejemplo una tienda, restaurante, colmado, cafetería o boutique?
5	¿Cuentas con empleados que te ayudan a operar el negocio?
6	¿Tu negocio desarrolló un producto o servicio nuevo o una forma nueva de hacer algo?
7	¿Necesitas un equipo especializado para poder crear tu producto u ofrecer tu servicio?
8	¿La propiedad intelectual asociada con tu producto o servicio te da una ventaja competitiva en el mercado que rindan proyecciones de alto crecimiento?
9	¿Tu empresa tiene entre 10-99 empleados y los ingresos anuales se aproximan o sobrepasan el $1 millón de dólares?
10	¿Tu empresa ya está firmemente establecida y estás en busca de tu próximo mercado?
11	¿Tu enfoque ha transicionado de aumentar ventas en tu mercado actual a crear un plan estratégico para expandir y crecer?
\.


--
-- Data for Name: record; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.record (answer, user_id, question_id) FROM stdin;
\.


--
-- Data for Name: signup_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.signup_log (signup_id, date, user_id) FROM stdin;
4	2020-11-07	1
5	2020-11-07	2
6	2020-11-07	3
7	2020-11-07	15
10	2020-11-08	18
11	2020-11-08	20
13	2020-11-09	22
14	2020-11-09	23
15	2020-11-09	24
18	2020-11-13	29
20	2020-11-13	31
22	2020-11-18	37
23	2020-11-18	39
24	2020-11-18	42
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, first_name, last_name, email, user_password, business_status, phone_number, bt_id, bs_id, is_active, is_verified, assistance_required) FROM stdin;
2	Emmanuel	Soto	random@gmail.com	456pescao	f	123-456-7890	\N	\N	t	t	\N
4	Pablo	Rodriguez	Pablo.rodriguez@gmail.com	password	t	787-323-6195	\N	\N	t	t	\N
5	Bryan	Maldonado	Bryan.maldonado@gmail.com	123qwer	t	787-426-6728	\N	\N	t	t	\N
6	Alina	Quinones	Alina.quinones@gmail.com	4tyebrn	t	787-472-2890	\N	\N	t	t	\N
7	Manuel	Natal	Manuel.natal@gmail.com	victoriaciud234	t	787-287-2907	\N	\N	t	t	\N
10	Hanna	Moris	Hanna.morris@gmail.com	hann465	t	787-239-4070	\N	\N	t	t	\N
11	Another	Test	Another.test@gmail.com	hann465	t	787-239-4070	\N	\N	t	t	\N
13	Another1	Test2	Another.test1@gmail.com	hann465	t	787-239-4070	\N	\N	t	t	\N
14	Test	Testies	Testosterone	Testos	t	787	\N	\N	t	t	\N
15	Dolores	Rodriguez	dolorodrig@gmail.com	dolores34	t	787	\N	\N	t	t	\N
18	Test2	Testies	Testosterone@gmail.com	Testos	t	787	\N	\N	t	t	\N
20	Update Test	Successful	Testosterone4	new pass	t	787-923-6155	\N	\N	t	t	\N
22	Victor	Munoz	Victor.munoz@gmail.com	456pescao	t	787-623-4550	\N	\N	t	t	\N
23	Fernando	Perez	Fernando.perez@gmail.com	fernando45	t	787-648-4550	\N	\N	t	t	\N
24	Isidoro	Couvertier	happyhour@gmail.com	happyhour123	t	787-234-6153	\N	\N	t	t	\N
29	Testos	Testing	Testsir	pass	t	234	\N	\N	t	t	\N
31	Elaine	Fernandez	elaine@example.com	password	t	787	\N	\N	t	t	\N
37	Maria	merc	mariamerc@email.com	pass	t	787	1	1	t	f	\N
39	It	Worked Again!	changingemail@example.com	password	f	7879236155	1	1	f	t	\N
\.


--
-- Name: admin_admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_admin_id_seq', 19, true);


--
-- Name: business_step_bs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.business_step_bs_id_seq', 19, true);


--
-- Name: business_type_bt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.business_type_bt_id_seq', 5, true);


--
-- Name: login_log_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.login_log_log_id_seq', 1, true);


--
-- Name: organization_org_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.organization_org_id_seq', 13, true);


--
-- Name: questions_question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_question_id_seq', 11, true);


--
-- Name: test_date_test_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.test_date_test_id_seq', 24, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 42, true);


--
-- Name: admin UNIQUE; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT "UNIQUE" UNIQUE (user_id);


--
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (admin_id);


--
-- Name: business_type bt_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business_type
    ADD CONSTRAINT bt_id PRIMARY KEY (bt_id);


--
-- Name: business_step business_step_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business_step
    ADD CONSTRAINT business_step_pkey PRIMARY KEY (bs_id);


--
-- Name: login_log login_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login_log
    ADD CONSTRAINT login_log_pkey PRIMARY KEY (log_id);


--
-- Name: organization organization_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_pkey PRIMARY KEY (org_id);


--
-- Name: organization_rating organization_rating_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization_rating
    ADD CONSTRAINT organization_rating_pkey PRIMARY KEY (user_id, organization_id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (question_id);


--
-- Name: record record2_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record
    ADD CONSTRAINT record2_pkey PRIMARY KEY (user_id, question_id);


--
-- Name: signup_log test_date_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.signup_log
    ADD CONSTRAINT test_date_pkey PRIMARY KEY (signup_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users user_creation; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER user_creation AFTER INSERT ON public.users FOR EACH ROW EXECUTE FUNCTION public.signup_log();


--
-- Name: organization bs_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT bs_id FOREIGN KEY (bs_id) REFERENCES public.business_step(bs_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: users bs_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT bs_id FOREIGN KEY (bs_id) REFERENCES public.business_step(bs_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: business_step bt_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business_step
    ADD CONSTRAINT bt_id FOREIGN KEY (bt_id) REFERENCES public.business_type(bt_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: organization bt_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT bt_id FOREIGN KEY (bt_id) REFERENCES public.business_type(bt_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: users bt_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT bt_id FOREIGN KEY (bt_id) REFERENCES public.business_type(bt_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: record question_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record
    ADD CONSTRAINT question_id FOREIGN KEY (question_id) REFERENCES public.questions(question_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: admin user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: login_log user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login_log
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: record user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: organization_rating user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization_rating
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: signup_log user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.signup_log
    ADD CONSTRAINT user_id FOREIGN KEY (signup_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- PostgreSQL database dump complete
--

