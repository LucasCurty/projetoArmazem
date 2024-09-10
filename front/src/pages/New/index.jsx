import { useState } from 'react';
import { Header } from '../../Components/Header'
import { Tabela } from '../../Components/Tabela'
import { Parser } from 'xml2js'
import { Container,BtnCadastrarNota,InputXml, ContentTable, Footer } from "./styles"
import { api } from '../../services/api';
import { Button } from '../../Components/Button';

export function New(){   
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [objXML, setObjXML] = useState([]);
  
  function  handleFileSelect(event){
      setSelectedFiles(event.target.files);
  };
  
  async function handleSendNotas(data){
     await api.post("notas", data)
      .then(console.log(data))
      .catch(error =>{
          if (error){
              console.log(`Erro encontrado: ${error}`)
          }
          console.log("Algum outro erro!")
      })
  }

  function handleConvert(){
      for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles[i];
          const reader = new FileReader();
          reader.onload = (e) => {
            const parser = new Parser();
                parser.parseString(e.target.result, (err, result) => {
                  if (err) {
                      console.error(err);
                  } else {
                      setObjXML(prevState => [...prevState, {
                          numero_nota: result.nfeProc.NFe[0].infNFe[0].ide[0].nNF[0],
                          client: result.nfeProc.NFe[0].infNFe[0].emit[0].xFant[0],
                          destinatario: result.nfeProc.NFe[0].infNFe[0].dest[0].xNome[0],
                          endereco_destinatario: result.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].xLgr[0],
                          cidade: String(result.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].xMun[0]).toUpperCase(),
                          peso: result.nfeProc.NFe[0].infNFe[0].transp[0].vol[0].pesoB[0],
                          valor_nota: result.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vNF[0],
                         
                      }])
                  }
              });
          };
          reader.readAsText(file);
      }   
  };  

    return(
        <Container>
            <Header/>
            <ContentTable>
                <section>
                    <InputXml 
                        type="file"
                        multiple
                        accept='.xml'
                        onChange={handleFileSelect} 
                        />
                    <Button
                        title="Gerar arquivos"
                        onClick={handleConvert}
                        />
                </section>
                <div>
                {
                    !objXML ?
                    <div>Carregando...</div>
                    :
                    <Tabela data={objXML}/>
                }
                </div>
            </ContentTable>
            <Footer>
             <BtnCadastrarNota onClick={()=>handleSendNotas(objXML)}>Cadastrar Notas</BtnCadastrarNota>
            </Footer>
            
        </Container>
    )
}