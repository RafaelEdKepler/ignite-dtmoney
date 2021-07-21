import { useContext } from "react";
import { Container } from "./styles";
import { TransactionsContext } from "../../TransactionsContext";

export function TranscationTable() { 
    const transactions = useContext(TransactionsContext);

    return (
        <Container>
            <table>
                 <thead>
                     <tr>
                         <th>Título</th>
                         <th>Valor</th>
                         <th>Categoria</th>
                         <th>Data</th>
                     </tr>
                 </thead>
                 <tbody>
                    {transactions.map(item => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td className={item.type}>
                                {item.type === 'withdraw' && '- '}
                                {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(item.amount)}
                            </td>
                            <td>{item.category}</td>
                            <td>{new Intl.DateTimeFormat('pt-BR').format(
                                new Date(item.createdAt)
                            )}</td>
                        </tr>
                    ))}
                 </tbody>
            </table>
        </Container>
    )
}