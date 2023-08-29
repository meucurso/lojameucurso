import styled from "@emotion/styled";
import { Container, Grid } from "@mui/material";
import { Paragraph, Span } from "components/Typography";

const P = styled(Paragraph)({
  textAlign: "center",
  transform: "translateY(-50px)",
  opacity: 0,
  visibility: "hidden",
  transition: "0.5s",
  height: "auto",
  maxHeight: 0,
});
const DropDown = styled(Grid)({
  cursor: "pointer",
  transition: "0.2s",
  display: "block",
  ":hover > p": {
    opacity: 1,
    transform: "translateY(0px)",
    visibility: "visible",
    maxHeight: "500px",
  },
  ":hover > .testing ": {
    transition: "0.5s",
    transform: "rotate(180deg)",
  },
});

const TenMotives = () => {
  return (
    <div>
      <Container>
        <Grid
          py={5}
          container
          justifyContent={"center"}
          textAlign={"center"}
        >
          <Grid item xs={12} md={12}>
            <h1>
              <Span color="#4B829B">10 MOTIVOS</Span> para você fazer a
              <Span color="#4B829B"> #MINHAPÓS!</Span>
            </h1>
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            spacing={2}
            marginTop={2}
          >
            <Grid item xs={12} md={2}>
              <DropDown>
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/fluency-systems-filled/48/4B829B/multiple-directions.png"
                  alt="multiple-directions"
                />

                <h3>Flexibilidade</h3>
                <img
                  className="testing"
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios-filled/50/circled-chevron-down.png"
                  alt="circled-chevron-down"
                />
                <P>
                  Com a divisão em módulos, o estudo pode ser personalizado
                  de acordo com a sua disponibilidade de tempo e formato.
                  Assim, a pós-graduação pode ser cursada em 6 meses (2
                  encontros semanais) ou 12 meses (1 encontro semanal)..
                </P>
              </DropDown>
            </Grid>

            <Grid item xs={12} md={2}>
              <DropDown>
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios/50/4B829B/us-dollar-circled--v2.png"
                  alt="us-dollar-circled--v2"
                />
                <h3>Preço Justo</h3>
                <img
                  className="testing"
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios-filled/50/circled-chevron-down.png"
                  alt="circled-chevron-down"
                />
                <P>
                  Investir em uma especialização pode ser um excelente
                  diferencial no mercado de trabalho. O Meu Curso
                  destaca-se pela qualidade e desenvolvimento profissional
                  sem pesar no bolso. Será o melhor custo-benefício que
                  você vai encontrar no mercado educacional
                </P>
              </DropDown>
            </Grid>
            <Grid item xs={12} md={2}>
              <DropDown>
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios/50/4B829B/note.png"
                  alt="note"
                />
                <h3>Monografia Opcional</h3>
                <img
                  className="testing"
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios-filled/50/circled-chevron-down.png"
                  alt="circled-chevron-down"
                />
                <P>
                  Caso você queira, poderá optar por realizar a monografia
                  sem nenhum custo adicional. De acordo com a Resolução
                  75/2009 do CNJ e a Resolução 40/2009 do CNMP, para fins
                  de validação do título de especialista em concursos
                  públicos da Magistratura e do Ministério Público, será
                  necessária a produção de monografia jurídica.
                </P>
              </DropDown>
            </Grid>
            <Grid item xs={12} md={2}>
              <DropDown>
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios/50/4B829B/hand-cursor.png"
                  alt="hand-cursor"
                />
                <h3>Temas Atuais</h3>
                <img
                  className="testing"
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios-filled/50/circled-chevron-down.png"
                  alt="circled-chevron-down"
                />
                <P>
                  O Meu Curso está sempre de olho nas boas práticas do
                  mercado e oferece os temas mais atuais e relevantes para
                  desenvolver ao máximo o seu potencial profissional. Você
                  irá estudar na Pós-Graduação o que há de mais moderno na
                  doutrina, legislação e jurisprudência brasileira e
                  internacional.
                </P>
              </DropDown>
            </Grid>
            <Grid item xs={12} md={2}>
              <DropDown>
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios-filled/50/4B829B/businessman.png"
                  alt="businessman"
                />
                <h3>Grandes Nomes</h3>
                <img
                  className="testing"
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios-filled/50/circled-chevron-down.png"
                  alt="circled-chevron-down"
                />
                <P>
                  Os coordenadores e professores são ícones na sua área de
                  atuação. Selecionamos professores que são Livre-docentes,
                  Doutores e Mestres. Ministros das Cortes Superiores,
                  Magistrados, Membros do MP e da Advocacia (Pública e
                  Privada). Você irá aprender com o melhor time de
                  professores do país.
                </P>
              </DropDown>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            spacing={2}
            marginTop={2}
          >
            <Grid item xs={12} md={2}>
              <DropDown>
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios-filled/50/4B829B/sparkling--v1.png"
                  alt="sparkling--v1"
                />

                <h3>Satisfação dos Alunos</h3>
                <img
                  className="testing"
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios-filled/50/circled-chevron-down.png"
                  alt="circled-chevron-down"
                />
                <P>
                  Nossa preocupação com o nosso aluno é constante. Por
                  isso, comemoramos nosso alto índice de satisfação e de
                  recomendação. Mais de 98% dos nossos alunos responderam
                  estar satisfeitos com o conteúdo e corpo docente do
                  curso. Mais de 97% deles indicariam o Meu Curso para um
                  amigo (NPS).
                </P>
              </DropDown>
            </Grid>
            <Grid item xs={12} md={2}>
              <DropDown>
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios-filled/50/4B829B/layers.png"
                  alt="layers"
                />
                <h3>Central de Dúvidas</h3>
                <img
                  className="testing"
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios-filled/50/circled-chevron-down.png"
                  alt="circled-chevron-down"
                />
                <P>
                  O Bipe é a plataforma desenvolvida exclusivamente para o
                  Meu Curso e potencializa os estudos de forma organizada e
                  ágil. Além das videoaulas você terá na plataforma acesso
                  aos principais julgados tratados em aula bem como a
                  artigos científicos produzidos por professores e por
                  alunos que se formaram no curso, para sua consulta.
                </P>
              </DropDown>
            </Grid>
            <Grid item xs={12} md={2}>
              <DropDown>
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios/50/4B829B/contract.png"
                  alt="contract"
                />
                <h3>Certificado no Prazo</h3>
                <img
                  className="testing"
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios-filled/50/circled-chevron-down.png"
                  alt="circled-chevron-down"
                />
                <P>
                  Tão importante quanto assistir as aulas com os principais
                  nomes do mercado, realizar as atividades de cada módulo e
                  ser aprovado na prova final é é você receber seu
                  certificado no prazo combinado. Nosso compromisso com
                  nosso aluno é entregar o certificado no prazo combinado.
                  .
                </P>
              </DropDown>
            </Grid>
            <Grid item xs={12} md={2}>
              <DropDown>
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios-filled/50/4B829B/book.png"
                  alt="book"
                />
                <h3>Publicação de seu TCC</h3>
                <img
                  className="testing"
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios-filled/50/circled-chevron-down.png"
                  alt="circled-chevron-down"
                />
                <P>
                  Já pensou em ter sua monografia ou artigo científico
                  publicado, logo após o final do curso? Pois é, no Meu
                  Curso isso é possível. Se escolhido, seu TCC poderá ser
                  publicado na nossa plataforma digital, permitindo a
                  consulta a todo nosso grupo de alunos, ou ainda, no nosso
                  blog.
                </P>
              </DropDown>
            </Grid>
            <Grid item xs={12} md={2}>
              <DropDown>
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios-filled/50/4B829B/approval.png"
                  alt="approval"
                />
                <h3>Reconhecida pelo MEC</h3>
                <img
                  className="testing"
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios-filled/50/circled-chevron-down.png"
                  alt="circled-chevron-down"
                />
                <P>
                  O credenciamento da UniDomBosco se deu por intermédio da
                  Portaria n.º 441 de 30/3/2000, publicada no DOU em
                  31/3/2000 e o recredenciamento institucional foi
                  concedido por meio da Portaria n. º 441, publicada no DOU
                  de 27/04/2011 e pela Portaria n. º 1464, publicada no DOU
                  de 22/11/2017. O EAD da UniDomBosco foi autorizado pela
                  Portaria n.º 669 de 05/08/2014, com nota máxima no
                  conceito institucional (5).
                </P>
              </DropDown>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default TenMotives;
