import { useContext, useEffect, useState } from "react";
import { Container } from "./styles";
import { api } from "../../services/api";
import { TransactionsContext } from "../../TransactionsContext";

interface Transaction {
    id: number,
    title: string,
    type: string,
    amount: number,
    category: string,
    createdAt: string
}

export function TranscationTable() { 
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const data = useContext(TransactionsContext);

    useEffect(() => {
        api.get('transactions')
            .then(response => {
                console.log(response.data.transactions);
                setTransactions(response.data.transactions)                
            });
    }, [])

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