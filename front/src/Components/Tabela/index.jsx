export function Tabela({numero_nota, client, destinatario, endereco_destinatario, cidade, peso, valor_nota}) {

  return (
        <Tabela>
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
            <tr>
                    <td><strong>{numero_nota}</strong></td>
                    <td>{client}</td>
                    <td>{destinatario}</td>
                    <td>{endereco_destinatario}</td>
                    <td>{cidade}</td>
                    <td>{peso}</td>
                    <td>{valor_nota}</td>
            </tr>
        </tbody>
        </Tabela>
  );
}

