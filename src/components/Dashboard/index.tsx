import { Container } from "./style";
import { Summary } from "../Summary";
import { TranscationTable } from "../TransactionsTable";

export function Dashboard() {
    return (
        <Container>
            <Summary/>
            <TranscationTable/>
        </Container>
    );
}