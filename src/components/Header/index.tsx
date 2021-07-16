import logoImg from "../../assets/logo.svg";
import { Container, Content } from "./styles";

interface iHeader {
    onOpenNewTransactionModal: () => void;
}

export function Header({onOpenNewTransactionModal}: iHeader) {
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="dt money"/>
                <button type="button" onClick={onOpenNewTransactionModal}>
                    Nova transação
                </button>
            </Content>
        </Container>
    )
}