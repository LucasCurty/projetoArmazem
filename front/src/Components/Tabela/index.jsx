import { MyTabela } from "./styles";

function Head({keys}){
    return(
        <thead>
            <tr key={String(keys)}>
                {keys?.map(key => <th key={key}>{key}</th>)}
            </tr>
        </thead>
    )
}

function Row({line}){
    const keys = Object.keys(line)

    return(
        <tr key={line}>
            {keys.map(key => <td key={key}> {line[key]}</td>)}
        </tr>
    )
}
export function Tabela({ data, customKeys }) {
  return (
        <MyTabela>
        <Head keys={customKeys}/>
        <tbody>
            { data?.map(line=> <Row line={line}/>)}
        </tbody>
        </MyTabela>
  );
}

