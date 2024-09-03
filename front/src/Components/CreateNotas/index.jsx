import React, { useState } from 'react';
import { parseString } from 'xml2js'; // Biblioteca para converter XML em JSON

import { CreateNota, InputXml, BtnCadastrarNota} from './styles'
import { api } from '../../services/api';

export function CreateNotas() {
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
            parseString(e.target.result, (err, result) => {
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
                        valor_nota: result.nfeProc.NFe[0].infNFe[0].cobr[0].fat[0].vOrig[0],
                    }])
                }
            });
        };
        reader.readAsText(file);
    }   
};  

  return (
    <CreateNota>
        <div className='divInput'>
            <BtnCadastrarNota onClick={handleConvert}>Gerar arquivos</BtnCadastrarNota>
            <InputXml 
                type="file"
                multiple
                accept='.xml'
                onChange={handleFileSelect} 
                />
        </div>
        <table id="customers">
            <thead>
                <tr>
                    <th scope="col">Numero NF </th>
                    <th scope="col">Cliente origem</th>
                    <th scope="col">Cliente destino</th>
                    <th scope="col">Endereço cliente</th>
                    <th scope="col">Cidade cliente</th>
                    <th scope="col">Peso total da NF</th>
                    <th scope="col">Valor total da NF</th>
                </tr>
            </thead>
            <tbody>
                {objXML.map((item, index) => (
                <tr key={String(index)}>
                        <td><strong>{item.numero_nota}</strong></td>
                        <td>{item.client}</td>
                        <td>{item.destinatario}</td>
                        <td>{item.endereco_destinatario}</td>
                        <td>{item.cidade}</td>
                        <td>{item.peso}</td>
                        <td>{item.valor_nota}</td>
                </tr>
                        
                ))}
            </tbody>
        </table>
        <BtnCadastrarNota onClick={()=>handleSendNotas(objXML)}>Cadastrar Notas</BtnCadastrarNota>
    </CreateNota>
  );
}

