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
        <tr key={line +1}>
            {keys.map(key => <td key={key}>{line[key]}</td>)}
        </tr>
    )
}
export function Tabela({ data }) {
    const keys = Object.keys(data[0])
  return (
        <MyTabela>
        <Head keys={keys}/>
        <tbody>
            { data.map(line=> <Row line={line}/>)}
        </tbody>
        </MyTabela>
  );
}

