import ShopLayout1 from "components/layouts/ShopLayout1";
import { Box, Grid, useTheme } from "@mui/material";
import { Container } from "@mui/system";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useEffect, useState } from "react";
import useWindowSize from "hooks/useWindowSize";
import SEO from "components/SEO";

import { H1 } from "components/Typography";

const CentralDeAjuda = (props) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    if (width < 426) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 1024) setVisibleSlides(3);
    else if (width < 1200) setVisibleSlides(4);
    else setVisibleSlides(5);
  }, [width]);
  const theme = useTheme();

  return (
    <>
      <ShopLayout1 topbarBgColor={theme.palette.grey[900]}>
        <SEO
          title="Central de Ajuda"
          sitename="MeuCurso - Do seu jeito.  No seu tempo."
        />
        <Container maxWidth="xl" disableGutters={true}>
          <Container>
            <Grid container spacing={2} marginTop={5}>
              <Grid item md={8}>
                <Box textAlign={{ xs: "center", lg: "start" }}>
                  <h1 style={{ color: "#D01212" }}>Central de Ajuda</h1>
                  <p>
                    Seja bem-vindo a nossa central de ajuda! Aqui você
                    encontra nossos canais de comunicação, como telefone,
                    e-mail e endereço. Além de acessar as principais
                    perguntas e respostas sobre os nossos serviços!
                  </p>
                </Box>
              </Grid>
              <Grid item md={4}>
                <img src="assets/images/Bipe/bipe_call.webp" alt="" />
              </Grid>
            </Grid>
          </Container>
          <Box sx={{ backgroundColor: "#fff" }}>
            <Container>
              <Grid
                py={5}
                my={5}
                container
                spacing={2}
                justifyContent={"center"}
              >
                <Grid item md={4} textAlign={"center"}>
                  <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/ios-filled/50/D01212/phone.png"
                    alt="phone"
                  />
                  <h3>Telefone</h3>
                  <strong>(11) 4200-4460.</strong>
                  <p>
                    2ª a 6ª: das 08:00 às 20:00 Sábado: das 08:00 às 14:00
                  </p>
                </Grid>
                <Grid item md={4} textAlign={"center"}>
                  <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/ios-filled/50/D01212/new-post.png"
                    alt="new-post"
                  />
                  <h3>E-mail</h3>
                  <strong>contato@meucurso.com.br</strong>
                </Grid>
                <Grid item md={4} textAlign={"center"}>
                  <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/ios-filled/50/D01212/shop.png"
                    alt="shop"
                  />
                  <h3>Loja</h3>
                  <strong>Unidade São Paulo</strong>
                  <p>Rua Luis Coelho, 340</p>
                  <p>
                    2ª a 6ª: das 09:00 as 20:00 Sábado das 08:00 às 13:00
                  </p>
                </Grid>
              </Grid>
            </Container>
          </Box>
          <Container>
            <Box display={"flex"}>
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios-filled/50/D01212/faq.png"
                alt="faq"
              />
              <H1 ml={3}>Perguntas frequentes</H1>
            </Box>
            <Box my={3} py={5}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography sx={{ fontWeight: "bolder" }}>
                    Como realizar o cadastro no site?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Ao acessar o site: www.meucurso.com.br – clique no
                    ícone: CRIAR CONTA; Preencha os dados solicitados e
                    crie sua senha de acesso. IMPORTANTE – Esta senha de
                    acesso não é a mesma da plataforma do aluno, você
                    poderá alterar posteriormente se preferir;
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography sx={{ fontWeight: "bolder" }}>
                    Quais são as formas de pagamento disponíveis?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Todo o site está parcelado em até 12x sem juros no
                    cartão de crédito (PayPal). Boleto bancário somente
                    para pagamento à vista com vencimento para 3 dias úteis
                    contados da data de emissão. Para condições especiais
                    entre em contato com nossa Central de Atendimento.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography sx={{ fontWeight: "bolder" }}>
                    Após a efetivação da compra em quanto tempo terei a
                    liberação de acesso?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Após o pagamento via cartão de crédito o acesso é
                    liberado imediatamente após aprovação pela
                    administradora de cartão. Caso após a compra o status
                    de pedido esteja como PENDENTE, o aluno deverá
                    verificar com sua administradora e aguardar o prazo de
                    compensação (geralmente 24 horas após a efetivação da
                    compra); Pagamentos realizados em boleto bancário a
                    liberação do acesso ocorre em até 72 horas úteis para
                    compensação bancária;
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4a-content"
                  id="panel4a-header"
                >
                  <Typography sx={{ fontWeight: "bolder" }}>
                    Por onde acesso minha rota de estudos?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    O aluno deve acessar o portal através do endereço:
                    aluno.meucurso.com.br (sem o www); Inserir e-mail e
                    senha - no primeiro acesso sua senha será o nº do CPF
                    sem pontos e traço;
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4a-content"
                  id="panel4a-header"
                >
                  <Typography sx={{ fontWeight: "bolder" }}>
                    Qual o período de acesso à rota?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Os cursos possuem no descritivo data de início e
                    termino de disponibilização de conteúdo e o aluno pode
                    acessar até a data da prova (para cursos da OAB e de
                    Concursos Públicos).
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4a-content"
                  id="panel4a-header"
                >
                  <Typography sx={{ fontWeight: "bolder" }}>
                    Não assisti a aula no dia, perco o conteúdo e acesso à
                    aula ou posso ver em outro dia?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Sim, se você não assistir a aula no dia e horário que
                    ela ocorre, você poderá assistir em outro dia e horário
                    disponível – Do seu jeito, no seu tempo! Após a
                    gravação a aula a equipe técnica tem até 24hrs para
                    subir na plataforma a gravação; Você não perderá o
                    conteúdo nem o acesso à aula.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4a-content"
                  id="panel4a-header"
                >
                  <Typography sx={{ fontWeight: "bolder" }}>
                    Excedi o limite de visualizações o que devo fazer?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Todas as aulas possuem a limitação de 3 visualizações
                    por clique no objeto pedagógico de videoaulas, ou seja,
                    o aluno pode ver o bloco completo até 3 vezes, conforme
                    manual do aluno. Caso exceda o limite de visualização,
                    entre em contato com a nossa Central de Atendimento.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Container>
          <Box my={5} py={3} sx={{ backgroundColor: "#fff" }}>
            <Container>
              <Grid container>
                <Grid
                  display={"flex"}
                  alignItems={"center"}
                  item
                  xs={12}
                  py={3}
                  my={3}
                >
                  <img
                    style={{ maxWidth: "100%", height: "auto" }}
                    width="50"
                    height="50"
                    src="https://img.icons8.com/ios-filled/50/D01212/documents.png"
                    alt="documents"
                  />
                  <H1 ml={3}>Documentos para consulta</H1>
                </Grid>
                <Grid item xs={12} md={4}>
                  <a
                    target="blank"
                    href="https://meucursooficial-my.sharepoint.com/personal/rodrigo_reis_meucurso_com_br/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Frodrigo%5Freis%5Fmeucurso%5Fcom%5Fbr%2FDocuments%2FArquivos%20de%20Chat%20do%20Microsoft%20Teams%2FManual%20do%20aluno%20%2D%20FADEG%2Epdf&parent=%2Fpersonal%2Frodrigo%5Freis%5Fmeucurso%5Fcom%5Fbr%2FDocuments%2FArquivos%20de%20Chat%20do%20Microsoft%20Teams&ga=1"
                  >
                    Manual Pós Graduação
                  </a>
                </Grid>
                <Grid item xs={12} md={4}>
                  <a
                    target="blank"
                    href="https://arquivos.meucurso.com.br/Documentos/Contrato_Pos-2023-Registro.pdf"
                  >
                    Contrato Pós Graduação
                  </a>
                </Grid>
                {/* <Grid item xs={12} md={4}>
                  <a
                    target="blank"
                    href="http://documentos.meucurso.com.br/site/pdf/contrato_meucurso.pdf"
                  >
                    Contrato MeuCurso
                  </a>
                </Grid> */}
              </Grid>
              {/* <Grid container>
                <Grid
                  display={"flex"}
                  alignItems={"end"}
                  item
                  py={3}
                  my={3}
                  xs={12}
                >
                  <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/ios-filled/50/D01212/lock.png"
                    alt="lock"
                  />
                  <H1 ml={3}>LGPD</H1>
                </Grid>
                <Grid item xs={12} md={6}>
                  <a
                    target="blank"
                    href="https://www.meucurso.com.br/politica-de-privacidade"
                  >
                    <img
                      style={{ maxWidth: "100%", height: "auto" }}
                      src="https://www.meucurso.com.br/media/wysiwyg/politica.gif"
                      alt=""
                    />
                  </a>
                </Grid>
                <a href="https://www.meucurso.com.br/termos-de-uso">
                  <img
                    style={{ maxWidth: "100%", height: "auto" }}
                    src="https://www.meucurso.com.br/media/wysiwyg/termos.gif"
                    alt=""
                  />
                </a>
              </Grid> */}

              <Box></Box>
              <Box mt={5} display={"flex"} alignItems={"end"}>
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios-filled/50/D01212/gear.png"
                  alt="gear"
                />
                <H1 ml={3}>Requisitos mínimos</H1>
              </Box>
              <p>
                Para visualizar as aulas o aluno deverá ter acesso à
                internet, preferencialmente por conexão de banda larga de,
                no mínimo, 1MB. Não aconselhamos a utilização de tecnologia
                3G/4G já que a taxa de transferência e exibição de vídeos
                poderá ser reduzida no decorrer do mês, dificultando a
                visualização dos vídeos. O computador deverá ter
                processador com capacidade mínima de 1.0 GHZ, com placa de
                vídeo e saída de áudio para fone de ouvido ou caixa de som.
                O monitor deverá ter resolução mínima de 1024 x 768 pixels
                e o navegador de internet deverá ser, no mínimo, Internet
                Explorer 8.X, Firefox 3.X, Chrome 3.X ou superiores.
              </p>
            </Container>
          </Box>
        </Container>
      </ShopLayout1>
    </>
  );
};
export default CentralDeAjuda;
