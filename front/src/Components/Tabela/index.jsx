import { MyTabela } from "./styles";

function Head({keys}){
    return(
        <thead>
            <tr>
                {keys.map(key => <th key={key}>{key}</th>)}
            </tr>
        </thead>
    )
}

function Row({line}){
    const keys = Object.keys(line)

    return(
        <tr key={line}>
            {keys.map(key => <td key={key}>{line[key]}</td>)}
        </tr>
    )
}
export function Tabela({ data }) {
    const keys = ["NUMERO_NF", "CLIENTE","DESTINATARIO", "ENDERECO_DESTINATARIO","CIDADE", "PESO","VALOR_NF"]
  return (
        <MyTabela>
        <Head keys={keys}/>
        <tbody>
            { data.map(line=> <Row line={line}/>)}
        </tbody>
        </MyTabela>
  );
}

