--
-- PostgreSQL database dump
--

\restrict jtuYefBl3VCJpy2nl2273GE3NqTxVPVFCChdEoIDuSdG7CtK8a746M7udrrG63B

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-05-27 02:27:59

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16405)
-- Name: evaluaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evaluaciones (
    id_evaluacion integer NOT NULL,
    id_usuario integer NOT NULL,
    edad integer,
    escuela character varying(100),
    carrera character varying(100),
    grupo character varying(50),
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    puntaje_autorregulacion integer,
    puntaje_postergacion integer,
    puntaje_total integer,
    nivel_procrastinacion character varying(50)
);


ALTER TABLE public.evaluaciones OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16404)
-- Name: evaluaciones_id_evaluacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.evaluaciones_id_evaluacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.evaluaciones_id_evaluacion_seq OWNER TO postgres;

--
-- TOC entry 5063 (class 0 OID 0)
-- Dependencies: 221
-- Name: evaluaciones_id_evaluacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.evaluaciones_id_evaluacion_seq OWNED BY public.evaluaciones.id_evaluacion;


--
-- TOC entry 224 (class 1259 OID 24596)
-- Name: factores_epa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.factores_epa (
    id_factor integer NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.factores_epa OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24595)
-- Name: factores_epa_id_factor_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.factores_epa_id_factor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.factores_epa_id_factor_seq OWNER TO postgres;

--
-- TOC entry 5064 (class 0 OID 0)
-- Dependencies: 223
-- Name: factores_epa_id_factor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.factores_epa_id_factor_seq OWNED BY public.factores_epa.id_factor;


--
-- TOC entry 226 (class 1259 OID 24605)
-- Name: items_epa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items_epa (
    id_item integer NOT NULL,
    numero_item integer NOT NULL,
    item text NOT NULL,
    id_factor integer NOT NULL,
    es_invertido boolean NOT NULL
);


ALTER TABLE public.items_epa OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24604)
-- Name: items_epa_id_item_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.items_epa_id_item_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.items_epa_id_item_seq OWNER TO postgres;

--
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 225
-- Name: items_epa_id_item_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.items_epa_id_item_seq OWNED BY public.items_epa.id_item;


--
-- TOC entry 228 (class 1259 OID 24624)
-- Name: respuestas_evaluacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.respuestas_evaluacion (
    id_respuesta integer NOT NULL,
    id_evaluacion integer NOT NULL,
    id_item integer NOT NULL,
    valor_respuesta integer NOT NULL
);


ALTER TABLE public.respuestas_evaluacion OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24623)
-- Name: respuestas_evaluacion_id_respuesta_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.respuestas_evaluacion_id_respuesta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.respuestas_evaluacion_id_respuesta_seq OWNER TO postgres;

--
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 227
-- Name: respuestas_evaluacion_id_respuesta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.respuestas_evaluacion_id_respuesta_seq OWNED BY public.respuestas_evaluacion.id_respuesta;


--
-- TOC entry 220 (class 1259 OID 16390)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    nombre character varying(100),
    correo character varying(100),
    password character varying(255),
    rol character varying(20) DEFAULT 'usuario'::character varying,
    apellidos character varying(100)
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16389)
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- TOC entry 4878 (class 2604 OID 16408)
-- Name: evaluaciones id_evaluacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluaciones ALTER COLUMN id_evaluacion SET DEFAULT nextval('public.evaluaciones_id_evaluacion_seq'::regclass);


--
-- TOC entry 4880 (class 2604 OID 24599)
-- Name: factores_epa id_factor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.factores_epa ALTER COLUMN id_factor SET DEFAULT nextval('public.factores_epa_id_factor_seq'::regclass);


--
-- TOC entry 4881 (class 2604 OID 24608)
-- Name: items_epa id_item; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items_epa ALTER COLUMN id_item SET DEFAULT nextval('public.items_epa_id_item_seq'::regclass);


--
-- TOC entry 4882 (class 2604 OID 24627)
-- Name: respuestas_evaluacion id_respuesta; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuestas_evaluacion ALTER COLUMN id_respuesta SET DEFAULT nextval('public.respuestas_evaluacion_id_respuesta_seq'::regclass);


--
-- TOC entry 4876 (class 2604 OID 16393)
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- TOC entry 5051 (class 0 OID 16405)
-- Dependencies: 222
-- Data for Name: evaluaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evaluaciones (id_evaluacion, id_usuario, edad, escuela, carrera, grupo, fecha, puntaje_autorregulacion, puntaje_postergacion, puntaje_total, nivel_procrastinacion) FROM stdin;
1	2	22	universidad	Ingeniería en Tecnologías de la Información y Comunicación	\N	2026-05-23 23:31:50.461274	\N	\N	\N	\N
2	2	22	universidad	Ingeniería en Tecnologías de la Información y Comunicación	\N	2026-05-23 23:31:55.148959	\N	\N	\N	\N
3	2	22	universidad	Ingeniería en Tecnologías de la Información y Comunicación	\N	2026-05-23 23:36:11.263801	\N	\N	\N	\N
4	2	21	universidad	Ingeniería en Tecnologías de la Información y Comunicación	\N	2026-05-24 19:20:14.68513	\N	\N	\N	\N
5	2	21	universidad	Ingeniería en Tecnologías de la Información y Comunicación	\N	2026-05-24 19:20:55.666288	\N	\N	\N	\N
6	2	21	universidad	Ingeniería en Tecnologías de la Información y Comunicación	\N	2026-05-24 19:27:26.137879	\N	\N	\N	\N
7	2	21	secundaria	\N	2°	2026-05-24 20:42:42.337478	\N	\N	\N	\N
8	2	21	primaria	\N	2°	2026-05-24 20:55:03.407868	\N	\N	\N	\N
9	2	23	universidad	Ingeniería Mecatrónica	\N	2026-05-24 23:11:20.547761	\N	\N	\N	\N
10	2	14	secundaria	\N	2°	2026-05-24 23:21:34.302494	\N	\N	\N	\N
11	2	23	preparatoria	\N	3° Semestre	2026-05-24 23:48:30.57834	\N	\N	\N	\N
12	2	12	secundaria	\N	1°	2026-05-25 00:07:40.59378	29	10	39	Moderado
13	2	22	secundaria	\N	2°	2026-05-25 00:30:09.635857	14	4	18	Bajo
14	2	12	secundaria	\N	1°	2026-05-25 00:42:50.866486	9	15	24	Bajo
15	2	13	secundaria	\N	2°	2026-05-25 01:24:29.554243	\N	\N	\N	\N
16	2	13	primaria	\N	3°	2026-05-25 01:30:28.518684	\N	\N	\N	\N
17	2	23	universidad	Ingeniería Mecatrónica	\N	2026-05-25 01:39:33.352617	14	11	25	Moderado
18	2	23	Educación Primaria	\N	\N	2026-05-25 01:44:50.091595	21	10	31	Moderado
19	2	12	Técnico	\N	\N	2026-05-25 01:59:24.977263	10	12	22	Bajo
20	2	21	universidad	Ingeniería Mecatrónica	\N	2026-05-25 02:08:25.185664	24	8	32	Moderado
21	2	23	secundaria	\N	2°	2026-05-25 02:14:24.844184	27	13	40	Moderado
22	2	22	universidad	Ingeniería en Tecnologías de la Información y Comunicación	\N	2026-05-25 02:26:15.842631	10	7	17	Bajo
23	2	22	universidad	Ingeniería Mecatrónica	\N	2026-05-25 02:30:26.894438	9	8	17	Bajo
24	2	21	universidad	Ingeniería en Gestión Empresarial	\N	2026-05-25 09:04:33.263433	21	8	29	Moderado
25	2	23	universidad	Ingeniería en Gestión Empresarial	\N	2026-05-25 09:10:38.070698	31	9	40	Moderado
26	1	22	secundaria	\N	2°	2026-05-25 11:44:58.443326	29	5	34	Moderado
27	2	21	secundaria	\N	2°	2026-05-25 17:17:50.475051	\N	\N	\N	\N
28	2	21	preparatoria	\N	2° Semestre	2026-05-25 17:18:14.745299	\N	\N	\N	\N
29	2	21	secundaria	\N	2°	2026-05-25 17:42:33.340905	\N	\N	\N	\N
30	2	21	secundaria	\N	2°	2026-05-25 17:46:30.900971	20	10	30	Moderado
31	2	21	preparatoria	\N	2° Semestre	2026-05-25 17:54:24.791337	\N	\N	\N	\N
32	2	21	preparatoria	\N	3° Semestre	2026-05-25 17:55:46.455365	35	12	47	Alto
33	1	32	universidad	Ingeniería Mecatrónica	\N	2026-05-25 18:58:59.305482	\N	\N	\N	\N
34	2	21	secundaria	\N	1°	2026-05-25 19:10:39.409438	\N	\N	\N	\N
35	2	34	universidad	Ingeniería Industrial	\N	2026-05-25 19:32:05.425663	30	6	36	Moderado
36	2	45	preparatoria	\N	3° Semestre	2026-05-25 19:55:31.107005	25	8	33	Moderado
37	2	21	secundaria	\N	1°	2026-05-25 20:29:36.784896	24	7	31	Moderado
38	2	21	secundaria	\N	1°	2026-05-25 20:40:50.373226	30	9	39	Moderado
39	2	21	preparatoria	\N	3° Semestre	2026-05-25 20:47:36.568611	37	11	48	Alto
40	1	45	secundaria	\N	2°	2026-05-25 20:59:27.154162	27	7	34	Moderado
41	2	12	secundaria	\N	1°	2026-05-25 21:02:51.385804	30	9	39	Moderado
42	2	21	preparatoria	\N	2° Semestre	2026-05-25 21:11:09.621267	27	9	36	Moderado
43	2	21	primaria	\N	2°	2026-05-25 21:25:03.207013	32	7	39	Moderado
44	2	21	primaria	\N	6°	2026-05-25 21:32:02.946006	\N	\N	\N	\N
45	2	45	secundaria	\N	1°	2026-05-25 21:34:11.305686	\N	\N	\N	\N
46	2	45	primaria	\N	4°	2026-05-25 21:57:22.933429	33	8	41	Moderado
47	2	39	maestria	\N	\N	2026-05-26 10:36:03.959672	19	9	28	Moderado
48	2	33	\N	\N	\N	2026-05-26 10:41:53.017094	\N	\N	\N	\N
49	2	21	primaria	\N	2°	2026-05-26 17:26:19.078563	36	5	41	Moderado
50	2	21	secundaria	\N	2°	2026-05-26 19:41:35.032277	30	11	41	Moderado
51	2	21	secundaria	\N	2°	2026-05-26 19:43:31.521626	36	13	49	Alto
52	2	12	secundaria	\N	2°	2026-05-26 20:40:44.671941	9	4	13	Bajo
53	2	22	universidad	Ingeniería en Tecnologías de la Información y Comunicación	\N	2026-05-26 21:04:56.62042	31	10	41	Moderado
54	2	22	universidad	Ingeniería en Tecnologías de la Información y Comunicación	\N	2026-05-26 21:07:35.737889	24	7	31	Moderado
55	2	22	universidad	Ingeniería en Tecnologías de la Información y Comunicación	\N	2026-05-26 21:09:18.385101	28	8	36	Moderado
56	2	21	secundaria	\N	2°	2026-05-27 00:04:01.766551	\N	\N	\N	\N
57	2	21	secundaria	\N	2°	2026-05-27 00:14:12.179435	32	13	45	Alto
58	2	21	universidad	Ingeniería en Innovación Agrícola Sustentable	\N	2026-05-27 00:23:52.069259	36	11	47	Alto
59	2	21	primaria	\N	2°	2026-05-27 01:14:40.010447	32	9	41	Moderado
\.


--
-- TOC entry 5053 (class 0 OID 24596)
-- Dependencies: 224
-- Data for Name: factores_epa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.factores_epa (id_factor, nombre) FROM stdin;
1	Autorregulación académica
2	Postergación de actividades
\.


--
-- TOC entry 5055 (class 0 OID 24605)
-- Dependencies: 226
-- Data for Name: items_epa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items_epa (id_item, numero_item, item, id_factor, es_invertido) FROM stdin;
1	1	Cuando tengo que hacer una tarea, normalmente la dejo para el último minuto.	2	f
2	2	Generalmente me preparo por adelantado para los exámenes.	1	t
3	3	Cuando tengo problemas para entender algo, inmediatamente trato de buscar ayuda.	1	t
4	4	Asisto regularmente a clase.	1	t
5	5	Trato de completar el trabajo asignado lo más pronto posible.	1	t
6	6	Postergo los trabajos de los cursos que no me gustan.	2	f
7	7	Postergo las lecturas de los cursos que no me gustan.	2	f
8	8	Constantemente intento mejorar mis hábitos de estudio.	1	t
9	9	Invierto el tiempo necesario en estudiar aun cuando el tema sea aburrido.	1	t
10	10	Trato de motivarme para mantener mi ritmo de estudio.	1	t
11	11	Trato de terminar mis trabajos importantes con tiempo de sobra.	1	t
12	12	Me tomo el tiempo de revisar mis tareas antes de entregarlas.	1	t
\.


--
-- TOC entry 5057 (class 0 OID 24624)
-- Dependencies: 228
-- Data for Name: respuestas_evaluacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.respuestas_evaluacion (id_respuesta, id_evaluacion, id_item, valor_respuesta) FROM stdin;
3	10	1	2
4	10	2	4
5	10	3	2
6	10	4	4
7	10	5	2
8	10	6	3
9	10	7	4
10	10	8	2
11	10	9	4
12	10	10	4
13	10	11	3
14	10	12	2
39	12	1	1
40	12	2	3
41	12	3	3
42	12	4	4
43	12	5	2
44	12	6	4
45	12	7	5
46	12	8	1
47	12	9	3
48	12	10	4
49	12	11	2
50	12	12	3
51	13	1	2
52	13	2	5
53	13	3	5
54	13	4	5
55	13	5	5
56	13	6	1
57	13	7	1
58	13	8	5
59	13	9	3
60	13	10	3
61	13	11	5
62	13	12	4
63	14	1	5
64	14	2	5
65	14	3	5
66	14	4	5
67	14	5	5
68	14	6	5
69	14	7	5
70	14	8	5
71	14	9	5
72	14	10	5
73	14	11	5
74	14	12	5
83	17	1	2
84	17	2	4
85	17	3	5
86	17	4	3
87	17	5	4
88	17	6	4
89	17	7	5
90	17	8	5
91	17	9	5
92	17	10	5
93	17	11	5
94	17	12	4
95	18	1	2
96	18	2	4
97	18	3	3
98	18	4	5
99	18	5	3
100	18	6	3
101	18	7	5
102	18	8	4
103	18	9	4
104	18	10	3
105	18	11	4
106	18	12	3
107	19	1	2
108	19	2	4
109	19	3	5
110	19	4	5
111	19	5	5
112	19	6	5
113	19	7	5
114	19	8	5
115	19	9	5
116	19	10	5
117	19	11	5
118	19	12	5
119	20	1	2
120	20	2	4
121	20	3	3
122	20	4	4
123	20	5	3
124	20	6	2
125	20	7	4
126	20	8	3
127	20	9	5
128	20	10	5
129	20	11	1
130	20	12	2
131	21	1	3
132	21	2	4
133	21	3	1
134	21	4	1
135	21	5	2
136	21	6	5
137	21	7	5
138	21	8	5
139	21	9	3
140	21	10	4
141	21	11	3
142	21	12	4
143	22	1	2
144	22	2	5
145	22	3	5
146	22	4	5
147	22	5	5
148	22	6	2
149	22	7	3
150	22	8	5
151	22	9	4
152	22	10	5
153	22	11	5
154	22	12	5
155	23	1	2
156	23	2	5
157	23	3	5
158	23	4	5
159	23	5	5
160	23	6	3
161	23	7	3
162	23	8	5
163	23	9	5
164	23	10	5
165	23	11	5
166	23	12	5
167	24	1	3
168	24	2	3
169	24	3	5
170	24	4	3
171	24	5	4
172	24	6	4
173	24	7	1
174	24	8	3
175	24	9	4
176	24	10	5
177	24	11	3
178	24	12	3
179	25	1	2
180	25	2	2
181	25	3	2
182	25	4	2
183	25	5	2
184	25	6	4
185	25	7	3
186	25	8	3
187	25	9	3
188	25	10	3
189	25	11	3
190	25	12	3
191	26	1	3
192	26	2	5
193	26	3	3
194	26	4	1
195	26	5	5
196	26	6	1
197	26	7	1
198	26	8	1
199	26	9	2
200	26	10	3
201	26	11	2
202	26	12	3
203	30	1	2
204	30	2	4
205	30	3	2
206	30	4	2
207	30	5	4
208	30	6	5
209	30	7	3
210	30	8	4
211	30	9	4
212	30	10	5
213	30	11	4
214	30	12	5
218	32	1	4
219	32	2	2
220	32	3	3
221	32	4	2
222	32	5	2
223	32	6	4
224	32	7	4
225	32	8	1
226	32	9	3
227	32	10	3
228	32	11	2
229	32	12	1
230	35	1	2
231	35	2	4
232	35	3	2
233	35	4	1
234	35	5	3
235	35	6	3
236	35	7	1
237	35	8	3
238	35	9	2
239	35	10	4
240	35	11	3
241	35	12	2
242	36	1	3
243	36	2	4
244	36	3	2
245	36	4	4
246	36	5	5
247	36	6	2
248	36	7	3
249	36	8	5
250	36	9	2
251	36	10	3
252	36	11	1
253	36	12	3
254	37	1	1
255	37	2	3
256	37	3	4
257	37	4	3
258	37	5	4
259	37	6	2
260	37	7	4
261	37	8	3
262	37	9	4
263	37	10	2
264	37	11	4
265	37	12	3
266	38	1	2
267	38	2	4
268	38	3	2
269	38	4	4
270	38	5	2
271	38	6	4
272	38	7	3
273	38	8	2
274	38	9	4
275	38	10	1
276	38	11	4
277	38	12	1
278	39	1	1
279	39	2	3
280	39	3	1
281	39	4	1
282	39	5	1
283	39	6	5
284	39	7	5
285	39	8	1
286	39	9	1
287	39	10	3
288	39	11	3
289	39	12	3
290	40	1	2
291	40	2	4
292	40	3	3
293	40	4	5
294	40	5	3
295	40	6	2
296	40	7	3
297	40	8	1
298	40	9	2
299	40	10	3
300	40	11	4
301	40	12	2
302	41	1	2
303	41	2	4
304	41	3	2
305	41	4	4
306	41	5	1
307	41	6	3
308	41	7	4
309	41	8	1
310	41	9	3
311	41	10	5
312	41	11	2
313	41	12	2
314	42	1	3
315	42	2	3
316	42	3	4
317	42	4	2
318	42	5	3
319	42	6	2
320	42	7	4
321	42	8	2
322	42	9	5
323	42	10	4
324	42	11	1
325	42	12	3
326	43	1	2
327	43	2	3
328	43	3	2
329	43	4	1
330	43	5	2
331	43	6	3
332	43	7	2
333	43	8	3
334	43	9	4
335	43	10	3
336	43	11	2
337	43	12	2
338	46	1	2
339	46	2	2
340	46	3	3
341	46	4	2
342	46	5	3
343	46	6	4
344	46	7	2
345	46	8	2
346	46	9	4
347	46	10	3
348	46	11	1
349	46	12	1
350	47	1	3
351	47	2	4
352	47	3	4
353	47	4	4
354	47	5	4
355	47	6	3
356	47	7	3
357	47	8	4
358	47	9	3
359	47	10	4
360	47	11	4
361	47	12	4
362	49	1	1
363	49	2	2
364	49	3	2
365	49	4	2
366	49	5	2
367	49	6	2
368	49	7	2
369	49	8	2
370	49	9	2
371	49	10	2
372	49	11	2
373	49	12	2
374	50	1	2
375	50	2	2
376	50	3	4
377	50	4	3
378	50	5	4
379	50	6	4
380	50	7	5
381	50	8	5
382	50	9	1
383	50	10	2
384	50	11	2
385	50	12	1
388	51	1	5
389	51	2	1
390	51	3	1
391	51	4	2
392	51	5	2
393	51	6	3
394	51	7	5
395	51	8	5
396	51	9	2
397	51	10	2
398	51	11	2
399	51	12	1
400	52	1	1
401	52	2	5
402	52	3	5
403	52	4	5
404	52	5	5
405	52	6	2
406	52	7	1
407	52	8	5
408	52	9	5
409	52	10	5
410	52	11	5
411	52	12	5
412	53	1	5
413	53	2	1
414	53	3	2
415	53	4	4
416	53	5	3
417	53	6	3
418	53	7	2
419	53	8	1
420	53	9	3
421	53	10	5
422	53	11	1
423	53	12	3
424	54	1	1
425	54	2	3
426	54	3	4
427	54	4	2
428	54	5	4
429	54	6	5
430	54	7	1
431	54	8	3
432	54	9	3
433	54	10	5
434	54	11	2
435	54	12	4
436	55	1	3
437	55	2	2
438	55	3	4
439	55	4	5
440	55	5	1
441	55	6	3
442	55	7	2
443	55	8	4
444	55	9	1
445	55	10	5
446	55	11	3
447	55	12	1
448	57	1	5
449	57	2	1
450	57	3	3
451	57	4	3
452	57	5	2
453	57	6	4
454	57	7	4
455	57	8	2
456	57	9	3
457	57	10	3
458	57	11	4
459	57	12	1
460	58	1	4
461	58	2	2
462	58	3	1
463	58	4	3
464	58	5	2
465	58	6	4
466	58	7	3
467	58	8	2
468	58	9	2
469	58	10	2
470	58	11	2
471	58	12	2
472	59	1	3
473	59	2	1
474	59	3	3
475	59	4	2
476	59	5	3
477	59	6	4
478	59	7	2
479	59	8	3
480	59	9	2
481	59	10	3
482	59	11	2
483	59	12	3
\.


--
-- TOC entry 5049 (class 0 OID 16390)
-- Dependencies: 220
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id_usuario, nombre, correo, password, rol, apellidos) FROM stdin;
1	Admin	admin@gmail.com	1234-AAA	admin	Admin
2	Brandy	brandyaguilar001@gmail.com	EEE-801c	usuario	Flores
3	Raul	raulflore@gmail.com	EEE-801ca	usuario	Flores
5	Cris	crispe@gmail.com	EEE-801x	usuario	Peña
\.


--
-- TOC entry 5068 (class 0 OID 0)
-- Dependencies: 221
-- Name: evaluaciones_id_evaluacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.evaluaciones_id_evaluacion_seq', 59, true);


--
-- TOC entry 5069 (class 0 OID 0)
-- Dependencies: 223
-- Name: factores_epa_id_factor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.factores_epa_id_factor_seq', 2, true);


--
-- TOC entry 5070 (class 0 OID 0)
-- Dependencies: 225
-- Name: items_epa_id_item_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.items_epa_id_item_seq', 12, true);


--
-- TOC entry 5071 (class 0 OID 0)
-- Dependencies: 227
-- Name: respuestas_evaluacion_id_respuesta_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.respuestas_evaluacion_id_respuesta_seq', 483, true);


--
-- TOC entry 5072 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 5, true);


--
-- TOC entry 4888 (class 2606 OID 16413)
-- Name: evaluaciones evaluaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluaciones
    ADD CONSTRAINT evaluaciones_pkey PRIMARY KEY (id_evaluacion);


--
-- TOC entry 4890 (class 2606 OID 24603)
-- Name: factores_epa factores_epa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.factores_epa
    ADD CONSTRAINT factores_epa_pkey PRIMARY KEY (id_factor);


--
-- TOC entry 4892 (class 2606 OID 24617)
-- Name: items_epa items_epa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items_epa
    ADD CONSTRAINT items_epa_pkey PRIMARY KEY (id_item);


--
-- TOC entry 4894 (class 2606 OID 24635)
-- Name: respuestas_evaluacion respuestas_evaluacion_id_evaluacion_id_item_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuestas_evaluacion
    ADD CONSTRAINT respuestas_evaluacion_id_evaluacion_id_item_key UNIQUE (id_evaluacion, id_item);


--
-- TOC entry 4896 (class 2606 OID 24633)
-- Name: respuestas_evaluacion respuestas_evaluacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuestas_evaluacion
    ADD CONSTRAINT respuestas_evaluacion_pkey PRIMARY KEY (id_respuesta);


--
-- TOC entry 4884 (class 2606 OID 16398)
-- Name: usuarios usuarios_correo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_correo_key UNIQUE (correo);


--
-- TOC entry 4886 (class 2606 OID 16396)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 4897 (class 2606 OID 16414)
-- Name: evaluaciones fk_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluaciones
    ADD CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 4898 (class 2606 OID 24618)
-- Name: items_epa items_epa_id_factor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items_epa
    ADD CONSTRAINT items_epa_id_factor_fkey FOREIGN KEY (id_factor) REFERENCES public.factores_epa(id_factor);


--
-- TOC entry 4899 (class 2606 OID 24636)
-- Name: respuestas_evaluacion respuestas_evaluacion_id_evaluacion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuestas_evaluacion
    ADD CONSTRAINT respuestas_evaluacion_id_evaluacion_fkey FOREIGN KEY (id_evaluacion) REFERENCES public.evaluaciones(id_evaluacion);


--
-- TOC entry 4900 (class 2606 OID 24641)
-- Name: respuestas_evaluacion respuestas_evaluacion_id_item_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuestas_evaluacion
    ADD CONSTRAINT respuestas_evaluacion_id_item_fkey FOREIGN KEY (id_item) REFERENCES public.items_epa(id_item);


-- Completed on 2026-05-27 02:28:00

--
-- PostgreSQL database dump complete
--

\unrestrict jtuYefBl3VCJpy2nl2273GE3NqTxVPVFCChdEoIDuSdG7CtK8a746M7udrrG63B

